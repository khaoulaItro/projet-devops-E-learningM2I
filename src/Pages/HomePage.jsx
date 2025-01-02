import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomeSection from '../components/WelcomeSection';
import MotivationBox from '../components/MotivationBox';
import ValuesCard from '../components/ValuesCard';
import ChatBot from '../components/ChatBot';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [visibleSemester, setVisibleSemester] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const showSemester = (semester) => {
    setVisibleSemester(semester);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
      }}
    >
      <Header showSemester={showSemester} sx={{ position: 'fixed', top: 0, left: 0, right: 0 }} />
      
      <Box sx={{ flexGrow: 1, paddingTop: '80px' }}> {/* Ajustez le padding-top selon la hauteur de votre header */}
        <WelcomeSection />
        <br></br>
        <br></br>
        <br></br><br></br>
        <br></br>
        <br></br>

        <MotivationBox />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <ValuesCard />
<br></br>
<br></br>
<br></br>
<br></br>

        {visibleSemester && (
          <Box sx={{ padding: '20px', textAlign: 'center' }}>
            <img src={`/images/Test_M2I.png`} alt={`Programme ${visibleSemester}`} style={{ maxWidth: '100%' }} />
          </Box>
        )}
      </Box>
      
      <Footer />

      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: 'rgba(64, 155, 212, 0.5)',
          borderRadius: '50%',
          padding: 1,
        }}
      >
        <IconButton
          onClick={handleOpen}
          sx={{ color: '#fff', '&:hover': { backgroundColor: 'rgba(64, 155, 212, 0.7)' } }}
        >
          <ChatIcon sx={{ fontSize: 50 }} />
        </IconButton>
      </Box>

      {/* Modal de chat */}
      <Modal open={open} onClose={handleClose} style={{ backgroundColor: 'transparent' }}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            boxShadow: 24,
          }}
        >
          <ChatBot />
        </Box>
      </Modal>
    </Box>
  );
};

export default HomePage;
