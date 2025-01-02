import { faCircleUser, faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { FaBook, FaChalkboard, FaBullhorn, FaRegFileAlt } from 'react-icons/fa';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

function Topbarprof() {
    return (

        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <FontAwesomeIcon icon={faBars} />
            </button>

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/HomeProf">
                <img src="/images/newlogo.png" alt="Logo" style={{ height: '150px' }} />
            </a>

            {/* <!-- Topbar Search -->
            <form
                className="form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
                <div className="input-group" style={{ width: 'auto' }}>
                    <input
                        type="text"
                        className="form-control bg-light border-0 small"
                        placeholder="Rechercher..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            </form> */}

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">

                {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <Link className="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FontAwesomeIcon icon={faSearch} />
                    </Link>
                    {/* <!-- Dropdown - Messages --> */}
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                    placeholder="Search for..." aria-label="Search"
                                    aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>
                <li className="nav-item dropdown no-arrow">
                    <Link className="nav-link dropdown-toggle" to="/portalprof/annonces-list">
                        <FaBullhorn style={{ marginRight: "0.5rem" }} color='rgba(97, 165, 194, 0.6)' />
                        <span style={{ color: 'black' }}>Gérer Annonces</span>
                    </Link>
                </li>
                <li className="nav-item dropdown no-arrow">
                    <Link className="nav-link dropdown-toggle" to="#" id="userDropdown2" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FontAwesomeIcon icon={faFileAlt} size="1x" color='rgba(97, 165, 194, 0.6)' />
                        <span style={{ color: 'black' }}>Gérer Support</span>
                    </Link>
                    {/* <!-- Dropdown - User Information --> */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="/portalprof/cours-list">
                            <FaBook style={{ marginRight: "0.5rem" }} color='rgba(97, 165, 194, 0.6)' />
                            <span>Gérer Cours</span>
                        </a>

                        <a className="dropdown-item" href="/portalprof/td-list">
                            <FaRegFileAlt style={{ marginRight: "0.5rem" }} color='rgba(97, 165, 194, 0.6)' />
                            <span>Gérer TDs</span>
                        </a>
                        <a className="dropdown-item" href="/portalprof/tp-list">
                            <FaChalkboard style={{ marginRight: "0.5rem" }} color='rgba(97, 165, 194, 0.6)' />
                            <span>Gérer TPs</span>
                        </a>
                    </div>
                </li>


                <div className="topbar-divider d-none d-sm-block"></div>

                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">
                    <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline  small" style={{
                            color: 'black',
                            fontSize: '15px',  // ou '1rem' pour augmenter la taille
                            fontWeight: '400'  // pour le rendre un peu plus visible
                        }}>
                            Profile
                        </span>
                        <FontAwesomeIcon icon={faCircleUser} size={"xl"} color='rgba(97, 165, 194, 0.6)' />
                    </Link>
                    {/* <!-- Dropdown - User Information --> */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="/ProfileProf">
                            <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-400" />
                            Voir profile
                        </a>

                        <a className="dropdown-item" href="/Login">
                            <CiLogout /><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Déconnexion
                        </a>

                    </div>
                </li>

            </ul>

        </nav>

    )
}

export default Topbarprof;