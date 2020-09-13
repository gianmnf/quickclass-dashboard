import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import app from '../../../firebase';
import swal from 'sweetalert';

const Register = ({ history }) => {
    const handleRegister = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            if(error.toString().startsWith('Error: The email ')) {
                swal("Erro", 'Este email já está em uso por outro usuário!', "error");
            }
            
        }
    }, [history]);

    return (
        <>
            <div className="container">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <h1 className="text-center titulo">Registro</h1>
                        <form autoComplete="off" onSubmit={handleRegister}>
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
                                <a className="btn btn-success btn-block" href="/login">Já possui uma conta? Efetuar Login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Register);