import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Apiurl } from '../../services/apirest';
import axios from 'axios';
import Swal from 'sweetalert2';

export class Register extends Component {
  state = {
    form: {
      Identificacion: '',
      Nombre: '',
      Username: '',
      Email: '',
      Password: '',
      FechaNacimiento: '',
      Estado: 'A',
    },
    error: false,
    errorMsg: '',
  };

  manejadorSubmit = (e) => {
    e.preventDefault();
  };

  manejadorchange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  manejadorboton = () => {
    var regex = new RegExp (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    
    if (!this.state.form.Identificacion) {
      Swal.fire(
        'Error de Registro',
        'El campo de Identificación esta vacio',
        'error'
      );
    } else if (!this.state.form.Nombre) {
      Swal.fire(
        'Error de Registro',
        'El campo de nombre de completo esta vacio',
        'error'
      );
    } else if (!this.state.form.Username) {
      Swal.fire(
        'Error de Registro',
        'El campo de nombre de usuario esta vacio',
        'error'
      );
    } else if (!this.state.form.Email) {
      Swal.fire('Error de Registro', 'El campo de email esta vacio', 'error');
    } 
    else if (!regex.test(this.state.form.Email)) {
      Swal.fire(
        'Error de Registro',
        'Ingrese el campo de email un email valido',
        'error'
      );
    }
    else if (!this.state.form.Password) {
      Swal.fire(
        'Error de inicio de sesión',
        'El campo de contraseña esta vacio',
        'error'
      );
    } else if (!this.state.form.FechaNacimiento) {
      Swal.fire(
        'Error de Registro',
        'El campo de Fecha de su nacimiento esta vacio',
        'error'
      );
    } else {
      let url = Apiurl + 'login/register';
      axios
        .post(url, this.state.form)
        .then((response) => {
          if (response.status === 200) {
            this.props.history.push('/user-pages/login-1');
            Swal.fire(
              'Registro completado exitosamente',
              'Ahora eres un bicholover, inicia sesión',
              'success'
            );
          }
        })
        .catch((e) => {
          this.setState({
            error: true,
          });
        });
    }
  };

  componentDidUpdate() {
    if (this.state.error) {
      Swal.fire(
        'Error de registro',
        'Revise sus credenciales o intente más tarde',
        'error'
      ).then((res) => {
        this.setState({ error: false });
      });
    }
  }

  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 h-100">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img
                    src={require('../../assets/images/logo2.svg')}
                    alt="logo"
                  />
                </div>
                <h4>¿Nuevo en el banco de los bicho lovers?</h4>
                <h6 className="font-weight-light">
                  ¡Complete la siguiente información!
                </h6>
                <form className="pt-3" onSubmit={this.manejadorSubmit}>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      name="Identificacion"
                      placeholder="Número de Identificación"
                      onChange={this.manejadorchange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="Nombre"
                      placeholder="Nombre completo"
                      onChange={this.manejadorchange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="Username"
                      placeholder="Nombre de Usuario"
                      onChange={this.manejadorchange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      name="Email"
                      placeholder="Correo Electrónico"
                      onChange={this.manejadorchange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      name="Password"
                      placeholder="Contraseña"
                      onChange={this.manejadorchange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="FechaNacimiento"
                      placeholder="Fecha de Nacimiento"
                      onChange={this.manejadorchange}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={this.manejadorboton}
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      Registrarse
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    ¿Ya eres un bicho lover? <br />
                    <Link to="/user-pages/login" className="text-primary">
                      iniciar Sesión
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
