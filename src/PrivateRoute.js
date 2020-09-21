import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const {usuarioAtual} = useContext(AuthContext);
    return (
        <Route
          {...rest}
          render={routeProps =>
                !!usuarioAtual ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={"login"} />
                )
            }
        />
    );
};

export default PrivateRoute;