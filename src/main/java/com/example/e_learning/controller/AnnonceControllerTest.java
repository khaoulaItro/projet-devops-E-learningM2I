package com.example.e_learning.controller;

import com.example.e_learning.model.Annonce;
import com.example.e_learning.service.AnnonceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/Annonce")
public class AnnonceControllerTest {
    @Autowired
    private AnnonceService annonceService;

    
    @PostMapping("add")
    public ResponseEntity<Annonce> createAnnonce(@RequestBody Annonce annonce) {
        Annonce createdAnnonce = annonceService.createAnnonce(annonce);
        return new ResponseEntity<>(createdAnnonce, HttpStatus.CREATED);
    }

    // Get all Annonces
    @GetMapping
    public ResponseEntity<List<Annonce>> getAllAnnonces() {
        List<Annonce> annonces = annonceService.getAllAnnonces();
        return new ResponseEntity<>(annonces, HttpStatus.OK);
    }

    // Get a specific Annonce by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Annonce> getAnnonceById(@PathVariable String id) {
        Optional<Annonce> annonce = annonceService.getAnnonceById(id);
        return annonce.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update an existing Annonce
    @PutMapping("/update/{id}")
    public ResponseEntity<Annonce> updateAnnonce(@PathVariable String id, @RequestBody Annonce annonce) {
        try {
            Annonce updatedAnnonce = annonceService.updateAnnonce(id, annonce);
            return new ResponseEntity<>(updatedAnnonce, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete an Annonce by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAnnonce(@PathVariable String id) {
        annonceService.deleteAnnonce(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Configuration
    public static class FileStorageConfig implements WebMvcConfigurer {

        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("/uploads/**")
                    .addResourceLocations("file:uploads/");
        }
    }
}
