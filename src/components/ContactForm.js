import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import emailjs from 'emailjs-com';

const ContactForm = ({ onClose }) => {
    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        plant: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.surname || !form.email || !form.plant) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        try {
            await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_USER_ID');
            setSuccessMessage('Form submitted successfully!');
            onClose(); // Close the form after submission
        } catch (err) {
            setErrorMessage('Failed to submit the form. Please try again later.');
        }
    };

    return (
        <Box sx={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            <Typography variant="h6">Contactez-nous</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Nom" name="name" onChange={handleChange} required fullWidth margin="normal" />
                <TextField label="Prénom" name="surname" onChange={handleChange} required fullWidth margin="normal" />
                <TextField label="Email" name="email" onChange={handleChange} required fullWidth margin="normal" type="email" />
                <TextField label="Plante" name="plant" onChange={handleChange} required fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>Envoyer</Button>
            </form>
            {successMessage && <Typography color="green" sx={{ mt: 2 }}>{successMessage}</Typography>}
            {errorMessage && <Typography color="red" sx={{ mt: 2 }}>{errorMessage}</Typography>}
        </Box>
    );
};

export default ContactForm;
