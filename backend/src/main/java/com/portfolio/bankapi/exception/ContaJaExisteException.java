package com.portfolio.bankapi.exception;

public class ContaJaExisteException extends RuntimeException {

    public ContaJaExisteException(String numero) {
        super("Conta com este número já existe: " + numero);
    }

    public ContaJaExisteException(String message, Throwable cause) {
        super(message, cause);
    }
}
