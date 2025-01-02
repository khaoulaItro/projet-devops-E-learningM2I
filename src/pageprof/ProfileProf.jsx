import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topbarprof from './Topbarprof';

function ProfileProf() {
    const [prof, setProf] = useState({
        imageURL: '',
        nom: '',
        prenom: '',
        cin: '',
        email: '',
        modules: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const profId = "6740d3274256891eb2527b5b";

        axios.get(`http://localhost:8082/professeur/get/${profId}`)
      .then(response => {
            console.log('Données reçues:', response.data);
            setProf(response.data);
            setLoading(false);
        })
                .catch(err => {
                    console.error(`Erreur complète:`, err.response?.data || err);
                    console.error(`Status:`, err.response?.status);
                    console.error(`Message:`, err.message);
                    setError(`Erreur serveur: ${ err.response?.data?.message || err.message }`);
                    setLoading(false);
                });
    }, []);
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt="Loading" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-4" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div id="wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
            {/* <Sidebarprof /> */}
            <div id="content-wrapper" className="d-flex flex-column flex-grow-1">
                <Topbarprof />
                <div className="container-fluid p-4">
                    <div
                        className="card border-0 shadow"
                        style={{
                            maxWidth: '800px',
                            margin: '2rem auto',
                            borderRadius: '15px',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)'
                        }}
                    >
                        <div className="card-body p-5">
                            <div className="row align-items-center">
                                <div className="col-md-4 text-center">
                                    <div className="position-relative">
                                        <img
                                            src={prof.imageURL || 'https://via.placeholder.com/150'}
                                            alt="Profile"
                                            className="rounded-circle img-thumbnail"
                                            style={{
                                                width: '200px',
                                                height: '200px',
                                                objectFit: 'cover',
                                                border: '5px solid rgba(97, 165, 194, 0.6)'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8 mt-4 mt-md-0">
                                    <h2 className="display-4 mb-4" style={{ color: 'rgba(97, 165, 194, 0.9)' }}>
                                        {prof.prenom} {prof.nom}
                                    </h2>
                                    <div
                                        className="info-group mb-3 p-3"
                                        style={{ backgroundColor: 'rgba(97, 165, 194, 0.1)', borderRadius: '10px' }}
                                    >
                                        <p className="mb-2">
                                            <span className="fw-bold" style={{ color: 'rgba(97, 165, 194, 0.8)' }}>
                                                CIN:
                                            </span>
                                            <span className="ms-2">{prof.cin}</span>
                                        </p>
                                        <p className="mb-2">
                                            <span className="fw-bold" style={{ color: 'rgba(97, 165, 194, 0.8)' }}>
                                                Email:
                                            </span>
                                            <span className="ms-2">{prof.email}</span>
                                        </p>
                                        <p className="mb-0">
                                            <span className="fw-bold" style={{ color: 'rgba(97, 165, 194, 0.8)' }}>
                                                Modules:
                                            </span>
                                            <span className="ms-2">
                                                {prof.modules ? prof.modules.join(', ') : 'Aucun module assigné'}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileProf;