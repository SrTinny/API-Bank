package com.portfolio.bankapi.dto;

import java.math.BigDecimal;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class OperacaoDTO {

    // Adicionando validações (Boas Práticas de API)
    @NotNull(message = "O valor é obrigatório.")
    @Positive(message = "O valor deve ser positivo.")
    private BigDecimal valor;

    // Usado para Reajuste da Poupança
    private BigDecimal taxaReajuste;

    public OperacaoDTO() {}

    public BigDecimal getValor() { return valor; }
    public void setValor(BigDecimal valor) { this.valor = valor; }

    public BigDecimal getTaxaReajuste() { return taxaReajuste; }
    public void setTaxaReajuste(BigDecimal taxaReajuste) { this.taxaReajuste = taxaReajuste; }

}