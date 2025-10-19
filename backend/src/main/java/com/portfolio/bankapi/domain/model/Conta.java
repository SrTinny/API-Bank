package com.portfolio.bankapi.domain.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "contas")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_conta", discriminatorType = DiscriminatorType.STRING)
public abstract class Conta {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String numero; // Número da conta

    @Column(nullable = false)
    private String titular;

    @Column(nullable = false)
    private BigDecimal saldo = BigDecimal.ZERO;

    public Conta(String numero, String titular) {
        this.numero = numero;
        this.titular = titular;
    }

    // Construtor padrão exigido pelo JPA
    public Conta() {
    }

    // Getters e Setters gerados manualmente (substitui Lombok)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    /**
     * Método polimórfico que define a regra de saque para cada tipo de conta.
     * @param valorSaque O valor que se deseja sacar.
     * @return true se o saldo for suficiente (incluindo limite, se houver).
     */
    public abstract boolean podeSacar(BigDecimal valorSaque);
}