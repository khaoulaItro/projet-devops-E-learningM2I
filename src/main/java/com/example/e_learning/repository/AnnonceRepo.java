package com.example.e_learning.repository;

import com.example.e_learning.model.Annonce;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AnnonceRepo extends MongoRepository<Annonce,String> {
    List<Annonce> findByAuteurId(String professeurId);
}
