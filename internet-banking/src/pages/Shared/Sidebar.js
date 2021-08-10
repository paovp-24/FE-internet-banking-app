import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
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
                    src={localStorage.getItem("image") ? localStorage.getItem("image") : require('../../assets/images/faces/face0.jpg')}
                    // src={require('../../assets/images/faces/face0.jpg')}
                    onClick={() => this.setState({modalProfile: true})}
                    alt="profile"
                  />
                  {this.state.modalProfile && <Profile modalProfile={this.state.modalProfile} setModalProfile={() => this.setState({modalProfile: false})} />}
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
              {/* 
           <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>

<Dropdown alignRight>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a
                    href="!#"
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">
                        <Trans>Account settings</Trans>
                      </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    href="!#"
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">
                        <Trans>Change Password</Trans>
                      </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    href="!#"
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small">
                        <Trans>To-do list</Trans>
                      </p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown>


           */}
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
              this.isPathActive('/Propiedades')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/Propiedades">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">
                <Trans>Propiedades</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive('/error-pages')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.cuentasPagesMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('cuentasPagesMenuOpen')}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title">
                <Trans>Cuentas</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.cuentasPagesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/error-pages/error-404')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/error-pages/error-404"
                    >
                      Cuentas de Debito
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/error-pages/error-500')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/error-pages/error-500"
                    >
                      Cuentas de Credito
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive('/error-pages/error-404')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <Link className="nav-link" to="/error-pages/error-404">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">
                <Trans>Prestamo</Trans>
              </span>
            </Link>
          </li>

          <li className="nav-item nav-category">
            <span className="nav-link">
              <Trans>Componentes de diseño Web</Trans>
            </span>
          </li>
          <li
            className={
              this.isPathActive('/basic-ui')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.basicUiMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('basicUiMenuOpen')}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-laptop"></i>
              </span>
              <span className="menu-title">
                <Trans>Basic UI Elements</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.basicUiMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/basic-ui/buttons')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/basic-ui/buttons"
                    >
                      <Trans>Buttons</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/basic-ui/dropdowns')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/basic-ui/dropdowns"
                    >
                      <Trans>Dropdowns</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/basic-ui/typography')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/basic-ui/typography"
                    >
                      <Trans>Typography</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive('/form-elements')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.formElementsMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('formElementsMenuOpen')}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title">
                <Trans>Form Elements</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.formElementsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/form-elements/basic-elements')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/form-elements/basic-elements"
                    >
                      <Trans>Basic Elements</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive('/tables')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.tablesMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('tablesMenuOpen')}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-table-large"></i>
              </span>
              <span className="menu-title">
                <Trans>Mantenimientos</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.tablesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/basic-table')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/basic-table"
                    >
                      <Trans>Basic Table</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/emisor')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/emisor"
                    >
                      <Trans>Emisor</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/prestamo')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/prestamo"
                    >
                      <Trans>Prestamo</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/promocion')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/promocion"
                    >
                      <Trans>Promocion</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/sucursal')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/sucursal"
                    >
                      <Trans>Sucursal</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/inversion')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/inversion"
                    >
                      <Trans>Inversion</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/marchamo')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/marchamo"
                    >
                      <Trans>Marchamo</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/fiador')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/fiador"
                    >
                      <Trans>Fiador</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/tarjeta')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/tarjeta"
                    >
                      <Trans>Tarjeta</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/propiedad')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/propiedad"
                    >
                      <Trans>Propiedad</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/cuenta_debito')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/cuenta_debito"
                    >
                      <Trans>Cuenta Debito</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/cuenta_credito')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/cuenta_credito"
                    >
                      <Trans>Cuenta Credito</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/mantenimiento/sesion')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/mantenimiento/sesion"
                    >
                      <Trans>Sesion</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive('/charts')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.chartsMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('chartsMenuOpen')}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-chart-bar"></i>
              </span>
              <span className="menu-title">
                <Trans>Charts</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.chartsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/charts/chart-js')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/charts/chart-js"
                    >
                      <Trans>Chart Js</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive('/icons')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'
              }
              onClick={() => this.toggleMenuState('iconsMenuOpen')}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-contacts"></i>
              </span>
              <span className="menu-title">
                <Trans>Icons</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.iconsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/icons/mdi')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/icons/mdi"
                    >
                      <Trans>Material</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive('/user-pages')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.userPagesMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('userPagesMenuOpen')}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title">
                <Trans>User Pages</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.userPagesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/user-pages/login-1')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/user-pages/login-1"
                    >
                      <Trans>Login</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/user-pages/register-1')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/user-pages/register-1"
                    >
                      <Trans>Register</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive('/error-pages')
                ? 'nav-item menu-items active'
                : 'nav-item menu-items'
            }
          >
            <div
              className={
                this.state.errorPagesMenuOpen
                  ? 'nav-link menu-expanded'
                  : 'nav-link'
              }
              onClick={() => this.toggleMenuState('errorPagesMenuOpen')}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title">
                <Trans>Error Pages</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.errorPagesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/error-pages/error-404')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/error-pages/error-404"
                    >
                      404
                    </Link>
                  </li>
                  <li className="nav-item">
                    {' '}
                    <Link
                      className={
                        this.isPathActive('/error-pages/error-500')
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      to="/error-pages/error-500"
                    >
                      500
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item menu-items">
            <a
              className="nav-link"
              href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title">
                <Trans>Documentation</Trans>
              </span>
            </a>
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
