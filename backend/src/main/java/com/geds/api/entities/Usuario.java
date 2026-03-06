package com.geds.api.entities;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @JsonIgnore
    private String senha;

    private String cargo;

    @Column(columnDefinition = "TEXT")
    private String biografia;

    @Column(name = "url_avatar")
    private String urlAvatar;

    private List<String> habilidades;

    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();
}
