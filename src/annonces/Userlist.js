import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Userlist() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // État pour la recherche

  // Fonction pour récupérer les annonces depuis l'API
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      //modifier par nabil 8082
      const response = await axios.get("http://localhost:8082/Annonce"); // URL du backend
      setUserList(response.data); // Stocke les données renvoyées par l'API
      setLoading(false); // Arrête l'affichage du loader
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  };

  // Fonction pour supprimer une annonce
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:8082/Annonce/delete/${id}`); // Supprime l'annonce
        getUsers(); // Rafraîchit la liste des annonces
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce :", error);
    }
  };

  // Filtrer les annonces en fonction de la recherche
  const filteredUsers = userList.filter(user =>
    user.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Les Annonces</h1>
        <Link to="/portal/create-user" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Ajouter une annonce
        </Link>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Liste des annonces</h6>
        </div>
        <div className="card-body">
          {/* Barre de recherche */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher par titre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {isLoading ? (
            <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt="Chargement..." />
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Publication Date</th>
                    <th>Publication Time</th>
                    <th>Type</th>
                    
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Publication Date</th>
                    <th>Publication Time</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {filteredUsers.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.date}</td>
                      <td>{item.heure}</td>
                      <td>{item.type}</td>
                      <td>
                        <Link to={`/portal/user-edit/${item.id}`} className='btn btn-info btn-sm mr-1'>Modifier</Link>
                        <button onClick={() => handleDelete(item.id)} className='btn btn-danger btn-sm mr-1'>Supprimer</button>
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

export default Userlist;
