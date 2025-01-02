import React, { useState } from 'react';
import './ForgotPassword.css'; 
import im from './forgotimg.png';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Reset = () => {

    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleReset = (e) => {
        e.preventDefault(); 
        setMessage("");

        // Validation pour vérifier si les mots de passe correspondent
        if (password !== newpassword) {
            setMessage("Les mots de passe ne correspondent pas ! Veuillez réessayer.");
            return; // Empêche la soumission si les mots de passe ne correspondent pas
        }

        // Si la réinitialisation réussit
        setIsSubmitted(true); // Mettre à jour l'état pour indiquer que le formulaire a été soumis
        setMessage(
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Mot de passe réinitialisé avec succès !</h1>
                <br /><p style={{ fontSize:'20px' }} >Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
                <a style={{ fontSize: '18px' }}  href="/Login">Retour à la connexion</a>
            </div>
        );
    };

    return (
        <>


            {/* Barre de navigation fixée en haut */}
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
                </div>
            </div>
        <div className="forgot-container">

            <div className="forgot-form">
                
                {!isSubmitted ? ( // Conditionner l'affichage du formulaire
                    <>
                        <h2>Réinitialisation du mot de passe</h2>
                        <p>Veuillez créer un nouveau mot de passe que vous n’utilisez sur aucun autre site !</p>
                <form onSubmit={handleReset}>
                    <div className="input-group">

                                <input type="password" id="password" minLength={8} placeholder="Entrez votre nouveau mot de passe"
                                    required value={password}  onChange={(e) => setPassword(e.target.value)} 
                        />
                        <FaLock className='icon' />
                    </div>

                    <div className="input-group">
                                <input type="password" id="newpassword" minLength={8} placeholder="Confirmer votre nouveau mot de passe"
                                    required value={newpassword}  onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <FaLock className='icon' />
                    </div>
                           
                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                    <button className=" btn-block reset-btn"><span>Modifier le mot de passe</span></button>

                        </form>
                    </>
                ) : (
                    // Afficher le message après la soumission
                    <div className="form-group">
                        <div className="alert alert-success" role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </div>
            <div className="login-image">
                <img src={im} alt="Login Illustration" />
            </div>
            </div></>
    );
};

export default Reset;
