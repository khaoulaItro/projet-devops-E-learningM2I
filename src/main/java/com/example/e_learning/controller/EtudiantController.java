package com.example.e_learning.controller;

import com.example.e_learning.model.Etudiant;
import com.example.e_learning.service.EtudiantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/etudiants")
public class EtudiantController {

    @Autowired
    private EtudiantService etudiantService;

    // 1. Visualiser tous les étudiants
    @GetMapping
    public List<Etudiant> getAllEtudiants() {
        return etudiantService.getAllEtudiants();
    }

    // 2. Visualiser un étudiant par ID
    @GetMapping("/{id}")
    public Etudiant getEtudiantById(@PathVariable String id) {
        return etudiantService.getEtudiantById(id);
    }

    // 3. Ajouter un étudiant
    @PostMapping
    public Etudiant addEtudiant(@RequestBody Etudiant etudiant) {
        return etudiantService.addEtudiant(etudiant);
    }

    // 4. Modifier un étudiant
    @PutMapping("/{id}")
    public Etudiant updateEtudiant(@PathVariable String id, @RequestBody Etudiant etudiant) {
        return etudiantService.updateEtudiant(id, etudiant);
    }

    // 5. Supprimer un étudiant
    @DeleteMapping("/{id}")
    public String deleteEtudiant(@PathVariable String id) {
        return etudiantService.deleteEtudiant(id);
    }
}