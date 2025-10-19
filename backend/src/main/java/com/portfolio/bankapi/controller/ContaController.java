package com.portfolio.bankapi.controller;

import com.portfolio.bankapi.domain.model.*;
import com.portfolio.bankapi.dto.*;
import com.portfolio.bankapi.service.ContaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/contas")
public class ContaController {

    private final ContaService contaService;

    public ContaController(ContaService contaService) {
        this.contaService = contaService;
    }

    // --------------------------------------------------
    // ENDPOINT DE CADASTRO (POST - Create)
    // URL: POST /api/contas
    // --------------------------------------------------
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Conta cadastrarConta(@Valid @RequestBody ContaCadastroDTO dto) {
        // Log do DTO recebido (ajuda no debug de payloads inválidos vindos do cliente)
        System.out.println("[DEBUG] Recebido ContaCadastroDTO: " + dto);
        // Validações simples para evitar NullPointerException e retornar 400 com mensagem útil
        if (dto.getTipo() == null || dto.getTipo().trim().isEmpty()) {
            throw new IllegalArgumentException("O campo 'tipo' é obrigatório e deve ser 'COMUM', 'POUPANCA' ou 'ESPECIAL'.");
        }

        Conta novaConta;

        // Lógica de mapeamento (DTO para Entidade)
        switch (dto.getTipo().toUpperCase()) {
            case "COMUM":
                novaConta = new ContaComum(dto.getNumero(), dto.getTitular());
                break;
            case "POUPANCA":
                novaConta = new ContaPoupanca(dto.getNumero(), dto.getTitular());
                break;
            case "ESPECIAL":
                // Regra: Conta Especial requer o limite
                if (dto.getLimiteChequeEspecial() == null || dto.getLimiteChequeEspecial().compareTo(BigDecimal.ZERO) < 0) {
                    throw new IllegalArgumentException("Conta Especial requer um limite maior ou igual a zero.");
                }
                novaConta = new ContaEspecial(dto.getNumero(), dto.getTitular(), dto.getLimiteChequeEspecial());
                break;
            default:
                throw new IllegalArgumentException("Tipo de conta inválido: " + dto.getTipo());
        }
        
        return contaService.salvar(novaConta);
    }

    // --------------------------------------------------
    // ENDPOINT DE CONSULTA (GET - Read Saldo)
    // URL: GET /api/contas/{numero}
    // Implementa o item 5: Ver saldos
    // --------------------------------------------------
    @GetMapping("/{numero}")
    public Conta buscarPorNumero(@PathVariable String numero) {
        return contaService.buscarPorNumero(numero);
    }

    // Implementa o item 5: Ver saldos (de todos)
    @GetMapping
    public List<Conta> listarTodas() {
        return contaService.findAll(); // Adicione este método ao ContaRepository e ContaService
    }
    
    // --------------------------------------------------
    // ENDPOINTS DE OPERAÇÕES (PUT/PATCH - Update)
    // --------------------------------------------------

    // URL: PATCH /api/contas/{numero}/saque
    // Implementa o item 1: Saque
    @PatchMapping("/{numero}/saque")
    public Conta sacar(@PathVariable String numero, @Valid @RequestBody OperacaoDTO dto) {
        return contaService.sacar(numero, dto.getValor());
    }

    // URL: PATCH /api/contas/{numero}/deposito
    // Implementa o item 2: Depósito
    @PatchMapping("/{numero}/deposito")
    public Conta depositar(@PathVariable String numero, @Valid @RequestBody OperacaoDTO dto) {
        return contaService.depositar(numero, dto.getValor());
    }
    
    // URL: PATCH /api/contas/transferencia
    // Implementa o item 3: Transferência
    @PatchMapping("/transferencia")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> transferir(@Valid @RequestBody TransferenciaDTO dto) {
        contaService.transferir(dto.getContaOrigem(), dto.getContaDestino(), dto.getValor());
        return ResponseEntity.ok().build(); // Retorna 200 OK sem corpo
    }
    
    // URL: PATCH /api/contas/{numero}/reajuste
    // Implementa o item 4: Reajustar (Poupanca)
    @PatchMapping("/{numero}/reajuste")
    public Conta reajustar(@PathVariable String numero, @RequestBody(required = false) OperacaoDTO dto) {
        // Se o DTO for nulo ou a taxa for nula, o Service usará a taxa padrão (0.10)
        BigDecimal taxa = (dto != null) ? dto.getTaxaReajuste() : null; 
        return contaService.reajustarPoupanca(numero, taxa);
    }
}