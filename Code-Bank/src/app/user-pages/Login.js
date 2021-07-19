import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Apiurl } from '../../services/apirest';
import axios from 'axios';
import Swal from 'sweetalert2';

export class Login extends Component {

  state ={
    form:{
        "Username":"",
        "Password":""
    },
    error: false,
    errorMsg:""
  }

  manejadorSubmit =e=>{
    e.preventDefault();
  }

  manejadorchange = async e=>{
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  manejadorboton=()=>{
    
    if  (!this.state.form.Username){
      Swal.fire(
        'Error de inicio de sesión',
        'El campo de nombre de usuario esta vacio',
        'error'
      )
    }
    else if (!this.state.form.Password)  {
      Swal.fire(
        'Error de inicio de sesión',
        'El campo de contraseña esta vacio',
        'error'
      )  
    }
    else{
      let url = Apiurl + 'login/authenticate';
axios
  .post(url, this.state.form)
  .then((response) => {
    if (response.status === 200) {
      console.log(response.data)
      this.props.history.push('/dashboard');
    }
  })
  .catch((e) => {
    this.setState({
      error: true,
    });
  });
    }
  }

  componentDidUpdate() {
    if (this.state.error) {
        Swal.fire(
            'Error de inicio de sesión',
            'Verifique sus credenciales',
            'error'
        ).then((res) => {
            this.setState({ error: false });
        })
    }
  }
  
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo2.svg")} alt="logo" />
                </div>
                <h4>Bienvenido a Internet Banking</h4>
                <h6 className="font-weight-light">Inicia sesión en el banco de los bicho lovers.</h6>
                <Form className="pt-3" onSubmit={this.manejadorSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="text" placeholder="Nombre de Usuario" name="Username" size="lg" className="h-auto" onChange={this.manejadorchange}/>
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Contraseña" name="Password" size="lg" className="h-auto" onChange={this.manejadorchange}/>
                  </Form.Group>
                  <div className="mt-3">
                    <button onClick={this.manejadorboton} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Iniciar Sesión</button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                  ¿Estás registrado en banco de los bicholovers? 
                  <br/><Link to="/user-pages/register-1" className="text-primary">Registrarse</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default Login
