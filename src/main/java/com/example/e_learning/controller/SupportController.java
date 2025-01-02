package com.example.e_learning.controller;

import com.example.e_learning.model.Support;
import com.example.e_learning.model.SupportType;
import com.example.e_learning.model.Semester;
import com.example.e_learning.repository.SupportRepository;
import com.example.e_learning.service.SupportService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 rachid
 */
/*
 * Classe contrôleur pour gérer les opérations CRUD et filtrages sur les supports.
 * Les supports sont des documents qui peuvent être filtrés par type ou semestre.
 */
@RestController
@CrossOrigin(origins = "http://localhost:8082") // Si vous utilisez React
@RequestMapping("/api/supports")

public class SupportController {
    private static final Logger logger = LoggerFactory.getLogger(SupportController.class);

    // Injection du service pour gérer la logique métier
    @Autowired
    private SupportService supportService;

    // Injection du repository pour interagir avec la base de données
    @Autowired
    private SupportRepository supportRepository;

    /**
     * Endpoint pour récupérer tous les supports.
     * @return Une liste de tous les supports disponibles dans la base.
     */
    @GetMapping("/getAllSupports")
    public List<Support> getAllSupports() {
        return supportService.getAllSupports();
    }

    /**
     * Endpoint pour récupérer un support spécifique par son ID.
     * @param id L'identifiant unique du support.
     * @return Le support correspondant à l'ID.
     */
    @GetMapping("/getSupportById/{id}")
    public Support getSupportById(@PathVariable String id) {
        return supportService.getSupportById(id);
    }

    /**
     * Endpoint pour sauvegarder un nouveau support.
     * @param support L'objet Support à enregistrer.
     * @return L'objet Support enregistré dans la base.
     */
    @PostMapping("/saveSupport")
    public Support saveSupport(@RequestBody Support support) {
        return supportService.saveSupport(support);
    }

    /**
     * Endpoint pour supprimer un support par son ID.
     * @param id L'identifiant unique du support à supprimer.
     */
    @DeleteMapping("/deleteSupport/{id}")
    public void deleteSupport(@PathVariable String id) {
        supportService.deleteSupport(id);
    }

    /**
     * Endpoint pour récupérer les supports par type.
     * @param type Le type de support (COUR, TP, TD).
     * @return Une liste de supports correspondant au type spécifié.
     */
    @GetMapping("/type/{type}")
    public List<Support> getSupportsByType(@PathVariable SupportType type) {
        return supportService.getSupportsByType(type);
    }

    /**
     * Endpoint pour récupérer les supports par semestre.
     * @param semester Le semestre (S1, S2, S3).
     * @return Une liste de supports correspondant au semestre spécifié.
     */
    @GetMapping("/semester/{semester}")
    public List<Support> getSupportsBySemester(@PathVariable Semester semester) {
        return supportService.getSupportsBySemester(semester);
    }

    /**
     * Endpoint pour récupérer les supports par type et semestre.
     * @param type Le type de support (COUR, TP, TD).
     * @param semester Le semestre (S1, S2, S3).
     * @return Une liste de supports correspondant au type et semestre spécifiés.
     */
    @GetMapping("/type/{type}/semester/{semester}")
    public List<Support> getSupportsByTypeAndSemester(@PathVariable SupportType type, @PathVariable Semester semester) {
        return supportService.getSupportsByTypeAndSemester(type, semester);
    }

    /**
     * Endpoint pour modifier un support existant.
     * @param id L'identifiant unique du support à modifier.
     * @param updatedSupport L'objet Support contenant les nouvelles valeurs.
     * @return Le support modifié ou une réponse Not Found si l'ID est invalide.
     */
    @PutMapping("/updateSupport/{id}")
    public ResponseEntity<Support> updateSupport(
            @PathVariable String id,
            @RequestBody Support updatedSupport) {

        // Vérification de l'existence du support
        Optional<Support> optionalSupport = supportRepository.findById(id);

        if (optionalSupport.isPresent()) {
            Support existingSupport = optionalSupport.get();

            // Mise à jour des champs du support existant
            existingSupport.setNomModule(updatedSupport.getNomModule());
            existingSupport.setSemester(updatedSupport.getSemester());
            existingSupport.setDescription(updatedSupport.getDescription());
            existingSupport.setCodeClassroom(updatedSupport.getCodeClassroom());
            existingSupport.setFichierUrl(updatedSupport.getFichierUrl());
            existingSupport.setType(updatedSupport.getType());

            // Sauvegarde du support modifié
            Support savedSupport = supportRepository.save(existingSupport);
            return ResponseEntity.ok(savedSupport);
        } else {
            // Retourner une réponse 404 si le support n'existe pas
            return ResponseEntity.notFound().build();
        }
    }
    @Autowired
    private SupportService SupportService;
    //here
    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadSupport(@PathVariable String id) {
        Support support = supportService.getSupportById(id);
        if (support == null || support.getFichierUrl() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Support introuvable ou URL de fichier manquante.");
        }

        try {
            // Définir le chemin de base pour les fichiers
            String baseDirectory = "uploads"; // Répertoire de base des fichiers
            Path filePath = Paths.get(baseDirectory).resolve(support.getFichierUrl()).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fichier introuvable : " + filePath.toString());
            }

            // Détecter le type MIME
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            // Retourner la réponse avec le fichier
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath.getFileName().toString() + "\"")
                    .body(resource);

        } catch (IOException e) {
            // Log en cas d'erreur
            logger.error("Erreur lors du téléchargement du fichier pour ID : " + id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur interne : impossible de télécharger le fichier.");
        }
    }


}