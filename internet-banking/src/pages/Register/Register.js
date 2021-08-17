import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { register } from "../../services/Register/index";

const Register = () => {
  const emptyForm = {
    Identificacion: "",
    Nombre: "",
    Username: "",
    Email: "",
    Password: "",
    FechaNacimiento: "",
    Estado: "A",
  };

  const [form, setForm] = useState(emptyForm);
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
    option === 1 ? Swal.fire("Error de Registro", `El campo de ${campo} está vacio`,"error") :
    option === 2 ? Swal.fire("Error de Registro", "Ingrese un campo de email valido","error") :
    option === 3 ? Swal.fire("Error de registro", "Revise sus credenciales o intente más tarde", "error") :
    Swal.fire("Registro completado exitosamente", "Ahora eres un bicholover, inicia sesión", "success");
  }

  const onRegister = async() => {
    await register(form)
    .then((status) => {
      if (status === 200) {
        history.push("/login");
      }
      handleError(4)
    })
    .catch((e) => {
      console.log(e);
      handleError(3);
    });
  }

  const handleRegister = () => {
    const { Identificacion, Nombre, Username, Email, Password, FechaNacimiento } = form;

    const regex = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    !Identificacion ? handleError(1, "identificación") : !Nombre ? handleError(1, "nombre completo") :
    !Username ? handleError(1, "nombre de usuario") : !Email ? handleError(1, "email") :
    !regex.test(Email) ? handleError(2) : !Password ? handleError(1, "contraseña") :
    !FechaNacimiento ? handleError(1, "fecha de nacimiento") : onRegister();
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0 h-100">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img
                  src={require("../../assets/images/logo2.svg")}
                  alt="logo"
                />
              </div>
              <h4>¿Nuevo en el banco de los bicho lovers?</h4>
              <h6 className="font-weight-light">
                ¡Complete la siguiente información!
              </h6>
              <form className="pt-3" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    name="Identificacion"
                    placeholder="Número de Identificación"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="Nombre"
                    placeholder="Nombre completo"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="Username"
                    placeholder="Nombre de Usuario"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    name="Email"
                    placeholder="Correo Electrónico"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    name="Password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Fecha de Nacimiento</label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="FechaNacimiento"
                    placeholder="Fecha de Nacimiento"
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-3">
                  <button
                    onClick={handleRegister}
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  >
                    Registrarse
                  </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  ¿Ya eres un bicho lover? <br />
                  <Link to="/login" className="text-primary">
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
};

export default Register;
