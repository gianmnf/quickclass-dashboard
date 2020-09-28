import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
// Páginas Principais
import Professores from './components/Professor/Professores';
import Cursos from './components/Curso/Cursos';
import Turmas from './components/Turma/Turmas';
import Aluno from './components/Aluno/Alunos';
import Disciplinas from './components/Disciplina/Disciplinas';
import Register from './components/Auth/Register/index';
import Login from './components/Auth/Login/index';
import { AuthProvider } from "./Auth";
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="col-md-8 offset-md-2">
          <PrivateRoute exact path="/"><Redirect to="/cursos" /></PrivateRoute>
          <PrivateRoute exact path="/professores" component={Professores} />
          <PrivateRoute exact path="/cursos" component={Cursos} />
          <PrivateRoute exact path="/turmas" component={Turmas} />
          <PrivateRoute exact path="/alunos" component={Aluno} />
          <PrivateRoute exact path="/disciplinas" component={Disciplinas} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
