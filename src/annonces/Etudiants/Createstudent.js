import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Createstudent() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      nom: "",
      prenom: "",
      email: "",
      modules: "",
      cin: "",
      cne: ""
    },
    validate: (values) => {
      const errors = {};

      if (!values.nom) {
        errors.nom = "Veuillez entrer le nom";
      }

      if (!values.prenom) {
        errors.prenom = "Veuillez entrer le prénom";
      }

      if (!values.email) {
        errors.email = "Veuillez entrer une adresse email";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Adresse email invalide";
      }

      if (!values.modules) {
        errors.modules = "Veuillez sélectionner un module";
      }

      if (!values.cin) {
        errors.cin = "Veuillez entrer le CIN";
      }

      if (!values.cne) {
        errors.cne = "Veuillez entrer le CNE";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post("http://localhost:8082/etudiants", values); // URL de votre API
        navigate("/portal/liststudent"); // Redirige après la soumission
      } catch (error) {
        console.error("Erreur lors de la création d'etudiants :", error);
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <h3>Ajouter un étudiant</h3>
      <form onSubmit={myFormik.handleSubmit}>
        <div className="row">
          {["nom", "prenom", "email", "modules", "cin", "cne"].map((field, index) => (
            <div className="col-lg-6" key={index}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                value={myFormik.values[field]}
                onChange={myFormik.handleChange}
                type={field === "email" ? "email" : "text"}
                className={`form-control ${myFormik.errors[field] ? "is-invalid" : ""}`}
              />
              <span style={{ color: "red" }}>{myFormik.errors[field]}</span>
            </div>
          ))}
        </div>
        <div className="col-lg-4 mt-3">
          <input
            disabled={isLoading}
            type="submit"
            value={isLoading ? "En cours..." : "Ajouter"}
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default Createstudent;
