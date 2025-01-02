import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditAnnonce() {
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

            if (!values.title) errors.title = "Veuillez entrer le titre";
            if (!values.description) errors.description = "Veuillez entrer la description";
            if (!values.date) errors.date = "Veuillez entrer la date";
            if (!values.heure) errors.heure = "Veuillez entrer l'heure";
            if (!values.type) errors.type = "Veuillez sélectionner le type";
            if (!values.auteurId) errors.auteurId = "Veuillez entrer le author ID";

            return errors;
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await axios.put(`http://localhost:8082/Annonce/update/${id}`, values);
                setLoading(false);
                navigate("/portalprof/annonces-list");
            } catch (error) {
                console.error("Erreur lors de la mise à jour :", error);
                setLoading(false);
            }
        },
    });

    return (
        <>
            <h3>Modification de l'annonce - ID : {id}</h3>
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
                                value={myFormik.values[field]}
                                onChange={myFormik.handleChange}
                                            type={field === "date" ? "date" : field === "heure" ? "time" : "text"}
                                className={`form-control ${myFormik.errors[field] ? "is-invalid" : ""}`}
                                readOnly={field === "auteurId"}
                            />
                            <span style={{ color: "red" }}>{myFormik.errors[field]}</span>
                        </div>
                    ))}
                </div>
                <div className="col-lg-12 mt-3">
                    <input
                        disabled={isLoading}
                        type="submit"
                        value={isLoading ? "En cours de modification..." : "Modifier"}
                        className="btn btn-primary"
                    />
                </div>
                        </form>
                    </div></div></div></>
    );
}

export default EditAnnonce;