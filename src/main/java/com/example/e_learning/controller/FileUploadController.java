package com.example.e_learning.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
/*
rachid
 */
@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileUploadController {

    private static final String UPLOAD_DIR = "uploads/";

    // Endpoint pour uploader un fichier
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Créer un répertoire si nécessaire
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Générer un nom de fichier unique
            String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // Chemin complet pour le fichier
            Path filePath = Paths.get(UPLOAD_DIR, uniqueFileName);

            // Sauvegarder le fichier sur le disque
            Files.write(filePath, file.getBytes());

            // Retourner l'URL du fichier
            String fileUrl = "http://localhost:8082/" + UPLOAD_DIR + uniqueFileName;
            return ResponseEntity.ok(fileUrl);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'upload du fichier");
        }
    }
}