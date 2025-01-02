import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Editmodule() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchModule();
  }, []);

  const fetchModule = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/api/modules/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du module :", error);
    }
  };

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
        await axios.put(`http://localhost:8082/api/modules/${id}`, values);
        navigate("/portal/listmodule");
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <h3>Modifier le Module</h3>
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
          {isLoading ? "Mise à jour..." : "Modifier"}
        </button>
      </form>
    </div>
  );
}

export default Editmodule;
