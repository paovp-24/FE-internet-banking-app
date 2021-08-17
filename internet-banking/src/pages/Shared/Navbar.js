import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import Profile from './Profile';

class Navbar extends Component {
  state = {
    modalProfile: false,
  };

  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  toggleRightSidebar() {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }
  render() {
    return (
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img
              src={require('../../assets/images/logo2-mini.svg')}
              alt="logo"
            />
          </Link>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button
            className="navbar-toggler align-self-center"
            type="button"
            onClick={() => document.body.classList.toggle('sidebar-icon-only')}
          >
            <span className="mdi mdi-menu"></span>
          </button>

          <ul className="navbar-nav navbar-nav-right">
            <Dropdown alignRight as="li" className="nav-item">
              <Dropdown.Toggle
                as="a"
                className="nav-link cursor-pointer no-caret"
              >
                <div className="navbar-profile">
                  <img
                    className="img-xs rounded-circle"
                    src={localStorage.getItem("image") ? localStorage.getItem("image") : require('../../assets/images/faces/face0.jpg')}
                    alt="profile"
                  />
                  <p className="mb-0 d-none d-sm-block navbar-profile-name">
                    <Trans>{localStorage.getItem('name')}</Trans>
                  </p>
                  <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
                <h6 className="p-3 mb-0">
                  <Trans>Perfil de Usuario</Trans>
                </h6>
                <Dropdown.Divider />
                <div
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item dropdown-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-account-circle-outline"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">
                      {' '}
                      <Link className={'nav-link'} to="#" onClick={() => this.setState({ modalProfile: true })}>
                        <Trans>Perfil de Usuario</Trans>
                      </Link>
                      {this.state.modalProfile && (
                      <Profile
                        modalProfile={this.state.modalProfile}
                        setModalProfile={() =>
                          this.setState({ modalProfile: false })
                      }
                    />
                  )}
                    </p>
                  </div>
                </div>
                <div
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item dropdown-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">
                      {' '}
                      <Link className={'nav-link'} to="/login" onClick={() => localStorage.clear()}>
                        <Trans>Cerrar Sesión</Trans>
                      </Link>
                    </p>
                  </div>
                </div>
                <Dropdown.Divider />
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={this.toggleOffcanvas}
          >
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
