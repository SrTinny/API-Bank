package com.portfolio.bankapi.dto;

import java.math.BigDecimal;
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Data
public class OperacaoDTO {

    // Adicionando validações (Boas Práticas de API)
    @NotNull(message = "O valor é obrigatório.")
    @Positive(message = "O valor deve ser positivo.")
    private BigDecimal valor;

    // Usado para Reajuste da Poupança
    private BigDecimal taxaReajuste; 
}