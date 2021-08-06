import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import "./i18n";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter basename="internet-banking">
    <App />
  </BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();