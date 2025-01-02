import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';  // Assurez-vous que le chemin est correct

const ProgramPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');  // Redirige vers la page d'accueil ("/")
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            {/* Section Header (Logo, titre et Icone Home) */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: '#f5f5f5',
                    position: 'relative',  // Ajouté pour le positionnement absolu du logo
                    height: '80px'  // Hauteur fixe pour maintenir la cohérence
                }}
            >
                {/* Logo avec titre à gauche */}
                <Typography
                    variant="h6"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '20px',
                        position: 'relative',
                        width: '400px'  // Espace réservé pour le logo et le texte
                    }}
                >
                    <img
                        src="/images/newlogo.png"
                        alt="Logo"
                        style={{
                            height: '150px',
                            objectFit: 'contain',
                            position: 'absolute',
                            left: '0',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1000
                        }}
                    />
                    <span style={{ marginLeft: '170px' }}>Programme de M2I</span>
                </Typography>

                {/* Icone Home alignée à droite */}
                <IconButton
                    onClick={handleGoHome}
                    sx={{
                        marginLeft: 'auto',
                        marginRight: '20px'
                    }}
                >
                    <HomeIcon sx={{ color: 'rgba(128, 128, 128, 0.5)' }} />
                </IconButton>
            </Box>

            {/* Contenu principal de la page */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexGrow: 1,
                    padding: '20px',
                }}
            >
                {/* Image de la page */}
                <img src="/images/Test_M2I.png" alt="Programme M2I" style={{ maxWidth: '100%' }} />
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default ProgramPage;