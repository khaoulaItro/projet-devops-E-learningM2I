import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function List() {
  const [profList, setProfList] = useState([]); // Liste des professeurs
  const [filteredProfList, setFilteredProfList] = useState([]); // Liste filtrée des professeurs
  const [isLoading, setLoading] = useState(true); // Indicateur de chargement
  const [searchTerm, setSearchTerm] = useState(""); // Terme de recherche

  useEffect(() => {
    getProfesseurs();
  }, []);

  useEffect(() => {
    filterProfesseurs();
  }, [searchTerm, profList]);

  // Récupération de la liste des professeurs via l'API
  const getProfesseurs = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/professeurs"); // Endpoint API back-end
      setProfList(response.data); // Mise à jour de la liste des professeurs
      setLoading(false); // Fin du chargement
    } catch (error) {
      console.error("Erreur lors de la récupération des professeurs :", error);
    }
  };

  // Filtrage des professeurs par nom, prénom ou admin
  const filterProfesseurs = () => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = profList.filter((prof) => {
      const nom = prof.nom ? prof.nom.toLowerCase() : "";
      const prenom = prof.prenom ? prof.prenom.toLowerCase() : "";
      const isAdmin = prof.isadmin ? "oui" : "non";
  
      return (
        nom.includes(lowerSearchTerm) ||
        prenom.includes(lowerSearchTerm) ||
        isAdmin.includes(lowerSearchTerm)
      );
    });
    setFilteredProfList(filtered);
  };
  

  // Suppression d'un professeur
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce professeur ?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:8082/api/professeurs/${id}`); // Endpoint pour supprimer un professeur
        getProfesseurs(); // Mise à jour de la liste après suppression
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Liste des professeurs</h1>
        <Link to="/portal/create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Ajouter un professeur
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Professeurs</h6>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Rechercher par nom, prénom ou admin (Oui/Non)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="card-body">
          {isLoading ? (
            <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" alt="Loading" />
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Modules</th>
                    <th>Admin</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Modules</th>
                    <th>Admin</th>
                    <th>Actions</th>
                  </tr>
                </tfoot>
                <tbody>
                  {filteredProfList.map((prof) => (
                    <tr key={prof.id}>
                      <td>{prof.id}</td>
                      <td>{prof.nom}</td>
                      <td>{prof.prenom}</td>
                      <td>{prof.email}</td>
                      <td>
                        {prof.modules && prof.modules.length > 0 ? prof.modules.join(", ") : "Aucun module"}
                      </td>
                      <td>{prof.isadmin ? "Oui" : "Non"}</td>
                      <td>
                        <Link to={`/portal/edit/${prof.id}`} className="btn btn-info btn-sm mr-1">
                          Modifier
                        </Link>
                        <button onClick={() => handleDelete(prof.id)} className="btn btn-danger btn-sm">
                          Supprimer
                        </button>
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

export default List;
