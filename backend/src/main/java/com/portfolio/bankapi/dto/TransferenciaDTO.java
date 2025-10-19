package com.portfolio.bankapi.dto;

import java.math.BigDecimal;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TransferenciaDTO {
    @NotBlank(message = "A conta origem é obrigatória")
    private String contaOrigem;

    @NotBlank(message = "A conta destino é obrigatória")
    private String contaDestino;

    @NotNull(message = "O valor da transferência é obrigatório")
    @DecimalMin(value = "0.01", message = "O valor da transferência deve ser maior que zero")
    private BigDecimal valor;

    public TransferenciaDTO() {}

    public String getContaDestino() { return contaDestino; }
    public void setContaDestino(String contaDestino) { this.contaDestino = contaDestino; }

    public String getContaOrigem() { return contaOrigem; }
    public void setContaOrigem(String contaOrigem) { this.contaOrigem = contaOrigem; }

    public BigDecimal getValor() { return valor; }
    public void setValor(BigDecimal valor) { this.valor = valor; }

    @Override
    public String toString() {
        return "TransferenciaDTO{origem='" + contaOrigem + "', destino='" + contaDestino + "', valor=" + valor + '}';
    }
}