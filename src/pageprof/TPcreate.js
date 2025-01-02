import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TPcreate() {
    const [isLoading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // Stocke le fichier sélectionné
    const [fileError, setFileError] = useState(""); // Pour gérer les erreurs du fichier
    const navigate = useNavigate();

    const myFormik = useFormik({
        initialValues: {
            idProfesseur: "",
            description: "",
            nomModule: "",
            semester: "",
            codeClassroom: "",
            type: "",
            fichierUrl: "", // Champ pour stocker l'URL du fichier
        },
        validate: (values) => {
            let errors = {};

            if (!values.description) {
                errors.description = "Veuillez entrer la description";
            }

            if (!values.semester) {
                errors.semester = "Veuillez entrer le semestre";
            }

            if (!values.codeClassroom) {
                errors.codeClassroom = "Veuillez entrer le code de classroom";
            }

            if (!values.nomModule) {
                errors.nomModule = "Veuillez entrer le module";
            }

            if (!values.idProfesseur) {
                errors.idProfesseur = "Ce champ est obligatoire";
            }

            if (!values.type) {
                errors.type = "Veuillez sélectionner le type";
            }

            // Vérification si un fichier est sélectionné
            if (!selectedFile) {
                setFileError("Veuillez sélectionner un fichier");
            } else {
                setFileError(""); // Réinitialiser l'erreur si un fichier est sélectionné
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);

                // Étape 1 : Téléchargement du fichier
                let fileUrl = "";
                if (selectedFile) {
                    const formData = new FormData();
                    formData.append("file", selectedFile);

                    const fileUploadResponse = await axios.post(
                        "http://localhost:8082/api/files/upload",
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );

                    fileUrl = fileUploadResponse.data; // URL du fichier renvoyée par l'API
                }

                // Étape 2 : Ajout de l'URL du fichier aux données du formulaire
                values.fichierUrl = fileUrl;

                // Étape 3 : Enregistrement des données du support
                await axios.post("http://localhost:8082/api/supports/saveSupport", values);
                navigate("/portalprof/tp-list");
            } catch (error) {
                console.error(error);
                alert("Échec de la création de TP");
            } finally {
                setLoading(false);
            }
        },
    });

    // Gestion du changement de fichier
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setFileError(""); // Réinitialiser l'erreur lors de la sélection d'un fichier
    };

    return (
        <>
            <h3>Création de TP :</h3>
            <div className="container">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <form onSubmit={myFormik.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <label>Id Professeur</label>
                                    <input
                                        name="idProfesseur"
                                        value={myFormik.values.idProfesseur}
                                        onChange={myFormik.handleChange}
                                        type="text"
                                        className={`form-control ${myFormik.errors.idProfesseur ? "is-invalid" : ""
                                            } `}
                                    />
                                    <span style={{ color: "red" }}>{myFormik.errors.idProfesseur}</span>
                                </div>

                                <div className="col-lg-12">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={myFormik.values.description}
                                        onChange={myFormik.handleChange}
                                        className={`form-control ${myFormik.errors.description ? "is-invalid" : ""
                                            } `}
                                    ></textarea>
                                    <span style={{ color: "red" }}>{myFormik.errors.description}</span>
                                </div>

                                <div className="col-lg-12">
                                    <label>Module</label>
                                    <input
                                        name="nomModule"
                                        value={myFormik.values.nomModule}
                                        onChange={myFormik.handleChange}
                                        type="text"
                                        className={`form-control ${myFormik.errors.nomModule ? "is-invalid" : ""
                                            } `}
                                    />
                                    <span style={{ color: "red" }}>{myFormik.errors.nomModule}</span>
                                </div>
                                <div className="col-lg-12">
                                    <label>Semestre</label>
                                    <select
                                        name="semester"
                                        value={myFormik.values.semester}
                                        onChange={myFormik.handleChange}
                                        className={`form-control ${myFormik.errors.semester ? "is-invalid" : ""}`}
                                    >
                                        <option value="">----Sélectionnez----</option>
                                        <option value="S1">S1</option>
                                        <option value="S2">S2</option>
                                        <option value="S3">S3</option>
                                    </select>
                                    <div className="invalid-feedback">{myFormik.errors.semester}</div>
                                </div>

                                <div className="col-lg-12">
                                    <label>Code Classroom</label>
                                    <input
                                        name="codeClassroom"
                                        value={myFormik.values.codeClassroom}
                                        onChange={myFormik.handleChange}
                                        type="text"
                                        className={`form-control ${myFormik.errors.codeClassroom ? "is-invalid" : ""
                                            } `}
                                    />
                                    <span style={{ color: "red" }}>{myFormik.errors.codeClassroom}</span>
                                </div>

                                <div className="col-lg-12">
                                    <label>Type</label>
                                    <select
                                        name="type"
                                        value={myFormik.values.type}
                                        onChange={myFormik.handleChange}
                                        className={`form-control ${myFormik.errors.type ? "is-invalid" : ""
                                            } `}
                                    >
                                        <option value="">----Sélectionnez----</option>
                                        <option value="COUR">COUR</option>
                                        <option value="TP">TP</option>
                                        <option value="TD">TD</option>
                                    </select>  
                                </div>

                                <div className="col-lg-12">
                                    <label>Fichier</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className={`form-control ${fileError ? "is-invalid" : ""}`}
                                    />
                                    <div style={{ color: "red" }}>{fileError}</div>
                                </div>

                                <div className="col-lg-12 mt-3">
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
                </div>
            </div>
        </>
    );
}

export default TPcreate;
