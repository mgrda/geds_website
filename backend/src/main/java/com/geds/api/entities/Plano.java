package com.geds.api.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "planos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Plano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(name = "preco_mensal", nullable = false)
    private BigDecimal precoMensal;

    @Column(name = "preco_anual", nullable = false)
    private BigDecimal precoAnual;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private List<String> beneficios;
}
