package com.portfolio.bankapi.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data // Lombok para getters e setters
public class ContaCadastroDTO {
    
    // Campos comuns a todas as contas
    private String tipo; // "COMUM", "POUPANCA", "ESPECIAL"
    private String numero;
    private String titular;
    
    // Campo específico para Conta Especial
    private BigDecimal limiteChequeEspecial; 
}