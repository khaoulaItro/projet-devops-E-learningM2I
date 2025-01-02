package com.example.e_learning.service;

import com.example.e_learning.model.Annonce;
import com.example.e_learning.model.Professeur;
import com.example.e_learning.repository.AnnonceRepo;
import com.example.e_learning.repository.ProfesseurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Professeurservice {
    @Autowired
    private ProfesseurRepo professeurRepo;


    // Vérifier si un professeur est administrateur par ikram
    public boolean isAdmin(String professeurId) {
        Professeur professeur = professeurRepo.findById(professeurId)
                .orElseThrow(() -> new RuntimeException("Professeur non trouvé"));
        return professeur.isIsadmin();
    }
    @Autowired
    private AnnonceRepo annonceRepo;

    // CRUD methods

    // Create
    public Professeur createProfesseur(Professeur professeur) {
        return professeurRepo.save(professeur);
    }

    // Read
    public Optional<Professeur> getProfesseurById(String id) {
        return professeurRepo.findById(id);
    }

    public List<Professeur> getAllProfesseurs() {
        return professeurRepo.findAll();
    }

    // Update
    public Professeur updateProfesseur(String id, Professeur professeur) {
        professeur.setId(id); // Mettre à jour l'ID
        return professeurRepo.save(professeur);
    }

    // Delete
    public void deleteProfesseur(String id) {
        professeurRepo.deleteById(id);
    }

    public List<Annonce> getAnnoncesByProfesseur(String professeurId) {
        return annonceRepo.findByAuteurId(professeurId);
    }

    public Annonce createAnnonceForProfesseur(String professeurId, Annonce annonce) {
        annonce.setAuteurId(professeurId); // Définir l'ID de l'auteur
        return annonceRepo.save(annonce); // Sauvegarder l'annonce
    }

    public void deleteAnnonceByProfesseur(String professeurId, String annonceId) {
        Optional<Annonce> annonce = annonceRepo.findById(annonceId);
        if (annonce.isPresent() && annonce.get().getAuteurId().equals(professeurId)) {
            annonceRepo.deleteById(annonceId);
        }
    }

    public Annonce updateAnnonceForProfesseur(String professeurId, String annonceId, Annonce updatedAnnonce) {
        Optional<Annonce> annonce = annonceRepo.findById(annonceId);
        if (annonce.isPresent() && annonce.get().getAuteurId().equals(professeurId)) {
            updatedAnnonce.setId(annonceId); // Mettre à jour l'ID
            updatedAnnonce.setAuteurId(professeurId); // Assurez-vous que l'auteur est le professeur
            return annonceRepo.save(updatedAnnonce);
        }
        return null; // L'annonce n'existe pas ou le professeur n'est pas l'auteur
    }

}
