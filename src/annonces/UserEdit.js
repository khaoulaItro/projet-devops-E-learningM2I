import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserEdit() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAnnonceData();
  }, []);

  const getAnnonceData = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/Annonce/get/${id}`);
      myFormik.setValues(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

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

      if (!values.title) errors.title = "Please enter title";
      if (!values.description) errors.description = "Please enter description";
      if (!values.date) errors.date = "Please enter date";
      if (!values.heure) errors.heure = "Please enter time";
      if (!values.type) errors.type = "Please select a type";
      if (!values.auteurId) errors.auteurId = "Please enter author ID";

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(`http://localhost:8082/Annonce/update/${id}`, values);
        setLoading(false);
        navigate("/portal/user-list");
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <h3>Edit Annonce - ID : {id}</h3>
      <form onSubmit={myFormik.handleSubmit}>
        <div className="row">
          {["title", "description", "date", "heure", "type", "auteurId"].map((field, index) => (
            <div className="col-lg-6" key={index}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                value={myFormik.values[field]}
                onChange={myFormik.handleChange}
                type={field === "date" || field === "heure" ? field : "text"}
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
            value={isLoading ? "Updating..." : "Update"}
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default UserEdit;
