import React, { Suspense, lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./mantenimientos/BasicTable'));

const Emisor = lazy(() => import('./mantenimientos/emisor/Emisor'));
const Sucursal = lazy(() => import('./mantenimientos/Sucursal'));
const Prestamo = lazy(() => import('./mantenimientos/Prestamo'));
const Promocion = lazy(() => import('./mantenimientos/Promocion'));
const Inversion = lazy(() => import('./mantenimientos/Inversion'));
const Marchamo = lazy(() => import('./mantenimientos/Marchamo'));
const Fiador = lazy(() => import('./mantenimientos/Fiador'));
const Tarjeta = lazy(() => import('./mantenimientos/Tarjeta'));
const Propiedad = lazy(() => import('./mantenimientos/Propiedad'));
const Cuenta_Debito = lazy(() => import('./mantenimientos/Cuenta_Debito'));
const Cuenta_Credito = lazy(() => import('./mantenimientos/Cuenta_Credito'));

const Mdi = lazy(() => import('./icons/Mdi'));

const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register = lazy(() => import('./user-pages/Register'));

const PublicRoute = lazy(() => import('./PublicRoute.js'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />

        <PrivateRoute path="/basic-ui/buttons" component={Buttons} />
        <PrivateRoute path="/basic-ui/dropdowns" component={Dropdowns} />
        <PrivateRoute path="/basic-ui/typography" component={Typography} />

        <PrivateRoute path="/form-Elements/basic-elements" component={BasicElements} />

        <PrivateRoute path="/mantenimientos/basic-table" component={BasicTable} />

        <PrivateRoute path="/mantenimientos/emisor" component={Emisor} />
        <PrivateRoute path="/mantenimientos/sucursal" component={Sucursal} />
        <PrivateRoute path="/mantenimientos/prestamo" component={Prestamo} />
        <PrivateRoute path="/mantenimientos/promocion" component={Promocion} />
        <PrivateRoute path="/mantenimientos/inversion" component={Inversion} />
        <PrivateRoute path="/mantenimientos/marchamo" component={Marchamo} />
        <PrivateRoute path="/mantenimientos/fiador" component={Fiador} />
        <PrivateRoute path="/mantenimientos/tarjeta" component={Tarjeta} />
        <PrivateRoute path="/mantenimientos/propiedad" component={Propiedad} />
        <PrivateRoute path="/mantenimientos/cuenta_debito" component={Cuenta_Debito} />
        <PrivateRoute path="/mantenimientos/cuenta_credito" component={Cuenta_Credito} />

        <PrivateRoute path="/icons/mdi" component={Mdi} />

        <PrivateRoute path="/charts/chart-js" component={ChartJs} />

        <PublicRoute path="/user-pages/login-1" component={Login} />
        <PublicRoute path="/user-pages/register-1" component={Register} />

        <PrivateRoute path="/error-pages/error-404" component={Error404} />
        <PrivateRoute path="/error-pages/error-500" component={Error500} />

        <Redirect to="/user-pages/login-1" />
      </Switch>
    </Suspense>
  );
}

export default AppRoutes;
