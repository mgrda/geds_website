package com.geds.api.controllers;

import com.geds.api.entities.Usuario;
import com.geds.api.repositories.ProjetoRepository;
import com.geds.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProjetoRepository projetoRepository;

    @GetMapping("/by-email")
    public ResponseEntity<?> getByEmail(@RequestParam String email) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioOpt.get());
    }

    @GetMapping("/{id}/projetos/count")
    public ResponseEntity<?> countProjetos(@PathVariable UUID id) {
        long count = projetoRepository.countByProprietario_Id(id);
        Map<String, Long> resp = new HashMap<>();
        resp.put("count", count);
        return ResponseEntity.ok(resp);
    }
}
