package com.example.e_learning.service;

import com.example.e_learning.model.Support;
import com.example.e_learning.model.SupportType;
import com.example.e_learning.model.Semester;
import com.example.e_learning.repository.SupportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
/*
rachid
 */
@Service
public class SupportService {

    @Autowired
    private SupportRepository supportRepository;

    public List<Support> getAllSupports() {
        return supportRepository.findAll();
    }

    public Support getSupportById(String id) {
        return supportRepository.findById(id).orElse(null);
    }

    public Support saveSupport(Support support) {
        return supportRepository.save(support);
    }

    public void deleteSupport(String id) {
        supportRepository.deleteById(id);
    }

    public List<Support> getSupportsByType(SupportType type) {
        return supportRepository.findByType(type);
    }

    public List<Support> getSupportsBySemester(Semester semester) {
        return supportRepository.findBySemester(semester);
    }

    public List<Support> getSupportsByTypeAndSemester(SupportType type, Semester semester) {
        return supportRepository.findByTypeAndSemester(type, semester);
    }
}
