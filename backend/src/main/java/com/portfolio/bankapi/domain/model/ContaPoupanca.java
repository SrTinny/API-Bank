package com.portfolio.bankapi.domain.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.math.BigDecimal;

@Entity
@DiscriminatorValue("POUPANCA")
public class ContaPoupanca extends Conta {

    // Taxa padrão de 10% (0.10) conforme README.md
    private static final BigDecimal TAXA_REAJUSTE_PADRAO = new BigDecimal("0.10");

    public ContaPoupanca() {
        super();
    }
    
    public ContaPoupanca(String numero, String titular) {
        super(numero, titular);
    }

    @Override
    public boolean podeSacar(BigDecimal valorSaque) {
        // A Poupança se comporta como a Conta Comum no saque.
        return getSaldo().compareTo(valorSaque) >= 0;
    }

    /**
     * Reajusta o saldo aplicando uma taxa. Assume a taxa padrão se a fornecida for nula.
     * @param taxa A taxa a ser aplicada (ex: 0.10). Pode ser null.
     */
    public void reajustar(BigDecimal taxa) {
        BigDecimal taxaFinal = (taxa != null) ? taxa : TAXA_REAJUSTE_PADRAO;
        
        // Novo Saldo = Saldo Atual + (Saldo Atual * Taxa)
        BigDecimal valorReajuste = getSaldo().multiply(taxaFinal);
        setSaldo(getSaldo().add(valorReajuste));
    }
}