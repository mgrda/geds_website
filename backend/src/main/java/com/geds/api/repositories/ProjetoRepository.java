package com.geds.api.repositories;

import com.geds.api.entities.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ProjetoRepository extends JpaRepository<Projeto, UUID> {
	long countByProprietario_Id(UUID proprietarioId);
}
