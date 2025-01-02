package com.example.e_learning.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "supports")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Support {

    @Id
    private String id;

    private String nomModule; // Nom du module
    private String idProfesseur; // ID du professeur
    private String description; // Description du support
    private String codeClassroom; // Code de la salle de classe
    private String fichierUrl; // URL du fichier PDF

    private SupportType type; // Enum : COUR, TP, TD
    private Semester semester; // Enum : S1, S2, S3
}
