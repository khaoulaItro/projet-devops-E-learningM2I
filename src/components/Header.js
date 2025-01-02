import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Snackbar, Alert, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

const Header = ({ showSemester }) => {
    const [openContactForm, setOpenContactForm] = useState(false);
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [anchorElOpportunite, setAnchorElOpportunite] = useState(null);

    const navigate = useNavigate();

    const handleOpenContactForm = () => setOpenContactForm(true);
    const handleCloseContactForm = () => setOpenContactForm(false);

    const handleContactFormChange = (e) => {
        const { name, value } = e.target;
        setContactForm({ ...contactForm, [name]: value });
    };

    const handleContactFormSubmit = (e) => {
    e.preventDefault();

    emailjs.send('service_jgawclq', 'template_gedzw5f', {
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message
    }, 'vZ4IfQNuT4CfYqiuB')
        .then((response) => {
            console.log('Email sent successfully to admin', response.status, response.text);

            // Envoi du second template
            return emailjs.send('service_jgawclq', 'template_gxh492d', {
                name: contactForm.name,
                email: contactForm.email,
                message: contactForm.message
            }, 'vZ4IfQNuT4CfYqiuB');
        })
        .then((response) => {
            console.log('Second email (template_gxh492d) sent successfully', response.status, response.text);
            setSnackbarMessage('Votre message a été envoyé avec succès. Merci!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            handleCloseContactForm();
        })
        .catch((error) => {
            console.error('Failed to send email:', error);
            setSnackbarMessage('Une erreur est survenue. Veuillez réessayer.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        });
};


    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleOpportuniteOpen = (event) => setAnchorElOpportunite(event.currentTarget);
    const handleOpportuniteClose = () => setAnchorElOpportunite(null);

    return (
        <>
            <AppBar position="fixed" sx={{
                backgroundColor: 'white',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                height: '80px'
            }}>
                <Toolbar sx={{ height: '100%' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '20px',
                            marginRight: '50px',
                            width: '200px',
                            position: 'relative'
                        }}
                    >
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
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexGrow: 1,
                        gap: '30px'
                    }}>
                        <Button
                            sx={{ color: 'black' }}
                            onClick={() => navigate('/')}
                        >
                            <HomeIcon sx={{ marginRight: '5px', color: 'rgba(128, 128, 128, 0.5)' }} />
                            Home
                        </Button>

                        <Button
                            sx={{ color: 'black' }}
                            onClick={() => navigate('/ProgramPage')}
                        >
                            <MenuBookIcon sx={{ marginRight: '5px', color: 'rgba(128, 128, 128, 0.5)' }} />
                            Programme
                        </Button>

                        <div>
                            <Button
                                sx={{ color: 'black' }}
                                onClick={handleOpportuniteOpen}
                            >
                                <BusinessCenterIcon sx={{ marginRight: '5px', color: 'rgba(128, 128, 128, 0.5)' }} />
                                Opportunités de Carrière
                            </Button>
                            <Menu
                                anchorEl={anchorElOpportunite}
                                open={Boolean(anchorElOpportunite)}
                                onClose={handleOpportuniteClose}
                            >
                                <MenuItem onClick={() => window.open('https://www.linkedin.com', '_blank')}>
                                    LinkedIn
                                </MenuItem>
                                <MenuItem onClick={() => window.open('https://www.indeed.com', '_blank')}>
                                    Indeed
                                </MenuItem>
                                <MenuItem onClick={() => window.open('https://myjobalert.ma/', '_blank')}>
                                    MyJobAlert
                                </MenuItem>
                            </Menu>
                        </div>

                        <Button
                            sx={{ color: 'black' }}
                            onClick={handleOpenContactForm}
                        >
                            <MailOutlineIcon sx={{ marginRight: '5px', color: 'rgba(128, 128, 128, 0.5)' }} />
                            Contactez-nous
                        </Button>
                    </Box>

                    <Link to="/Login" style={{ marginLeft: '20px' }}>
                        <Button
                            sx={{
                                backgroundColor: '#008fbf',
                                color: 'white',
                                borderRadius: '20px',
                                width: '120px',
                                height: '40px',
                                marginRight: '20px',
                                '&:hover': {
                                    backgroundColor: '#00c9f2',
                                },
                            }}
                        >
                            Login
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>

            <Dialog open={openContactForm} onClose={handleCloseContactForm}>
                <DialogTitle>Contactez-nous</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nom"
                        name="name"
                        type="text"
                        fullWidth
                        value={contactForm.name}
                        onChange={handleContactFormChange}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={contactForm.email}
                        onChange={handleContactFormChange}
                    />
                    <TextField
                        margin="dense"
                        label="Message"
                        name="message"
                        type="text"
                        multiline
                        rows={4}
                        fullWidth
                        value={contactForm.message}
                        onChange={handleContactFormChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseContactForm} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleContactFormSubmit} color="primary">
                        Envoyer
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Header;
