import React from 'react';
import './index.css';
import app from '../../firebase';

const Navbar = () => {
    function getCurrentUrl() {
        console.log(window.location.href);
    }
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <a className="navbar-brand text-white" href="#"><i className="fa fa-graduation-cap fa-lg mr-2"></i>QuickClass Dashboard</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nvbCollapse" aria-controls="nvbCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="nvbCollapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item pl-1">
                                    <a className="nav-link" href="/cursos"><i className="fa fa-home fa-fw mr-1"></i>Cursos</a>
                                </li>
                                <li className="nav-item active pl-1">
                                    <a className="nav-link" href="/professores"><i className="fa fa-th-list fa-fw mr-1"></i>Professores</a>
                                </li>
                                <li className="nav-item pl-1">
                                    <a className="nav-link" href="/turmas"><i className="fa fa-info-circle fa-fw mr-1"></i>Turmas</a>
                                </li>
                                <li className="nav-item pl-1">
                                    <button className="btn btn-link" onClick={() => app.auth().signOut()}><i className="fa fa-sign-in fa-fw mr-1"></i>Sair</button>
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
