import React, { Suspense, lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Spinner from '../pages/Shared/Spinner';

/* Pages */

const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));

const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));

const Error404 = lazy(() => import('../pages/Error/Error404'));
const Error500 = lazy(() => import('../pages/Error/Error500'));

/* Components */

const Emisor = lazy(() => import('../components/Emisor/Emisor'));
const Sucursal = lazy(() => import('../components/Sucursal/Sucursal'));
const Prestamo = lazy(() => import('../components/Prestamo/Prestamo'));
const Promocion = lazy(() => import('../components/Promocion/Promocion'));
const Inversion = lazy(() => import('../components/Inversion/Inversion'));
const Marchamo = lazy(() => import('../components/Marchamo/Marchamo'));
const Fiador = lazy(() => import('../components/Fiador/Fiador'));
const Tarjeta = lazy(() => import('../components/Tarjeta/Tarjeta'));
const Propiedad = lazy(() => import('../components/Propiedad/Propiedad'));
const Cuenta_Debito = lazy(() => import('../components/Cuenta_Debito/Cuenta_Debito'));
const Cuenta_Credito = lazy(() => import('../components/Cuenta_Credito/Cuenta_Credito'));
const Sesion = lazy(() => import('../components/Sesion/Sesion'));
const Estadistica = lazy(() => import('../components/Estadistica/Estadistica'));

/* Routes */

const PublicRoute = lazy(() => import('./PublicRoute.js'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />

        <PrivateRoute path="/mantenimiento/emisor" component={Emisor} />
        <PrivateRoute
          path="/mantenimiento/estadistica"
          component={Estadistica}
        />

        <PrivateRoute path="/mantenimiento/sucursal" component={Sucursal} />
        <PrivateRoute path="/mantenimiento/prestamo" component={Prestamo} />
        <PrivateRoute path="/mantenimiento/promocion" component={Promocion} />
        <PrivateRoute path="/mantenimiento/inversion" component={Inversion} />
        <PrivateRoute path="/mantenimiento/marchamo" component={Marchamo} />
        <PrivateRoute path="/mantenimiento/fiador" component={Fiador} />
        <PrivateRoute path="/mantenimiento/tarjeta" component={Tarjeta} />
        <PrivateRoute path="/mantenimiento/propiedad" component={Propiedad} />
        <PrivateRoute path="/mantenimiento/cuenta_debito" component={Cuenta_Debito} />
        <PrivateRoute path="/mantenimiento/cuenta_credito" component={Cuenta_Credito} />
        <PrivateRoute path="/mantenimiento/sesion" component={Sesion} />
        <PrivateRoute path="/mantenimiento/estadistica" component={Estadistica} />

        <PrivateRoute path="/error-pages/error-404" component={Error404} />
        <PrivateRoute path="/error-pages/error-500" component={Error500} />

        <Redirect to="/login" />
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
