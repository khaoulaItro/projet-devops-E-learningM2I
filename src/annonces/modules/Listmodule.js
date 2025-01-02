import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Listmodule() {
  const [modules, setModules] = useState([]); // Liste complète des modules
  const [filteredModules, setFilteredModules] = useState([]); // Liste filtrée des modules
  const [isLoading, setLoading] = useState(true); // Indicateur de chargement
  const [searchTerm, setSearchTerm] = useState(""); // Terme de recherche

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/modules");
      setModules(response.data);
      setFilteredModules(response.data); // Initialise la liste filtrée
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des modules :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce module ?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:8082/api/modules/${id}`);
        fetchModules(); // Recharge la liste après suppression
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // Filtrage des modules en fonction du terme de recherche
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = modules.filter((module) =>
      module.nom.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredModules(filtered);
  };

  return (
    <div className="container">
      <h3>Liste des Modules</h3>
      <Link to="/portal/createmodule" className="btn btn-primary mb-3">
        Ajouter un Module
      </Link>
      {/* Barre de recherche */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par Nom"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredModules.map((module) => (
              <tr key={module.id}>
                <td>{module.id}</td>
                <td>{module.nom}</td>
                <td>{module.description}</td>
                <td>
                  <Link to={`/portal/editmodule/${module.id}`} className="btn btn-info btn-sm mr-2">
                    Modifier
                  </Link>
                  <button onClick={() => handleDelete(module.id)} className="btn btn-danger btn-sm">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Listmodule;
