package com.portfolio.bankapi.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "contas")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_conta", discriminatorType = DiscriminatorType.STRING)
@Data // Gera Getters, Setters, toString, equals, hashCode (Lombok)
@NoArgsConstructor // Construtor sem argumentos (requisito JPA)
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

    /**
     * Método polimórfico que define a regra de saque para cada tipo de conta.
     * @param valorSaque O valor que se deseja sacar.
     * @return true se o saldo for suficiente (incluindo limite, se houver).
     */
    public abstract boolean podeSacar(BigDecimal valorSaque);
}