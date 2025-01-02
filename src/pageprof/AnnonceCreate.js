import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AnnonceCreate() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const myFormik = useFormik({
        initialValues: {
            title: "",
            description: "",
            date: "",
            heure: "",
            type: "",
            auteurId: ""
        },
        validate: (values) => {
            const errors = {};

            if (!values.title) errors.title = "Veuillez entrer le titre";
            if (!values.description) errors.description = "Veuillez entrer la description";
            if (!values.date) errors.date = "Veuillez entrer la date";
            if (!values.heure) errors.heure = "Veuillez entrer l'heure";
            if (!values.type) errors.type = "Veuillez sélectionner le type";
            if (!values.auteurId) errors.auteurId = "Veuillez entrer le author ID";

            return errors;
        },
        onSubmit: async (values) => {
            console.log("Données envoyées :", values); // Inspectez les données
            try {
                setLoading(true);
                const response = await axios.post("http://localhost:8082/Annonce/add", values);
                console.log("Réponse serveur :", response);
                navigate("/portalprof/annonces-list");
            } catch (error) {
                console.error("Erreur lors de la création :", error);
                setLoading(false);
            }
        },
    });

    return (
       <>
            <h3>Création de l'Annonce :</h3>
            <div className="container">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
            <form onSubmit={myFormik.handleSubmit}>
                <div className="row">
                                {["auteurId", "title", "description", "date", "heure", "type"].map((field, index) => (
                        <div className="col-lg-12" key={index}>
                            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                                name={field}
                                //readOnly={field === "auteurId"}
                                value={myFormik.values[field]}
                                onChange={myFormik.handleChange}
                                type={field === "date" ? "date" : field === "heure" ? "time" : "text"}
                                className={`form-control ${myFormik.errors[field] ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{myFormik.errors[field]}</span>
                        </div>
                    ))}
                </div>
                <div className="col-lg-12 mt-3">
                    <input
                        disabled={isLoading}
                        type="submit"
                        value={isLoading ? "En cours..." : "Créer"}
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div></div></div></>
    );
}

export default AnnonceCreate;