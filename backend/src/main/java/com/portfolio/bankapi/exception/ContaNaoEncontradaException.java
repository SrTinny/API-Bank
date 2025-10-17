package com.portfolio.bankapi.exception;

public class ContaNaoEncontradaException extends RuntimeException {
    public ContaNaoEncontradaException(String numero) {
        super("Conta com número " + numero + " não encontrada.");
    }
}