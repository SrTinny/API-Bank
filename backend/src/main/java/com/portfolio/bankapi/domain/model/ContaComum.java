package com.portfolio.bankapi.domain.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.math.BigDecimal;

@Entity
@DiscriminatorValue("COMUM") // Define o valor da coluna 'tipo_conta'
public class ContaComum extends Conta {
    
    public ContaComum() {
        super();
    }

    public ContaComum(String numero, String titular) {
        super(numero, titular);
    }

    @Override
    public boolean podeSacar(BigDecimal valorSaque) {
        // Regra: Saldo deve ser maior ou igual ao valor de saque.
        return getSaldo().compareTo(valorSaque) >= 0;
    }
}