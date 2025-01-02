import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      cin: "",
      email: "",
      nom: "",
      prenom: "",
      motdepasse: "",
      modules: "",
      isadmin: false,
      imageURL: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.cin) {
        errors.cin = "Veuillez entrer le CIN.";
      }

      if (!values.email) {
        errors.email = "Veuillez entrer une adresse email.";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Adresse email invalide.";
      }

      if (!values.nom) {
        errors.nom = "Veuillez entrer le nom.";
      }

      if (!values.prenom) {
        errors.prenom = "Veuillez entrer le prénom.";
      }

      if (!values.motdepasse) {
        errors.motdepasse = "Veuillez entrer un mot de passe.";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        values.modules = values.modules.split(",").map((mod) => mod.trim()); // Convertir les modules en tableau
        await axios.post("http://localhost:8082/api/professeurs", values); // Endpoint API
        navigate("/portal/list"); // Redirection après soumission réussie
      } catch (error) {
        console.error("Erreur lors de la création :", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <form onSubmit={myFormik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>CIN</label>
            <input
              name="cin"
              value={myFormik.values.cin}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${myFormik.errors.cin ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.cin}</span>
          </div>

          <div className="col-lg-6">
            <label>Adresse Email</label>
            <input
              name="email"
              value={myFormik.values.email}
              onChange={myFormik.handleChange}
              type="email"
              className={`form-control ${myFormik.errors.email ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.email}</span>
          </div>

          <div className="col-lg-6">
            <label>Nom</label>
            <input
              name="nom"
              value={myFormik.values.nom}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${myFormik.errors.nom ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.nom}</span>
          </div>

          <div className="col-lg-6">
            <label>Prénom</label>
            <input
              name="prenom"
              value={myFormik.values.prenom}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${myFormik.errors.prenom ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.prenom}</span>
          </div>

          <div className="col-lg-6">
            <label>Mot de passe</label>
            <input
              name="motdepasse"
              value={myFormik.values.motdepasse}
              onChange={myFormik.handleChange}
              type="password"
              className={`form-control ${myFormik.errors.motdepasse ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.motdepasse}</span>
          </div>

          <div className="col-lg-6">
            <label>Modules (séparés par des virgules)</label>
            <input
              name="modules"
              value={myFormik.values.modules}
              onChange={myFormik.handleChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="col-lg-6">
            <label>Admin</label>
            <select
              name="isadmin"
              value={myFormik.values.isadmin}
              onChange={myFormik.handleChange}
              className="form-control"
            >
              <option value={false}>Non</option>
              <option value={true}>Oui</option>
            </select>
          </div>

          <div className="col-lg-6">
            <label>Image URL</label>
            <input
              name="imageURL"
              value={myFormik.values.imageURL}
              onChange={myFormik.handleChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="col-lg-4 mt-3">
            <input
              disabled={isLoading}
              type="submit"
              value={isLoading ? "En cours..." : "Créer"}
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;