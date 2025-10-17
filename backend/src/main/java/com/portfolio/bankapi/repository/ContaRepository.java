package com.portfolio.bankapi.repository;

import com.portfolio.bankapi.domain.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// A interface JpaRepository recebe a Entidade (Conta) e o tipo da chave primária (Long)
public interface ContaRepository extends JpaRepository<Conta, Long> {

    /**
     * O Spring Data JPA cria a implementação deste método automaticamente.
     * Necessário para buscar uma conta pelo seu número (requisito de saque/depósito).
     */
    Optional<Conta> findByNumero(String numero);
}