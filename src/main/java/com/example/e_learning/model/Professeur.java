package com.example.e_learning.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "professeurs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Professeur {

    @Id
    private String id;
    @Field
    private String cin;
    @Field
    private String email;
    @Field
    private String nom;
    @Field
    private String prenom;
    @Field
    private String motdepasse;
    @Field
    private List<String> modules; // Liste des modules
    @Field
    private boolean isadmin; // Indique si le professeur est un administrateur

    @Field
    private String imageURL;

    public Professeur(String cin, String email, String nom, String prenom, String motdepasse, List<String> modules, boolean isadmin,String imageURL) {
        this.cin = cin;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.motdepasse = motdepasse;
        this.modules = modules;
        this.isadmin = isadmin;
    this.imageURL=imageURL;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    @Override
    public String toString() {
        return String.format("Professeur{" +
                        "id='%s', cin='%s', email='%s', nom='%s', prenom='%s', modules=%s, isadmin=%s}",
                id, cin, email, nom, prenom, modules, isadmin);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getMotdepasse() {
        return motdepasse;
    }

    public void setMotdepasse(String motdepasse) {
        this.motdepasse = motdepasse;
    }

    public List<String> getModules() {
        return modules;
    }

    public void setModules(List<String> modules) {
        this.modules = modules;
    }

    public boolean isIsadmin() {
        return isadmin;
    }

    public void setIsadmin(boolean isadmin) {
        this.isadmin = isadmin;
    }
}
