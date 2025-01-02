import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TDedit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // Stocke le fichier sélectionné
    const [fileError, setFileError] = useState(""); // Gestion des erreurs liées au fichier
    const navigate = useNavigate();

    const myFormik = useFormik({
        initialValues: {
            idProfesseur: "",
            description: "",
            nomModule: "",
            semester: "",
            codeClassroom: "",
            type: "",
            fichierUrl: "",
        },
        enableReinitialize: true, // Permet à Formik de réinitialiser les valeurs quand initialValues changent
        validate: (values) => {
            let errors = {};
            if (!values.description) errors.description = "Veuillez entrer la description";
            if (!values.semester) errors.semester = "Veuillez entrer le semestre";
            if (!values.codeClassroom) errors.codeClassroom = "Veuillez entrer le code de classroom";
            if (!values.nomModule) errors.nomModule = "Veuillez entrer le module";
            if (!values.idProfesseur) errors.idProfesseur = "Ce champs est obligatoire";
            if (!values.type) errors.type = "Veuillez selectionez le type";
            // Vérification si un fichier est sélectionné
            if (!selectedFile && !values.fichierUrl) {
                setFileError("Veuillez sélectionner un fichier");
            } else {
                setFileError("");
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);

                // Étape 1 : Téléchargement du fichier (si un nouveau fichier est sélectionné)
                let fileUrl = values.fichierUrl; // Utiliser l'URL existante par défaut
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

                // Étape 3 : Mise à jour des données de TDs
                await axios.put(
                    `http://localhost:8082/api/supports/updateSupport/${params.id}`,
                    values
                );

                navigate("/portalprof/td-list");
            } catch (error) {
                console.error("Erreur de modification:", error);
                alert("Échec de la modification");
            } finally {
                setLoading(false);
            }
        },
    });

    // Pré-remplir les valeurs
    const getTDsData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8082/api/supports/getSupportById/${params.id}`);
            const tdsData = response.data;

            // Assurez-vous que les données correspondent aux initialValues
            myFormik.setValues({
                idProfesseur: tdsData.idProfesseur || "",
                description: tdsData.description || "",
                nomModule: tdsData.nomModule || "",
                semester: tdsData.semester || "",
                codeClassroom: tdsData.codeClassroom || "",
                type: tdsData.type || "",
                fichierUrl: tdsData.fichierUrl || "",
            });
            setLoading(false);
        } catch (error) {
            console.log("Erreur lors de la récupération des données :", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getTDsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]); // Ajouter 'id' comme dépendance pour éviter les avertissements
    // Note: Assurez-vous que l'URL de récupération correspond à votre API

    // Gestion du changement de fichier
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setFileError(""); // Réinitialiser l'erreur lors de la sélection d'un fichier
    };
    return (
        <>
            <h3>Modification du TD - ID : {params.id}</h3>
            <div className='container'>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <form onSubmit={myFormik.handleSubmit}>
                            <div className='row'>
                                {/* Champs du formulaire */}
                                <div className="col-12">
                                    <label>Id Professeur</label>
                                    <input
                                        name='idProfesseur'
                                        value={myFormik.values.idProfesseur}
                                        onChange={myFormik.handleChange}
                                        type="text"
                                        readOnly // Empêche la modification
                                        className={`form-control ${myFormik.errors.idProfesseur ? "is-invalid" : ""}`}
                                    />
                                    <span style={{ color: "red" }}>{myFormik.errors.idProfesseur}</span>
                                </div>
                                <div className="col-12">
                                    <label>Description</label>
                                    <textarea name='description' value={myFormik.values.description} onChange={myFormik.handleChange}
                                        className={`form-control ${myFormik.errors.description ? "is-invalid" : ""} `}></textarea>
                                    <span style={{ color: "red" }}>{myFormik.errors.description}</span>
                                </div>

                                <div className="col-12">
                                    <label>Module</label>
                                    <input name='nomModule' value={myFormik.values.nomModule} onChange={myFormik.handleChange} type={"text"}
                                        className={`form-control ${myFormik.errors.nomModule ? "is-invalid" : ""} `} />
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


                                <div className="col-12">
                                    <label>CodeClassroom</label>
                                    <input name='codeClassroom' value={myFormik.values.codeClassroom} onChange={myFormik.handleChange} type={"text"}
                                        className={`form-control ${myFormik.errors.codeClassroom ? "is-invalid" : ""} `} />
                                    <span style={{ color: "red" }}>{myFormik.errors.codeClassroom}</span>
                                </div>

                                <div className="col-12">
                                    <label>Fichier</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className={`form-control ${fileError ? "is-invalid" : ""}`}
                                    />
                                    <div style={{ color: "red" }}>{fileError}</div>
                                    {/* Afficher l'URL du fichier existant */}
                                    {myFormik.values.fichierUrl && !selectedFile && (
                                        <p>Fichier existant : <a href={myFormik.values.fichierUrl} target="_blank" rel="noopener noreferrer">Télécharger</a></p>
                                    )}
                                </div>

                                <div className="col-12">
                                    <label>Type</label>
                                    <select name='type' value={myFormik.values.type} onChange={myFormik.handleChange}
                                        className={`form-control ${myFormik.errors.type ? "is-invalid" : ""} `}>
                                        <option value="">----Selectionnez----</option>
                                        <option value="COUR">COUR</option>
                                        <option value="TP">TP</option>
                                        <option value="TD">TD</option>
                                    </select>
                                    <span style={{ color: "red" }}>{myFormik.errors.type}</span>
                                </div>

                                <div className='col-12 mt-3'>
                                    <input disabled={isLoading} type="submit" value={isLoading ? "Updating..." : "Modifier"} className='btn btn-primary' />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TDedit;
