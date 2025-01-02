package com.example.e_learning.repository;

import com.example.e_learning.model.Support;
import com.example.e_learning.model.SupportType;
import com.example.e_learning.model.Semester;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
/*
rachid
 */
@Repository
public interface SupportRepository extends MongoRepository<Support, String> {
    List<Support> findByType(SupportType type); // Récupérer par type
    List<Support> findBySemester(Semester semester); // Récupérer par semestre
    List<Support> findByTypeAndSemester(SupportType type, Semester semester); // Récupérer par type et semestre
}
