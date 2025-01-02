import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Createmodule() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nom: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.nom) {
        errors.nom = "Veuillez entrer un nom.";
      }
      if (!values.description) {
        errors.description = "Veuillez entrer une description.";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post("http://localhost:8082/api/modules", values);
        navigate("/portal/listmodule");
      } catch (error) {
        console.error("Erreur lors de la création :", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <h3>Créer un Module</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            value={formik.values.nom}
            onChange={formik.handleChange}
            className={`form-control ${formik.errors.nom ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{formik.errors.nom}</div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className={`form-control ${formik.errors.description ? "is-invalid" : ""}`}
          ></textarea>
          <div className="invalid-feedback">{formik.errors.description}</div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Création..." : "Créer"}
        </button>
      </form>
    </div>
  );
}

export default Createmodule;
