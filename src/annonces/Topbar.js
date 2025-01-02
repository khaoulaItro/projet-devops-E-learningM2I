import { faBell, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function Topbar() {
    const [profileImage, setProfileImage] = useState(null); // État pour stocker l'image de profil

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await axios.get('http://localhost:8082/professeur/admin/profile/6738e2dbca70207704909f4b');
                setProfileImage(response.data.imageURL); // Remplacez 'imageURL' par le bon champ
            } catch (error) {
                console.error("Erreur lors de la récupération de l'image de profil:", error);
            }
        };

        fetchProfileImage();
    }, []);

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* Sidebar Toggle (Topbar) */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <FontAwesomeIcon icon={faBars} />
            </button>

         

            {/* Topbar Navbar */}
            <ul className="navbar-nav ml-auto">
                {/* Alerts */}
                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FontAwesomeIcon icon={faBell} />
                        <span className="badge badge-danger badge-counter">3+</span>
                    </a>
                </li>

                {/* Messages */}
                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span className="badge badge-danger badge-counter">7</span>
                    </a>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                {/* User Information */}
                <li className="nav-item dropdown no-arrow">
                    <Link className="nav-link dropdown-toggle" to="/portal/ProfileAdmin" id="userDropdown" role="button">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Profile</span>
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }}
                            />
                        ) : (
                            <FontAwesomeIcon icon={faCircleUser} size={"xl"} />
                        )}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Topbar;
