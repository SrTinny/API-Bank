package com.portfolio.bankapi.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.math.BigDecimal;

@Entity
@DiscriminatorValue("ESPECIAL")
public class ContaEspecial extends Conta {

    // Campo exclusivo desta classe
    // Em uma estratégia SINGLE_TABLE a coluna existe para todas as subclasses.
    // Tornamos nullable = true aqui para permitir que registros de outras
    // subclasses (ex.: COMUM, POUPANCA) não tenham valor — a validação de
    // requisito de limite para ContaEspecial é feita na camada de serviço.
    @Column(nullable = true)
    private BigDecimal limiteChequeEspecial;

    public ContaEspecial() {
        super();
    }

    public ContaEspecial(String numero, String titular, BigDecimal limite) {
        super(numero, titular);
        this.limiteChequeEspecial = limite;
    }

    public BigDecimal getLimiteChequeEspecial() {
        return limiteChequeEspecial;
    }

    public void setLimiteChequeEspecial(BigDecimal limiteChequeEspecial) {
        this.limiteChequeEspecial = limiteChequeEspecial;
    }

    @Override
    public boolean podeSacar(BigDecimal valorSaque) {
        // Regra: Saque permitido se (saldo + limite) for suficiente.
        BigDecimal saldoTotal = getSaldo().add(this.limiteChequeEspecial);
        return saldoTotal.compareTo(valorSaque) >= 0;
    }
}