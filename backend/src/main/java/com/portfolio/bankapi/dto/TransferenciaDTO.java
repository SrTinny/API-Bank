package com.portfolio.bankapi.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class TransferenciaDTO {
    private String contaDestino;
    private String contaOrigem;
    private BigDecimal valor;
}