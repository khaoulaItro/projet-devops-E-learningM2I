package com.example.e_learning.service;

import com.example.e_learning.model.CModule;
import com.example.e_learning.model.Professeur;
import com.example.e_learning.repository.ModuleRepository;
import com.example.e_learning.repository.ProfesseurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;


    private ProfesseurRepo professeurRepo;


    // 1. Créer un module
    public CModule createModule(String nom, String description) {
        CModule module = new CModule();
        module.setNom(nom);
        module.setDescription(description);
        return moduleRepository.save(module);
    }

    // 2. Récupérer tous les modules
    public List<CModule> getAllModules() {
        return moduleRepository.findAll();
    }

    // 3. Récupérer un module par son ID
    public CModule getModuleById(String id) {
        return moduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found"));
    }
    public ModuleService(ProfesseurRepo professeurRepo, ModuleRepository moduleRepository) {
        this.professeurRepo = professeurRepo;
        this.moduleRepository = moduleRepository;
    }

    public CModule saveModule(CModule module) {
        if (module.getProfesseur() != null && module.getProfesseur().getId() != null) {
            Professeur professeur = professeurRepo.findById(module.getProfesseur().getId())
                    .orElseThrow(() -> new RuntimeException("Professeur non trouvé"));
            module.setProfesseur(professeur);
        }
        return moduleRepository.save(module);
    }
    // 4. Mettre à jour un module
    public CModule updateModule(String id, CModule updatedModule) {
        CModule existingModule = getModuleById(id); // Obtenez le module existant
        existingModule.setNom(updatedModule.getNom());
        existingModule.setDescription(updatedModule.getDescription());
        // Ajoutez ici d'autres champs à mettre à jour si nécessaire
        return moduleRepository.save(existingModule); // Sauvegardez le module mis à jour
    }

    // 5. Supprimer un module
    public void deleteModule(String id) {
        CModule module = getModuleById(id);
        moduleRepository.delete(module);
    }
}