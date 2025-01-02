import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const MotivationBox = ({ onOpenForm }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end', // Alignement en bas à droite
        justifyContent: 'space-between',
        padding: '100px', // Réduire le padding
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '0px',
        borderLeft: '5px solid transparent',
        position: 'relative',
        height: '350px', // Réduire la hauteur
        width: '950px', // Réduire la largeur
        margin: '10px 0 0 10px', // Espace devant l'élément précédent
        zIndex: 1,
        borderTopLeftRadius: '600px',
        borderBottomLeftRadius: '600px',
        backgroundImage: `
          linear-gradient(rgba(64, 155, 212, 0.5), rgba(64, 155, 212, 0.5)),
          url('https://th.bing.com/th/id/R.f278011f51f3d23dec18c2a1ca1bc551?rik=XrMu1WefGZnF2Q&pid=ImgRaw&r=0')
              `,
        backgroundColor: '#e0f7fa',
        backgroundSize: 'cover',
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* <Typography
        sx={{
          color: 'white',
          fontSize: '1rem', // Réduire la taille de la police
          marginRight: '20px',
          flexGrow: 1,
          lineHeight: 1.5,
          textAlign: 'justify',
          fontWeight: 'bold',
          maxWidth: '70%',
        }}
      >
        Vos plaintes ne sont pas juste des déclarations, mais aussi des conseils et des remarques qui nous permettent de mieux vous servir ainsi que de nous améliorer. Si quelque chose ne vous satisfait pas, n'hésitez pas à déposer une plainte. Nous sommes là pour écouter et améliorer notre service pour vous et pour nous.
      </Typography> */}
      {/* <Button variant="contained" color="primary" onClick={onOpenForm}>
        Ajouter une Plainte
      </Button> */}
    </Box>
  );
};

// Composant principal de la page
const Page = () => {
  const handleOpenForm = () => {
    // Logique pour ouvrir le formulaire
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end', // Aligner tout le contenu à droite
        padding: '20px', // Ajouter un peu de padding autour
      }}
    >
      <MotivationBox onOpenForm={handleOpenForm} />
    </Box>
  );
};

export default Page;
