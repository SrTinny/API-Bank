package com.portfolio.bankapi.service;

import com.portfolio.bankapi.domain.model.*;
import com.portfolio.bankapi.exception.*;
import com.portfolio.bankapi.repository.ContaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class ContaService {

    private final ContaRepository contaRepository;
    private static final BigDecimal MULTA_CHEQUE_ESPECIAL = new BigDecimal("0.05"); // 5% de multa (Detalhe do README)

    public ContaService(ContaRepository contaRepository) {
        this.contaRepository = contaRepository;
    }

    // --- Métodos de Busca e Cadastro (CRUD Básico) ---

    public Conta buscarPorNumero(String numero) {
        return contaRepository.findByNumero(numero)
                .orElseThrow(() -> new ContaNaoEncontradaException(numero));
    }
    
    // Método implementado para listar todas as contas
    public List<Conta> findAll() {
        return contaRepository.findAll();
    }
    // Fim da implementação

    @Transactional
    public Conta salvar(Conta conta) {
        // Validação de número de conta duplicado
        if (conta.getId() == null && contaRepository.findByNumero(conta.getNumero()).isPresent()) {
            throw new com.portfolio.bankapi.exception.ContaJaExisteException(conta.getNumero());
        }
        return contaRepository.save(conta);
    }

    // --- Métodos de Operações (Lógica de Negócio) ---

    @Transactional
    public Conta sacar(String numero, BigDecimal valorSaque) {
        if (valorSaque.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Valor de saque deve ser positivo.");
        }

        Conta conta = buscarPorNumero(numero);
        
        // 1. Verifica se pode sacar (usando o método polimórfico na Entidade)
        if (!conta.podeSacar(valorSaque)) {
            throw new SaldoInsuficienteException(numero, "Saldo insuficiente, mesmo com o limite especial.");
        }
        
        // 2. Realiza o saque e aplica a multa se for Conta Especial
        if (conta instanceof ContaEspecial contaEspecial && conta.getSaldo().compareTo(valorSaque) < 0) {
            
            // Saque usando cheque especial. Calcula o quanto foi usado.
            BigDecimal valorUtilizadoLimite = valorSaque.subtract(conta.getSaldo());
            BigDecimal multa = valorUtilizadoLimite.multiply(MULTA_CHEQUE_ESPECIAL).setScale(2, RoundingMode.HALF_UP);
            
            // Atualiza o saldo (será negativo)
            conta.setSaldo(conta.getSaldo().subtract(valorSaque).subtract(multa));

            // Na prática, você deve salvar o registro de que a multa foi aplicada.
            System.out.println("Saque efetuado usando cheque especial. Multa de " + multa + " aplicada.");

        } else {
            // Saque normal (Comum ou Poupança)
            conta.setSaldo(conta.getSaldo().subtract(valorSaque));
        }

        return contaRepository.save(conta);
    }

    @Transactional
    public Conta depositar(String numero, BigDecimal valorDeposito) {
        if (valorDeposito.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Valor de depósito deve ser positivo.");
        }
        Conta conta = buscarPorNumero(numero);
        conta.setSaldo(conta.getSaldo().add(valorDeposito));
        return contaRepository.save(conta);
    }

    @Transactional
    public void transferir(String numeroOrigem, String numeroDestino, BigDecimal valor) {
        if (numeroOrigem == null || numeroDestino == null) {
            throw new IllegalArgumentException("Contas de origem e destino devem ser informadas.");
        }

        if (numeroOrigem.equals(numeroDestino)) {
            throw new IllegalArgumentException("A conta de origem e destino não podem ser a mesma.");
        }

        if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor da transferência deve ser maior que zero.");
        }

        // Verifica se a conta destino existe antes de realizar o saque, assim qualquer exceção abortará a transação.
        Conta destino = contaRepository.findByNumero(numeroDestino)
                .orElseThrow(() -> new ContaNaoEncontradaException(numeroDestino));

        // Tenta sacar na origem (irá lançar SaldoInsuficienteException se não houver fundos)
        Conta origem = sacar(numeroOrigem, valor);

        // Se sacar ocorreu sem exceção, realiza o depósito na conta destino
        depositar(numeroDestino, valor);
    }

    @Transactional
    public Conta reajustarPoupanca(String numero, BigDecimal taxa) {
        Conta conta = buscarPorNumero(numero);

        if (!(conta instanceof ContaPoupanca)) {
            throw new IllegalArgumentException("A conta " + numero + " não é uma Conta Poupança e não pode ser reajustada.");
        }
        
        ContaPoupanca poupanca = (ContaPoupanca) conta;
        poupanca.reajustar(taxa); // Chama o método de domínio
        
        return contaRepository.save(poupanca);
    }
}