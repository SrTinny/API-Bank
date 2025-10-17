package com.portfolio.bankapi.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("ESPECIAL")
@Getter @Setter // Adicionado para acessar o campo limiteChequeEspecial
public class ContaEspecial extends Conta {

    // Campo exclusivo desta classe
    @Column(nullable = false)
    private BigDecimal limiteChequeEspecial; 

    public ContaEspecial() {
        super();
    }

    public ContaEspecial(String numero, String titular, BigDecimal limite) {
        super(numero, titular);
        this.limiteChequeEspecial = limite;
    }

    @Override
    public boolean podeSacar(BigDecimal valorSaque) {
        // Regra: Saque permitido se (saldo + limite) for suficiente.
        BigDecimal saldoTotal = getSaldo().add(this.limiteChequeEspecial);
        return saldoTotal.compareTo(valorSaque) >= 0;
    }
}