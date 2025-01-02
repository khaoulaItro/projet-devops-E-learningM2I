import { faFaceLaughWink, faUsers, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Fichier CSS pour les styles

function Sidebar() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Par défaut, la sidebar est masquée

    // Fonction pour basculer l'affichage de la barre latérale
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div>
            {/* Icône pour afficher/masquer la barre latérale */}
            <div className="toggle-icon" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={isSidebarVisible ? faTimes : faBars} size="2x" />
            </div>

            {/* Barre latérale en tant que fenêtre */}
            {isSidebarVisible && (
                <div className="sidebar-overlay" onClick={toggleSidebar}>
                    <div
                        className="sidebar-window"
                        onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant dans la fenêtre
                    >
                        <ul className="navbar-nav sidebar sidebar-dark accordion">
                            {/* Sidebar - Brand */}
                            <a
                                className="sidebar-brand d-flex align-items-center justify-content-center"
                                href="index.html"
                            >
                                <div className="sidebar-brand-icon rotate-n-15">
                                    <FontAwesomeIcon icon={faFaceLaughWink} size="2x" />
                                </div>
                                <div className="sidebar-brand-text mx-3">
                                    E-learning <sup>2</sup>
                                </div>
                            </a>

                            {/* Divider */}
                            <hr className="sidebar-divider my-0" />

                            {/* Nav Items */}
                            <li className="nav-item active">
                                <Link className="nav-link" to="/portal/user-list">
                                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                                    <span>Gèrer Annonces</span>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/portal/list">
                                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                                    <span>Gèrer professeur</span>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/portal/liststudent">
                                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                                    <span>Gèrer Etudiants</span>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/portal/listmodule">
                                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                                    <span>Gèrer modules</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
