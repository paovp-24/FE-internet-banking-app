import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Trans } from 'react-i18next';
import Profile from './Profile';

class Sidebar extends Component {
  state = {
    modalProfile: false,
  };

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }

  render() {
    return (
      /* eslint-disable */
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo">
            <img src={require('../../assets/images/logo2.svg')} alt="logo" />
          </a>
          <a className="sidebar-brand brand-logo-mini">
            <img
              src={require('../../assets/images/logo2-mini.svg')}
              alt="logo"
            />
          </a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <input
                    type="image"
                    className="img-xs rounded-circle"
                    src={
                      localStorage.getItem('image')
                        ? localStorage.getItem('image')
                        : require('../../assets/images/faces/face0.jpg')
                    }
                    onClick={() => this.setState({ modalProfile: true })}
                    alt="profile"
                  />
                  {this.state.modalProfile && (
                    <Profile
                      modalProfile={this.state.modalProfile}
                      setModalProfile={() =>
                        this.setState({ modalProfile: false })
                      }
                    />
                  )}
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">
                    <Trans>{localStorage.getItem('name')}</Trans>
                  </h5>
                  <span>
                    <Trans>System Admin</Trans>
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">
              <Trans>Paginas</Trans>
            </span>
          </li>
          <li
            className={
              this.isPathActive('/dashboard')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">
                <Trans>Dashboard</Trans>
              </span>
            </Link>
          </li>

          <li className="nav-item nav-category">
            <span className="nav-link">
              <Trans>Mantenimientos</Trans>
            </span>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/sesion')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/sesion">
              <span className="menu-icon">
                <i className="mdi mdi-application"></i>
              </span>
              <span className="menu-title">
                <Trans>Sesion</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/estadistica')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/estadistica">
              <span className="menu-icon">
                <i className="mdi mdi-chart-line"></i>
              </span>
              <span className="menu-title">
                <Trans>Estadistica</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/emisor')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/emisor">
              <span className="menu-icon">
                <i className="mdi mdi-bank"></i>
              </span>
              <span className="menu-title">
                <Trans>Emisor</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/prestamo')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/prestamo">
              <span className="menu-icon">
                <i className="mdi mdi-cash-multiple"></i>
              </span>
              <span className="menu-title">
                <Trans>Prestamo</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/promocion')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/promocion">
              <span className="menu-icon">
                <i className="mdi mdi-currency-usd-off"></i>
              </span>
              <span className="menu-title">
                <Trans>Promocion</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/sucursal')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/sucursal">
              <span className="menu-icon">
                <i className="mdi mdi-office-building"></i>
              </span>
              <span className="menu-title">
                <Trans>Sucursal</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/inversion')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/inversion">
              <span className="menu-icon">
                <i className="mdi mdi-cash"></i>
              </span>
              <span className="menu-title">
                <Trans>Inversion</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/marchamo')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/marchamo">
              <span className="menu-icon">
                <i className="mdi mdi-credit-card-marker-outline"></i>
              </span>
              <span className="menu-title">
                <Trans>Marchamo</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/fiador')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/fiador">
              <span className="menu-icon">
                <i className="mdi mdi-account-lock-outline"></i>
              </span>
              <span className="menu-title">
                <Trans>Fiador</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/tarjeta')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/tarjeta">
              <span className="menu-icon">
                <i className="mdi mdi-card-text-outline"></i>
              </span>
              <span className="menu-title">
                <Trans>Tarjeta</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/propiedad')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/propiedad">
              <span className="menu-icon">
                <i className="mdi mdi-home"></i>
              </span>
              <span className="menu-title">
                <Trans>Propiedad</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/cuenta_debito')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/cuenta_debito">
              <span className="menu-icon">
                <i className="mdi mdi-account-card-details-outline"></i>
              </span>
              <span className="menu-title">
                <Trans>Cuenta Debito</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/mantenimiento/cuenta_credito')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/mantenimiento/cuenta_credito">
              <span className="menu-icon">
                <i className="mdi mdi-account-card-details"></i>
              </span>
              <span className="menu-title">
                <Trans>Cuenta Credito</Trans>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }
}

export default withRouter(Sidebar);
