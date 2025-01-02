package com.example.e_learning.repository;

import com.example.e_learning.model.CModule;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ModuleRepository extends MongoRepository<CModule, String> {
    // Méthodes spécifiques si nécessaire
}