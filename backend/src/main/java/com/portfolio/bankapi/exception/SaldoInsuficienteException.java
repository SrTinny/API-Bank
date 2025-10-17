package com.portfolio.bankapi.exception;

public class SaldoInsuficienteException extends RuntimeException {
    public SaldoInsuficienteException(String numero, String mensagem) {
        super("Conta " + numero + ": " + mensagem);
    }
}