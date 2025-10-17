package com.portfolio.bankapi.domain.model;

import jakarta.persistence.*;
import lombok.Data; // Usando Lombok para getters/setters/etc
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "contas")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) // Estratégia de herança
@DiscriminatorColumn(name = "tipo_conta", discriminatorType = DiscriminatorType.STRING) // Coluna para identificar o tipo
@Data // Gera Getters, Setters, toString, equals, hashCode (Lombok)
@NoArgsConstructor // Construtor sem argumentos (JPA requirement)
public abstract class Conta { // Classe abstrata base
    
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

    // Método abstrato que será implementado por cada tipo de conta
    public abstract boolean podeSacar(BigDecimal valorSaque);
}