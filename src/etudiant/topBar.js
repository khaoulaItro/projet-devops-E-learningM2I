import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import des icônes
import './topBar.css'; // Assure-toi d'importer le fichier CSS pour les styles

function Topbar() {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [user, setUser] = useState({
        id: "671b96c17914449c1cca58ce",
        cin: "Q4166540",
        cne: "F2562612",
        imageURL: "https://thumbs.dreamstime.com/b/portrait-happy-smiling-male-student-books-19001499.jpg",
        modules: "module4",
        apogee: "2020637",
        email: "youssef@gmail.ma",
        nom: "alaoui",
        prenom: "youssef",
        _class: "com.example.e_learning.model.Etudiant",
        motDePasse: "123"
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const openProfileModal = () => {
        setIsModalOpen(true);
    };

    const closeProfileModal = () => {
        setIsModalOpen(false);
    };

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <Link className="navbar-brand" to="/"></Link>

            {/* Navbar items */}
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow mx-1">
                    {/* Avatar avec la première lettre du prénom */}
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="profileDropdown"
                        role="button"
                        onClick={toggleProfileDropdown}
                        aria-haspopup="true"
                        aria-expanded={isProfileDropdownOpen ? 'true' : 'false'}
                    >
                        <div
                            className="avatar"
                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "#4e73df", // Couleur de fond
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                fontSize: "18px",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                            }}
                        >
                            {user.prenom ? user.prenom[0] : "?"}
                        </div>
                    </a>
                    <div
                        className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${
                            isProfileDropdownOpen ? 'show' : ''
                        }`}
                        aria-labelledby="profileDropdown"
                    >
                        {/* Option Mon Profil avec icône */}
                        <Link className="dropdown-item" onClick={openProfileModal}>
                            <FontAwesomeIcon icon={faUser} className="mr-2" /> Mon profil
                        </Link>
                        <div className="dropdown-divider"></div>
                        {/* Option Déconnexion avec icône */}
                        <Link className="dropdown-item" to="/">
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Déconnexion
                        </Link>
                    </div>
                </li>
            </ul>

            {/* Modal for displaying profile info */}
            {isModalOpen && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Mon Profil</h5>
                                <button type="button" className="close" onClick={closeProfileModal}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="profile-header">
                                    <img src={user.imageURL} alt="Profile" className="profile-image" />
                                    <div className="profile-details">
                                        <div className="profile-left">
                                            <p><strong>CIN:</strong> {user.cin}</p>
                                            <p><strong>CNE:</strong> {user.cne}</p>
                                            <p><strong>Modules:</strong> {user.modules}</p>
                                            <p><strong>Apogee:</strong> {user.apogee}</p>
                                        </div>
                                        <div className="profile-right">
                                            <p><strong>Nom:</strong> {user.nom}</p>
                                            <p><strong>Prénom:</strong> {user.prenom}</p>
                                            <p><strong>Email:</strong> {user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeProfileModal}>Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Topbar;
