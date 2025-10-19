package com.portfolio.bankapi.dto;

import java.math.BigDecimal;

public class ContaCadastroDTO {

    // Campos comuns a todas as contas
    private String tipo; // "COMUM", "POUPANCA", "ESPECIAL"
    private String numero;
    private String titular;

    // Campo específico para Conta Especial
    private BigDecimal limiteChequeEspecial;

    public ContaCadastroDTO() {}

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public String getTitular() { return titular; }
    public void setTitular(String titular) { this.titular = titular; }

    public BigDecimal getLimiteChequeEspecial() { return limiteChequeEspecial; }
    public void setLimiteChequeEspecial(BigDecimal limiteChequeEspecial) { this.limiteChequeEspecial = limiteChequeEspecial; }

}