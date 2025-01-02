import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBook,
  faGraduationCap,
  faChartBar,
  faPuzzlePiece,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Bouton de toggle */}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? '❮' : '❯'}
        </button>

        {/* Logo */}
        <div className="sidebar-logo">
          <img
            src="/images/newlogo.png" // Assurez-vous que le chemin est correct
            alt="Logo"
          />
        </div>

        {/* Menu de navigation */}
        <ul className="sidebar-menu">
          <li>
            <Link to="/etudiants">
              <FontAwesomeIcon icon={faHome} className="menu-icon" />
              <span className="menu-text fancy-text">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/semestre-1">
              <FontAwesomeIcon icon={faBook} className="menu-icon" />
              <span className="menu-text fancy-text">Semestre 1</span>
            </Link>
          </li>
          <li>
            <Link to="/semestre-2">
              <FontAwesomeIcon icon={faGraduationCap} className="menu-icon" />
              <span className="menu-text fancy-text">Semestre 2</span>
            </Link>
          </li>
          <li>
            <Link to="/semestre-3">
              <FontAwesomeIcon icon={faChartBar} className="menu-icon" />
              <span className="menu-text fancy-text">Semestre 3</span>
            </Link>
          </li>
          <li>
            <Link to="/semestre-4">
              <FontAwesomeIcon icon={faPuzzlePiece} className="menu-icon" />
              <span className="menu-text fancy-text">Semestre 4</span>
            </Link>
          </li>
          <li>
            <Link to="/quiz">
              <FontAwesomeIcon icon={faClipboardList} className="menu-icon" />
              <span className="menu-text fancy-text">Quiz</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Contenu principal */}
      <div className={`main-content ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Le contenu des routes sera ici */}
      </div>
    </div>
  );
}

export default Sidebar;
