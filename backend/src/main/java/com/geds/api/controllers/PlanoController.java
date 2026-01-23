package com.geds.api.controllers;

import com.geds.api.entities.Plano;
import com.geds.api.repositories.PlanoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/planos")
@CrossOrigin(origins = "*")
public class PlanoController {

    @Autowired
    private PlanoRepository planoRepository;

    @GetMapping
    public List<Plano> listarTodos() {
        return planoRepository.findAll();
    }
}
