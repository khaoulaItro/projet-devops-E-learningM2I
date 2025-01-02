package com.example.e_learning.controller;

import com.example.e_learning.model.Annonce;
import com.example.e_learning.model.Professeur;

import com.example.e_learning.service.Professeurservice;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/professeurs")
public class ProfesseurControllerTest {

    @Autowired
    private Professeurservice professeurService;

    // Create a new professeur
    @PostMapping
    public ResponseEntity<Professeur> createProfesseur(@RequestBody Professeur professeur) {
        Professeur createdProfesseur = professeurService.createProfesseur(professeur);
        return ResponseEntity.ok(createdProfesseur);
    }

    // Get all professeurs
    @GetMapping
    public ResponseEntity<List<Professeur>> getAllProfesseurs() {
        List<Professeur> professeurs = professeurService.getAllProfesseurs();
        return ResponseEntity.ok(professeurs);
    }

    // Get a professeur by ID
    @GetMapping("/{id}")
    public ResponseEntity<Professeur> getProfesseurById(@PathVariable String id) {
        Optional<Professeur> professeur = professeurService.getProfesseurById(id);
        return professeur.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update a professeur
    @PutMapping("/{id}")
    public ResponseEntity<Professeur> updateProfesseur(@PathVariable String id, @RequestBody Professeur professeur) {
        Professeur updatedProfesseur = professeurService.updateProfesseur(id, professeur);
        return ResponseEntity.ok(updatedProfesseur);
    }

    // Delete a professeur
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfesseur(@PathVariable String id) {
        professeurService.deleteProfesseur(id);
        return ResponseEntity.noContent().build();
    }

    // Get all annonces by professeur ID
    @GetMapping("/{professeurId}/annonces")
    public ResponseEntity<List<Annonce>> getAnnoncesByProfesseur(@PathVariable String professeurId) {
        List<Annonce> annonces = professeurService.getAnnoncesByProfesseur(professeurId);
        return ResponseEntity.ok(annonces);
    }

    // Create an annonce for a professeur
    @PostMapping("/{professeurId}/createannonce")
    public ResponseEntity<Annonce> createAnnonceForProfesseur(@PathVariable String professeurId, @RequestBody Annonce annonce) {
        Annonce createdAnnonce = professeurService.createAnnonceForProfesseur(professeurId, annonce);
        return ResponseEntity.ok(createdAnnonce);
    }

    // Update an annonce for a professeur
    @PutMapping("/{professeurId}/updateannonces/{annonceId}")
    public ResponseEntity<Annonce> updateAnnonceForProfesseur(@PathVariable String professeurId,
                                                              @PathVariable String annonceId,
                                                              @RequestBody Annonce updatedAnnonce) {
        Annonce annonce = professeurService.updateAnnonceForProfesseur(professeurId, annonceId, updatedAnnonce);
        return annonce != null ? ResponseEntity.ok(annonce) : ResponseEntity.notFound().build();
    }

    // Delete an annonce by professeur ID
    @DeleteMapping("/{professeurId}/deleteannonces/{annonceId}")
    public ResponseEntity<Void> deleteAnnonceByProfesseur(@PathVariable String professeurId,
                                                          @PathVariable String annonceId) {
        professeurService.deleteAnnonceByProfesseur(professeurId, annonceId);
        return ResponseEntity.noContent().build();
    }
    //get admin profile
    @GetMapping("/admin/profile/{id}")
    public ResponseEntity<Professeur> getAdminProfile(@PathVariable String id) {
        if (professeurService.isAdmin(id)) {
            Optional<Professeur> professeur = professeurService.getProfesseurById(id);
            return professeur.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }
        return ResponseEntity.status(403).build(); // Forbidden si non-admin
    }
    //update admin profile

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<Professeur> updateAdminProfile(@PathVariable String id, @RequestBody Professeur professeur) {
        Professeur updatedProfesseur = professeurService.updateProfesseur(id, professeur);
        return ResponseEntity.ok(updatedProfesseur);
    }




}
