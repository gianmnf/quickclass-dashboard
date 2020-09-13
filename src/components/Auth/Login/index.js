import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../../../firebase';
import { AuthContext } from '../../../Auth';
import './index.css';

const Login = ({ history }) => {
    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    const { usuarioAtual } = useContext(AuthContext);

    if (usuarioAtual) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <div className="container">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <h1 className="text-center titulo">Efetuar Login</h1>
                        <form autoComplete="off" onSubmit={handleLogin}>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                </div>
                                <input type="email" className="form-control" placeholder="Email" name="email" />
                            </div>
                            <div className="form-row">
                                <div className="form-group input-group col-md-12">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fas fa-key"></i>
                                        </div>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Senha" name="password" />
                                </div>                
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit">Entrar</button>
                                <a className="btn btn-success btn-block" href="/register">Não possui uma conta? Registre-se</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Login);