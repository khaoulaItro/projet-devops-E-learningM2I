package com.example.e_learning.repository;

import com.example.e_learning.model.Etudiant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtudiantRepository extends MongoRepository<Etudiant, String> {
}