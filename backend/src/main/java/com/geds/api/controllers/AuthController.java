package com.geds.api.controllers;

import com.geds.api.entities.Usuario;
import com.geds.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("{\"message\": \"E-mail já cadastrado\"}");
        }
        
        // Em um sistema real, a senha deve ser criptografada aqui
        Usuario salvo = usuarioRepository.save(usuario);
        return ResponseEntity.ok(salvo);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String senha = credentials.get("senha");

        if (email == null || senha == null) {
            return ResponseEntity.badRequest().body("{\"message\": \"Email e senha são obrigatórios\"}");
        }

        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(401).body("{\"message\": \"Credenciais inválidas\"}");
        }

        Usuario usuario = usuarioOpt.get();
        // Senha em texto claro — em produção, use hashing
        if (!senha.equals(usuario.getSenha())) {
            return ResponseEntity.status(401).body("{\"message\": \"Credenciais inválidas\"}");
        }

        return ResponseEntity.ok(usuario);
    }
}
