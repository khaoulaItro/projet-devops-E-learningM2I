import React, { useState } from 'react';
import './ForgotPassword.css'; 
import im from './forgotimg.png';
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const ForgotPassword = () => {

    let navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handlreset = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        navigate("/Reset");
    };

    return (
        <>

            {/* Barre de navigation fixée en haut */}
            <div className="navbar" style={{
                backgroundColor: 'white',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                height: '80px',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000
            }}>
                <div className="logo-home-container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    <img
                        src="/images/newlogo.png"
                        alt="Logo"
                        style={{
                            height: '150px',
                            objectFit: 'contain',
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1000
                        }}
                    />
                    <Link
                        to="/"
                        className="home-link"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'black',
                            marginLeft: '180px'  // Espace pour le logo
                        }}
                    >
                        <HomeIcon sx={{
                            marginRight: '5px',
                            color: 'rgba(128, 128, 128, 0.5)'
                        }} />
                        <span style={{
                            verticalAlign: 'middle',
                            marginTop: '2px'
                        }}>
                            Home
                        </span>
                    </Link>
                </div>
            </div>

        <div className="forgot-container">
           
            <div className="forgot-form">
                <h2>Vous avez oublié votre mot de passe ?</h2>

                <p>Veuillez entrer l’adresse e-mail que vous avez utilisée pour vous inscrire et vous recevrez un e-mail avec un lien pour réinitialiser votre mot de passe !</p>
                <form onSubmit={handlreset}>
                    <div className="input-group">

                        <input type="email" id="email" placeholder="Entrez votre adresse e-mail" required
                             />

                        <FaEnvelope className='icon' />
                    </div>
   
                    <button className=" btn-block reset-btn"><span>Réinitialiser le mot de passe</span></button>
                      
                            <Link className="retour" to="/Login"> Se reconnecter </Link>
                        
                </form>
            </div>
            <div className="login-image">
                <img src={im} alt="Login Illustration" />
            </div>
        </div></>
    );
};

export default ForgotPassword;
