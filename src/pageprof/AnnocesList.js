import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Searchbar from './Searchbar';

function AnnoncesList() {
    const [userList, setUserList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { searchComponent, filteredData } = Searchbar({ initialData: userList });

    // Fonction pour récupérer les annonces depuis l'API
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8082/Annonce"); // URL du backend
            setUserList(response.data); // Stocke les données renvoyées par l'API
            setLoading(false); // Arrête l'affichage du loader
        } catch (error) {
            console.error("Erreur lors de la récupération des annonces :", error);
        }
    };

    // Fonction pour supprimer une annonce
    let handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Êtes-vous sûre de vouloir supprimer cette annonce ?");
            if (confirmDelete) {
                const confirm = window.confirm("Veuillez confirmer la suppression !");
                if (confirm) {
                    await axios.delete(`http://localhost:8082/Annonce/delete/${id}`);
                    getUsers();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800"> </h1>
                <div className="d-flex align-items-center gap-2">
                    {!isLoading && searchComponent}
                    <Link to="/portalprof/create-annonce" className="btn btn-sm btn-primary shadow-sm" style={{
                        marginLeft: '10px', height: '38px',
                        lineHeight: '24px',
                        display: 'inline-flex',
                        alignItems: 'center'
                    }} >
                        <FontAwesomeIcon icon={faPlus} className="creatinguser mr-2" />
                    Créer une annonce
                    </Link>
                </div>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary" style={{ fontSize: '20px' }}>Liste des annonces</h6>
                </div>
                <div className="card-body">
                    {isLoading ? (
                        <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt="Chargement..." />
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>IdAnnonce</th>
                                        <th>Titre</th>
                                        <th>Description</th>
                                        <th>Date de publication</th>
                                        <th>Heure de publication</th>
                                        <th>Type</th>
                                        <th>Id professeur</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {filteredData.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>{item.date}</td>
                                            <td>{item.heure}</td>
                                            <td>{item.type}</td>
                                            <td>{item.auteurId}</td>
                                            <td>
                                                <Link to={`/portalprof/annonce-edit/${item.id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                                                <button onClick={() => handleDelete(item.id)} className='btn btn-danger btn-sm mr-1'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AnnoncesList;