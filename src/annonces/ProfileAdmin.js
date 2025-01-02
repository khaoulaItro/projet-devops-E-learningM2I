import React, { useState } from "react";
import "./Dashboard.css"; // Importation des styles CSS

function ProfileAdmin() {
    const [isEditing, setIsEditing] = useState(false);
    const [adminInfo, setAdminInfo] = useState({
        id: "6738e2dbca70207704909f4b",
        nom: "Sanaeff",
        prenom: "Mazouz",
        cin: "A123456",
        email: "SanaeMazouz@example.com",
        motdepasse: "password123",
        modules: ["Histoire", "Géographie", "Philosophie"],
        isadmin: true,
        imageURL: "" // URL de l'image si nécessaire
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminInfo({
            ...adminInfo,
            [name]: value
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        console.log("Données sauvegardées:", adminInfo);
        setIsEditing(false);
        alert("Les modifications ont été sauvegardées !");
    };

    return (
        <div className="container">
            <div className="profile-header">
                <h1>{adminInfo.prenom} {adminInfo.nom}</h1>
                <h5>{adminInfo.isadmin ? "Administrateur" : "Professeur"}</h5>
            </div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Informations du profil</h1>
            </div>
            <div className="table-responsive">
                {isEditing ? (
                    <form>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>Nom</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="nom"
                                            value={adminInfo.nom}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Prénom</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="prenom"
                                            value={adminInfo.prenom}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>CIN</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="cin"
                                            value={adminInfo.cin}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <input
                                            type="email"
                                            name="email"
                                            value={adminInfo.email}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Mot de passe</td>
                                    <td>
                                        <input
                                            type="password"
                                            name="motdepasse"
                                            value={adminInfo.motdepasse}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Modules</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="modules"
                                            value={adminInfo.modules.join(", ")}
                                            onChange={(e) =>
                                                handleChange({
                                                    target: {
                                                        name: "modules",
                                                        value: e.target.value.split(",").map(mod => mod.trim())
                                                    }
                                                })
                                            }
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Image de profil (URL)</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="imageURL"
                                            value={adminInfo.imageURL}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                        {adminInfo.imageURL && (
                                            <img
                                                src={adminInfo.imageURL}
                                                alt="Aperçu"
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    marginTop: "10px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" className="btn btn-success" onClick={handleSave}>Sauvegarder</button>
                    </form>
                ) : (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Champ</th>
                                <th>Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nom</td>
                                <td>{adminInfo.nom}</td>
                            </tr>
                            <tr>
                                <td>Prénom</td>
                                <td>{adminInfo.prenom}</td>
                            </tr>
                            <tr>
                                <td>CIN</td>
                                <td>{adminInfo.cin}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{adminInfo.email}</td>
                            </tr>
                            <tr>
                                <td>Modules</td>
                                <td>{adminInfo.modules.join(", ")}</td>
                            </tr>
                            <tr>
                                <td>Image de profil</td>
                                <td>
                                    {adminInfo.imageURL ? (
                                        <img
                                            src={adminInfo.imageURL}
                                            alt="Profil"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "50%",
                                                objectFit: "cover"
                                            }}
                                        />
                                    ) : (
                                        "Aucune image disponible"
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
            <div className="d-flex justify-content-between mt-4">
                {!isEditing && (
                    <button className="btn btn-primary" onClick={handleEdit}>Modifier</button>
                )}
            </div>
        </div>
    );
}

export default ProfileAdmin;
