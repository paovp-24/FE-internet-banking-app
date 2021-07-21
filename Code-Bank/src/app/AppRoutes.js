import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Emisor = lazy(() => import('./tables/Emisor'));
const Sucursal = lazy(() => import('./tables/Sucursal'));
const Prestamo = lazy(() => import('./tables/Prestamo'));
const Promocion = lazy(() => import('./tables/Promocion'));
const Inversion = lazy(() => import('./tables/Inversion'));
const Marchamo = lazy(() => import('./tables/Marchamo'));
const Fiador = lazy(() => import('./tables/Fiador'));
const Tarjeta = lazy(() => import('./tables/Tarjeta'));
const Propiedad = lazy(() => import('./tables/Propiedad'));
const Cuenta_Debito = lazy(() => import('./tables/Cuenta_Debito'));
const Cuenta_Credito = lazy(() => import('./tables/Cuenta_Credito'));

const Mdi = lazy(() => import('./icons/Mdi'));

const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />

          <Route path="/basic-ui/buttons" component={Buttons} />
          <Route path="/basic-ui/dropdowns" component={Dropdowns} />
          <Route path="/basic-ui/typography" component={Typography} />

          <Route
            path="/form-Elements/basic-elements"
            component={BasicElements}
          />

          <Route path="/tables/basic-table" component={BasicTable} />

          <Route path="/tables/emisor" component={Emisor} />
          <Route path="/tables/sucursal" component={Sucursal} />
          <Route path="/tables/prestamo" component={Prestamo} />
          <Route path="/tables/promocion" component={Promocion} />
          <Route path="/tables/inversion" component={Inversion} />
          <Route path="/tables/marchamo" component={Marchamo} />
          <Route path="/tables/fiador" component={Fiador} />
          <Route path="/tables/tarjeta" component={Tarjeta} />
          <Route path="/tables/propiedad" component={Propiedad} />
          <Route path="/tables/cuenta_debito" component={Cuenta_Debito} />
          <Route path="/tables/cuenta_credito" component={Cuenta_Credito} />

          <Route path="/icons/mdi" component={Mdi} />

          <Route path="/charts/chart-js" component={ChartJs} />

          <Route path="/user-pages/login-1" component={Login} />
          <Route path="/user-pages/register-1" component={Register1} />

          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />

          <Redirect to="/user-pages/login-1" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
