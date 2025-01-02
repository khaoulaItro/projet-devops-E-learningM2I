import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      heure: "",
      type: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.title) errors.title = "Please enter title";
      if (!values.description) errors.description = "Please enter description";
      if (!values.date) errors.date = "Please enter date";
      if (!values.heure) errors.heure = "Please enter time";
      if (!values.type) errors.type = "Please select a type";

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post("http://localhost:8082/Annonce/add", values);
        navigate("/portal/user-list");
      } catch (error) {
        console.error("Erreur lors de la création :", error);
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <h3>Create Annonce</h3>
      <form onSubmit={myFormik.handleSubmit}>
        <div className="row">
          {["title", "description", "date", "heure", "type"].map((field, index) => (
            <div className="col-lg-6" key={index}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                value={myFormik.values[field]}
                onChange={myFormik.handleChange}
                type={field === "date" ? "date" : field === "heure" ? "time" : field === "auteurId" ? "number" : "text"}
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
            value={isLoading ? "Submitting..." : "Create"}
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default UserCreate;
