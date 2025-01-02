import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar2";
import Topbar from "../etudiant/topBar";
import { Bar, Pie } from 'react-chartjs-2'; // Importer le graphique Bar et Pie
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'; // Importer Chart.js et ArcElement pour Pie Chart

import "./Dashboard.css";
import WelcomeImage from "../etd.png";

// Enregistrement des composants dans Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const [annonces, setAnnonces] = useState([]); // Pour stocker les annonces
  const [currentAnnonceIndex, setCurrentAnnonceIndex] = useState(0); // Indice de l'annonce actuelle
  const [stats, setStats] = useState({ cours: 0, tp: 0, td: 0 }); // Statistiques des supports

  // Fonction pour récupérer les annonces depuis l'API
  const fetchAnnonces = async () => {
    try {
      const response = await axios.get("http://localhost:8082/Annonce");
      console.log("Données récupérées :", response.data);
      setAnnonces(response.data); // Mise à jour des annonces
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  };

  // Fonction pour récupérer les supports et calculer les statistiques
  const fetchSupportStats = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/supports/getAllSupports");
      const supports = response.data;
      
      // Calculer le nombre de Cours, TP et TD
      const stats = supports.reduce(
        (acc, support) => {
          if (support.type === "COUR") acc.cours += 1;
          if (support.type === "TP") acc.tp += 1;
          if (support.type === "TD") acc.td += 1;
          return acc;
        },
        { cours: 0, tp: 0, td: 0 }
      );

      setStats(stats); // Mise à jour des statistiques
    } catch (error) {
      console.error("Erreur lors de la récupération des supports :", error);
    }
  };

  // Utilisation de useEffect pour récupérer les annonces et les statistiques au montage
  useEffect(() => {
    fetchAnnonces();
    fetchSupportStats(); // Appel pour récupérer les statistiques
  }, []);

  // Utilisation de setInterval pour changer l'annonce automatiquement toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnonceIndex((prevIndex) => {
        // Si c'est la dernière annonce, revenir à la première
        return (prevIndex + 1) % annonces.length;
      });
    }, 10000); // 10 secondes

    return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
  }, [annonces]);

  // Données du graphique en barres
  const barData = {
    labels: ['Cours', 'TP', 'TD'], // Labels pour les axes
    datasets: [
      {
        label: 'Nombre de Supports',
        data: [stats.cours, stats.tp, stats.td], // Données basées sur les statistiques
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(153, 102, 255, 0.2)'], // Couleurs des barres
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(153, 102, 255, 1)'], // Couleur des bordures
        borderWidth: 1, // Largeur des bordures
      },
    ],
  };

  // Données du graphique circulaire
  const pieData = {
    labels: ['Cours', 'TP', 'TD'],
    datasets: [
      {
        data: [stats.cours, stats.tp, stats.td],
        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(153, 102, 255, 1)'],
      },
    ],
  };

  // Options du graphique
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Statistiques des Supports',
      },
    },
  };

  return (
    <div className="container-fluid p-0">
      {/* Topbar */}
      <Topbar />

      <div className="row no-gutters">
        {/* Sidebar fixée */}
        <div
          className="col-md-2 col-12 position-fixed"
          style={{ height: "100vh", top: 0, left: 0, zIndex: 1000 }}
        >
          <Sidebar />
        </div>

        {/* Contenu principal */}
        <div className="col-md-10 offset-md-2 col-12 p-4">
          <div className="dashboard-container">
            {/* Carte de bienvenue */}
            <div className="welcome-card">
              <h2>Welcome back!</h2>
              <img src={WelcomeImage} alt="Welcome illustration" />
            </div>

            {/* Carte des annonces */}
            <div className="company-card">
              <div className="annonces-container">
                {annonces.length > 0 ? (
                  <>
                    <h5>{annonces[currentAnnonceIndex].title}</h5>
                    <p className="description">{annonces[currentAnnonceIndex].description}</p>
                    <p className="details">
                      <strong>Date :</strong> {annonces[currentAnnonceIndex].date}
                    </p>
                    <p className="details">
                      <i className="fas fa-clock"></i>
                      <strong> Heure :</strong> {annonces[currentAnnonceIndex].heure}
                    </p>
                  </>
                ) : (
                  <p>Aucune annonce disponible.</p>
                )}
              </div>
            </div>
          </div>

          {/* Section des statistiques avec graphiques */}
          <div className="stats-container mt-4 d-flex justify-content-between">
            <div className="stats-card" style={{ width: "48%" }}>
              <p>Cours</p>
              <h3>{stats.cours}</h3>
            </div>
            <div className="stats-card" style={{ width: "48%" }}>
              <p>TP</p>
              <h3>{stats.tp}</h3>
            </div>
            <div className="stats-card" style={{ width: "48%" }}>
              <p>TD</p>
              <h3>{stats.td}</h3>
            </div>
          </div>

          {/* Affichage des deux graphiques (Barres et Circulaire) */}
          <div className="stats-graph mt-4 d-flex justify-content-between">
            <div style={{ width: "48%" }}>
              <Bar data={barData} options={options} />
            </div>
            <div style={{ width: "48%" }}>
              <Pie data={pieData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
