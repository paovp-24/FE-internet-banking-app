import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { logIn, postEstadistica } from '../../services/Login/index';
import { browserName } from 'react-device-detect';
import Swal from 'sweetalert2';
import { osName, mobileVendor } from 'react-device-detect';

const Login = () => {
  //Date
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    ', ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();

  
  const [form, setForm] = useState({ Username: '', Password: '' });
  const history = useHistory();

  

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          'Error de inicio de sesión',
          `El campo de ${campo} está vacio`,
          'error'
        )
      : Swal.fire(
          'Error de inicio de sesión',
          'Verifique sus credenciales',
          'error'
        );
  };

  const onLogIn = async () => {
    await logIn(form)
      .then((response) => {
        const { data, status } = response;
        if (status === 200) {
          const { Token, Nombre } = data;
          const name = Nombre.split(' ');
          localStorage.setItem('token', Token);
          localStorage.setItem('name', name[0]);
          const { Codigo } = data;
          console.log(Codigo);
          const estadistica = {
            CodigoUsuario: `${Codigo}`,
            FechaHora: `${datetime}`,
            Navegador: `${browserName}`,
            PlataformaDispositivo: `${osName}`,
            FabricanteDispositivo: `${mobileVendor}`,
            Vista: 'Login',
            Accion: 'Iniciar Sesión',
          };
          postEstadistica(estadistica);
          history.push('/dashboard');
        }
      })
      .catch((e) => {
        console.log(e);
        handleError(2);
      });
  };

  const handleLogIn = () => {
    const { Username, Password } = form;

    !Username
      ? handleError(1, 'nombre de usuario')
      : !Password
      ? handleError(1, 'contraseña')
      : onLogIn();
  };

  return (
    <>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img
                  src={require('../../assets/images/logo2.svg')}
                  alt="logo"
                />
              </div>
              <h4>Bienvenido a Internet Banking</h4>
              <h6 className="font-weight-light">
                Inicia sesión en el banco de los bicho lovers.
              </h6>
              <Form className="pt-3" onSubmit={handleSubmit}>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="text"
                    placeholder="Nombre de Usuario"
                    name="Username"
                    size="lg"
                    className="h-auto"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    name="Password"
                    size="lg"
                    className="h-auto"
                    onChange={handleChange}
                    autoComplete="on"
                  />
                </Form.Group>
                <div className="mt-3">
                  <button
                    onClick={handleLogIn}
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  >
                    Iniciar Sesión
                  </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  ¿Estás registrado en banco de los bicholovers?
                  <br />
                  <Link to="/user-pages/register-1" className="text-primary">
                    Registrarse
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
