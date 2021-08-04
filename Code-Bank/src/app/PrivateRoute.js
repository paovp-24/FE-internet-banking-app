import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const token = localStorage.getItem("token");

    return (
        <Route {...rest} >{token ? <Component /> : <Redirect to="/user-pages/login-1" />}</Route>
    );
};

export default PrivateRoute;