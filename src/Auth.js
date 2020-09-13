
import React, { useEffect, useState } from 'react';
import app from './firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [usuarioAtual, setUsuarioAtual] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(setUsuarioAtual);
    }, []);

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