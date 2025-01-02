package com.example.e_learning.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection= "annonces")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Annonce {

    @Id
    private String id;
    @Field
    private String title;
    @Field
    private String description;
    @Field
    private LocalDate date;
    @Field
    private LocalTime heure;
    @Field
    private String type;
    @Field
    private String auteurId; // Stockage de l'ID du professeur

    public Annonce(String title,String description, LocalDate date, LocalTime heure, String type, String auteurId) {
        this.title=title;
        this.description = description;
        this.date = date;
        this.heure = heure;
        this.type = type;
        this.auteurId = auteurId; // Initialisation de l'ID du professeur
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuteurId() {
        return auteurId;
    }

    public void setAuteurId(String auteurId) {
        this.auteurId = auteurId;
    }

    @Override
    public String toString() {
        return String.format("Annonce{" +
                "id='" + id + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", heure=" + heure +
                ", type='" + type + '\'' +
                ", auteurId='" + auteurId + '\'' +
                '}');
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getHeure() {
        return heure;
    }

    public void setHeure(LocalTime heure) {
        this.heure = heure;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
