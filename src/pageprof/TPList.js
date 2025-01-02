import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Searchbar from './Searchbar';

function TPList() {
    const [userList, setUserList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { searchComponent, filteredData } = Searchbar({ initialData: userList });

    useEffect(() => {
        getTPs();
        console.log("welcome");
    }, []);

    let getTPs = async () => {
        try {
            const response = await axios.get("http://localhost:8082/api/supports/type/TP"); // Update endpoint if necessary
            setUserList(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    let handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Êtes-vous sûre de vouloir supprimer ce TP ?");
            if (confirmDelete) {
                const confirm = window.confirm("Veuillez confirmer la suppression !");
                if (confirm) {
                    await axios.delete(`http://localhost:8082/api/supports/deleteSupport/${id}`);
                    getTPs();
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
                    <Link to="/portalprof/create-tp" className="btn btn-sm btn-primary shadow-sm" style={{
                        marginLeft: '10px', height: '38px',
                        lineHeight: '24px',
                        display: 'inline-flex',
                        alignItems: 'center'
                    }} >
                    <FontAwesomeIcon icon={faPlus} className="creatinguser mr-2" />
                    Créer TP
                    </Link>
                </div>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary" style={{ fontSize: '20px' }}>Liste des TPs</h6>
                </div>
                <div className="card-body">
                    {isLoading ? (
                        <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt="Loading" />
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>IdTP</th>
                                        <th>ID de professeur</th>
                                        <th>Module</th>
                                        <th>Semestre</th>
                                        <th>Description</th>
                                        <th>CodeClassroom</th>
                                        <th>Fichier</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {filteredData.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.idProfesseur}</td>
                                            <td>{item.nomModule}</td>
                                            <td>{item.semester}</td>
                                            <td>{item.description}</td>
                                            <th>{item.codeClassroom}</th>
                                            <td>{item.fichierUrl ? JSON.stringify(item.fichierUrl) : 'Pas de fichier'}</td>
                                            <td>
                                                <Link to={`/portalprof/tp-edit/${item.id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
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

export default TPList;