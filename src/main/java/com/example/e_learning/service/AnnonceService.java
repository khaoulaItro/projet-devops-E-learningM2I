package com.example.e_learning.service;

import com.example.e_learning.model.Annonce;
import com.example.e_learning.repository.AnnonceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnonceService {

    @Autowired
    private AnnonceRepo annonceRepo;

    // Create an Annonce
    public Annonce createAnnonce(Annonce annonce) {

        return annonceRepo.save(annonce);
    }

    // Retrieve all Annonces
    public List<Annonce> getAllAnnonces() {
        return annonceRepo.findAll();
    }

    // Retrieve a specific Annonce by ID
    public Optional<Annonce> getAnnonceById(String id) {
        return annonceRepo.findById(id);
    }

    // Update an Annonce
    public Annonce updateAnnonce(String id, Annonce updatedAnnonce) {
        return annonceRepo.findById(id).map(existingAnnonce -> {
            existingAnnonce.setDescription(updatedAnnonce.getDescription());
            existingAnnonce.setDate(updatedAnnonce.getDate());
            existingAnnonce.setHeure(updatedAnnonce.getHeure());
            existingAnnonce.setType(updatedAnnonce.getType());
            existingAnnonce.setTitle(updatedAnnonce.getTitle());
            return annonceRepo.save(existingAnnonce);
        }).orElseThrow(() -> new RuntimeException("Annonce not found with id: " + id));
    }

    // Delete an Annonce by ID
    public void deleteAnnonce(String id) {
        annonceRepo.deleteById(id);
    }
}
