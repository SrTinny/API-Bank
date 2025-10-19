package com.portfolio.bankapi.dto;

import java.math.BigDecimal;

public class TransferenciaDTO {
    private String contaDestino;
    private String contaOrigem;
    private BigDecimal valor;

    public TransferenciaDTO() {}

    public String getContaDestino() { return contaDestino; }
    public void setContaDestino(String contaDestino) { this.contaDestino = contaDestino; }

    public String getContaOrigem() { return contaOrigem; }
    public void setContaOrigem(String contaOrigem) { this.contaOrigem = contaOrigem; }

    public BigDecimal getValor() { return valor; }
    public void setValor(BigDecimal valor) { this.valor = valor; }
}