import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
// Páginas Principais
import Professores from './components/Professor/Professores';
import Cursos from './components/Curso/Cursos';
import Turmas from './components/Turma/Turmas';
import Register from './components/Auth/Register/index';
import Login from './components/Auth/Login/index';
import Aluno from './components/Aluno/Alunos';
import { AuthProvider } from "./Auth";
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="col-md-8 offset-md-2">
          <PrivateRoute exact path="/" component={Professores} />
          <Route exact path="/cursos" component={Cursos} />
          <Route exact path="/turmas" component={Turmas} />
          <Route exact path="/alunos" component={Aluno} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
