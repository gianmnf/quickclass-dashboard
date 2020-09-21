import React, {useEffect} from 'react';
import './index.css';
import app from '../../firebase';
import {Link} from "react-router-dom";

const Navbar = (props) => {

    useEffect(()=>{
        function getCurrentUrl() {
            console.log(props);
        }

        getCurrentUrl()
    },[props]);
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <a className="navbar-brand text-white" href="/"><i className="fa fa-graduation-cap fa-lg mr-2"></i>QuickClass Dashboard</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nvbCollapse" aria-controls="nvbCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="nvbCollapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item pl-1">
                                    <a className="nav-link" href="/cursos"><i className="fa fa-book fa-fw mr-1"></i>Cursos</a>
                                </li>
                                <li className="nav-item pl-1">
                                    <a className="nav-link" href="/professores"><i className="fa fa-user fa-fw mr-1"></i>Professores</a>
                                </li>
                                <li className="nav-item pl-1">
                                    <a className="nav-link" href="/alunos"><i className="fa fa-user-graduate fa-fw mr-1"></i>Alunos</a>
                                </li>
                                <li className="nav-item pl-1">
                                    <a className="nav-link" href="/turmas"><i className="fa fa-users fa-fw mr-1"></i>Turmas</a>
                                </li>
                                <li className="nav-item pl-1">
                                    <button className="btn nav-link" onClick={() => app.auth().signOut()}><i className="fa fa-sign-out-alt fa-fw mr-1"></i>Sair</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
	    </header>
    </>
    )
}

export default Navbar;
