package com.example.e_learning.controller;

import com.example.e_learning.model.CModule;
import com.example.e_learning.service.ModuleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    private final ModuleService moduleService;

    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    // 1. Créer un module
    @PostMapping
    public ResponseEntity<CModule> createModule(@RequestBody CModule module) {
        CModule savedModule = moduleService.saveModule(module);
        return ResponseEntity.ok(savedModule);
    }

    // 2. Récupérer tous les modules
    @GetMapping
    public ResponseEntity<List<CModule>> getAllModules() {
        List<CModule> modules = moduleService.getAllModules();
        return ResponseEntity.ok(modules);
    }

    // 3. Récupérer un module par son ID
    @GetMapping("/{id}")
    public ResponseEntity<CModule> getModuleById(@PathVariable String id) {
        CModule module = moduleService.getModuleById(id);
        return ResponseEntity.ok(module);
    }

    // 4. Mettre à jour un module
    @PutMapping("/{id}")
    public ResponseEntity<CModule> updateModule(
            @PathVariable String id,
            @RequestBody CModule updatedModule) {
        CModule module = moduleService.updateModule(id, updatedModule);
        return ResponseEntity.ok(module);
    }

    // 5. Supprimer un module
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModule(@PathVariable String id) {
        moduleService.deleteModule(id);
        return ResponseEntity.noContent().build();
    }
}