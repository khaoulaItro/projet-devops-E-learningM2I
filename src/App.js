import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Reset from './Pages/Reset';
import ForgotPassword from './Pages/ForgotPassword';
import HomePage from './Pages/HomePage'; 
import ProgramPage from './Pages/ProgramPage';
import Userlist from './annonces/Userlist';
import Portal from './annonces/Portal';
import Portalprof from './pageprof/Portalprof';
import UserCreate from './annonces/UserCreate';
import UserView from './annonces/UserView';
import UserEdit from './annonces/UserEdit';
import Sidebar from './annonces/Sidebar';
import "./annonces/sb-admin-2.min.css";
import Dashboard from './annonces/Dashboard';
import List from "./annonces/User/List";
import Edit from "./annonces/User/Edit";
import Create from "./annonces/User/Create";
import Createstudent from "./annonces/Etudiants/Createstudent";
import Editstudent from "./annonces/Etudiants/Editstudent";
import Liststudent from "./annonces/Etudiants/Liststudent";
import Listmodule from "./annonces/modules/Listmodule";
import Editmodule from "./annonces/modules/Editmodule";
import Createmodule from "./annonces/modules/Createmodule";
import ProfileAdmin from "./annonces/ProfileAdmin";

import TPList from './pageprof/TPList';
import TPcreate from './pageprof/TPcreate';
import TPedit from './pageprof/TPedit';
import TDList from "./pageprof/TDList";
import TDcreate from "./pageprof/TDcreate";
import TDedit from "./pageprof/TDedit";
import CourCreate from "./pageprof/CourCreate";
import Editcour from "./pageprof/EditCour";
import Courslist from "./pageprof/CoursList";
import AnnoncesList from "./pageprof/AnnocesList";
import AnnonceCreate from "./pageprof/AnnonceCreate";
import Editannonce from "./pageprof/Editannonce";
import PageEtudiants from './etudiant/PageEtudiants';
import Semestre1 from './etudiant/Semestre1';
import Semestre2 from './etudiant/Semestre2';
import Semestre4 from './etudiant/Semestre4';
import Semestre3 from './etudiant/Semestre3';
import Quiz from './etudiant/Quiz';
import HomeProf from './pageprof/HomeProf';
import ProfileProf from './pageprof/ProfileProf';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ProgramPage" element={<ProgramPage />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/Reset" element={<Reset />} />
                <Route path='/sidebar' element={<Sidebar />} />
                <Route path="/HomeProf" element={<HomeProf />} />
                <Route path="/ProfileProf" element={<ProfileProf />} />
                <Route path="/portal" element={<Portal />}>
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='user-list' element={<Userlist />} />
                    <Route path='list' element={<List />} />
                    <Route path='createstudent' element={<Createstudent />} />
                    <Route path='editstudent' element={<Editstudent />} />
                    <Route path='liststudent' element={<Liststudent />} />
                    <Route path='createmodule' element={<Createmodule />} />
                    <Route path='editmodule' element={<Editmodule />} />
                    <Route path='listmodule' element={<Listmodule />} />
                    <Route path='ProfileAdmin' element={<ProfileAdmin />} />
                    <Route path='create' element={<Create />} />
                    <Route path='edit/:id' element={<Edit />} />
                    <Route path='create-user' element={<UserCreate />} />
                    <Route path='user-view/:id' element={<UserView />} />
                    <Route path='user-edit/:id' element={<UserEdit />} />
                    <Route path='editmodule/:id' element={<Editmodule />} />
                    <Route path='student-edit/:id' element={<Editstudent />} />
                </Route>
                <Route path="/portalprof" element={<Portalprof />}>
                    <Route path='dashboard' element={<Dashboard />} />

                    <Route path='annonces-list' element={<AnnoncesList />} />
                    <Route path='create-annonce' element={<AnnonceCreate />} />
                    <Route path='annonce-edit/:id' element={<Editannonce />} />
                    <Route path='tp-list' element={<TPList />} />
                    <Route path='create-tp' element={<TPcreate />} />
                    <Route path='tp-edit/:id' element={<TPedit />} />
                    <Route path='td-list' element={<TDList />} />
                    <Route path='create-td' element={<TDcreate />} />
                    <Route path='td-edit/:id' element={<TDedit />} />
                    <Route path='cours-list' element={<Courslist />} />
                    <Route path='create-cour' element={<CourCreate />} />
                    <Route path='cour-edit/:id' element={<Editcour />} />
                </Route>
                <Route path="/ProfileProf" element={<ProfileProf />} />
                <Route path="/etudiants" element={<PageEtudiants />} />
                <Route path="/semestre-1" element={<Semestre1 />} />
                <Route path="/semestre-2" element={<Semestre2 />} />
                <Route path="/semestre-3" element={<Semestre3 />} />
                <Route path="/semestre-4" element={<Semestre4 />} />
                <Route path="/Quiz" element={<Quiz />} />
            </Routes>
        </div>
    );
}

export default App;
