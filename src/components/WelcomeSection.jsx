import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import AnimatedCircle from './AnimatedCircle'; // Importez le composant AnimatedCircle
import './AnimatedCircle.module.css'; // Assurez-vous d'importer votre fichier CSS

const WelcomeSection = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2rem',
                position: 'relative', // Nécessaire pour positionner les cercles
                backgroundColor: theme.palette.background.default,
            }}
        >
            {/* Texte à gauche avec animation */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    position: 'relative',
                    backgroundColor: 'transparent', // Fond transparent
                    zIndex: 1, // Pour que le texte soit au-dessus des cercles
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        color: '#008fbf',
                        textAlign: 'center',
                        marginTop: '1rem',
                        letterSpacing: '0.05em',
                        backgroundColor: 'transparent', // Fond du texte transparent
                    }}
                >
                    Bienvenue sur <br />
                    eLearning.M2I
                </Typography>

                {/* Cercles animés à gauche et à droite */}
                <AnimatedCircle size="50px" top="50px" left="100px" className="circle5" />
                <AnimatedCircle size="60px" top="150px" left="200px" className="circle2" />
                <AnimatedCircle size="70px" top="250px" right="300px" className="circle3" /> {/* Cercle à droite */}
                <AnimatedCircle size="70px" top="350px" right="100px" className="circle1" /> {/* Cercle à droite */}
                {/* <AnimatedCircle size="30px" top="20px" left="100px" className="circle4" /> */}
                <AnimatedCircle size="70px" top="250px" left="50px" className="circle5" />
                <AnimatedCircle size="40px" top="150px" right="30px" className="circle1" /> {/* Cercle à droite */}
                <AnimatedCircle size="40px" top="300px" left="30px" className="circle3" />
            </Box>

            {/* Image à droite */}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                    src="https://th.bing.com/th/id/R.45cb873c207c94736b6351b336773ee4?rik=NDPGYRGANCQo1w&riu=http%3a%2f%2fdgoae.unam.mx%2fCOE%2fassets%2fimg%2fwhy-us.png&ehk=laya8hZFRpUb8DLK0rVE3VPcMW7u2ce%2f74%2bvKURdJe4%3d&risl=&pid=ImgRaw&r=0"
                    alt="Étudiants M2I"
                    style={{ width: '700px', maxWidth: '1000px', height: 'auto', borderRadius: '10px' }}
                />
            </Box>
        </Box>
    );
};

export default WelcomeSection;
