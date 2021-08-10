import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../services/API/APIRest';

const PrivateRoute = ({component: Component, ...rest}) => {
    const [isAuth, setIsAuth] = useState(true);

    useEffect(() => {
        const checkToken = () => {
            const token = getToken();

            if (token) {
                const decodedToken = jwt_decode(token);
                const currentDate = new Date();
                console.log(decodedToken.exp)
                //console.log(decodedToken.exp / 6e+7)
                const isValidToken = decodedToken.exp * 1000 < currentDate.getTime() ? false : true;
                if (!isValidToken) {
                    localStorage.clear();
                    console.log("Token Expired");
                }
                setIsAuth(isValidToken);
            }
            else{
                setIsAuth(false);
            }
        }
        checkToken();

    }, [])

    return (
        <Route {...rest} >{isAuth ? <Component /> : <Redirect to="/user-pages/login-1" />}</Route>
    );
};

export default PrivateRoute;