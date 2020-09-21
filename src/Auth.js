
import React, { useEffect, useState } from 'react';
import app from './firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [usuarioAtual, setUsuarioAtual] = useState(null);
    const [pendente, setPendente] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged(usuario => {
            setUsuarioAtual(usuario)
            setPendente(false)
        });
    }, []);

    if(pendente) {
        return <>Carregando...</>
    }

    return (
        <AuthContext.Provider
          value={{
              usuarioAtual
          }}
        >
            {children}
        </AuthContext.Provider>
    );
};