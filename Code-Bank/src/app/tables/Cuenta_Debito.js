import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from 'reactstrap';
import Swal from 'sweetalert2';

import { Apiurl } from '../../services/apirest';

const url = Apiurl + 'Cuenta_Debito/';

const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
};

const Cuenta_Debito = () => {
  const emptyCuenta_Debito = {
    Codigo: '',
    CodigoUsuario: '',
    CodigoMoneda: '',
    CodigoSucursal: '',
    CodigoTarjeta: '',
    Descripcion: '',
    IBAN: '',
    Saldo: '',
    Estado: '',
  };

  const [cuentas_debito, setCuentas_Debito] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [cuenta_debito, setCuenta_Debito] = useState(emptyCuenta_Debito);

  const clearCuenta_Debito = () => {
    setCuenta_Debito({ ...emptyCuenta_Debito });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuenta_Debito((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getCuentas_Debito = async () => {
    await axios.get(url, config).then((res) => {
      const data = res.data;
      setCuentas_Debito(data);
    });
  };

  // eslint-disable-next-line
  const getCuenta_DebitoById = async () => {
    await axios.get(url + cuenta_debito.Codigo, config).then((res) => {
      const data = res.data;
      setCuenta_Debito(data);
    });
  };

  const postCuenta_Debito = async () => {
    await axios.post(url, cuenta_debito, config).then((res) => {
      const data = res.data;
      setCuentas_Debito(cuentas_debito.concat(data));
      clearCuenta_Debito();
      getCuentas_Debito();
      setModalInsert(!modalInsert);
    });
  };

  const handlePostCuenta_Debito = () => {
    if (!cuenta_debito.CodigoUsuario) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de codigo de usuario esta vacio',
        'error'
      );
    } else if (!cuenta_debito.CodigoMoneda) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de codigo de moneda esta vacio',
        'error'
      );
    } else if (!cuenta_debito.CodigoSucursal) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de codigo de sucursal esta vacio',
        'error'
      );
    } else if (!cuenta_debito.CodigoTarjeta) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de codigo de tarjeta esta vacio',
        'error'
      );
    } else if (!cuenta_debito.Descripcion) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de descripcion esta vacio',
        'error'
      );
    } else if (!cuenta_debito.IBAN) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de IBAN esta vacio',
        'error'
      );
    } else if (!cuenta_debito.Saldo) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de saldo esta vacio',
        'error'
      );
    } else if (!cuenta_debito.Estado) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de estado esta vacio',
        'error'
      );
    } else {
      postCuenta_Debito();
    }
  };

  const putCuenta_Debito = async () => {
    await axios
      .put(url + cuenta_debito.Codigo, cuenta_debito, config)
      .then((res) => {
        const newData = cuentas_debito;
        newData.map((item) => {
          if (cuenta_debito.Codigo === item.Codigo) {
            item.CodigoUsuario = cuenta_debito.CodigoUsuario;
            item.CodigoMoneda = cuenta_debito.CodigoMoneda;
            item.CodigoSucursal = cuenta_debito.CodigoSucursal;
            item.CodigoTarjeta = cuenta_debito.CodigoTarjeta;
            item.Descripcion = cuenta_debito.Descripcion;
            item.IBAN = cuenta_debito.IBAN;
            item.Saldo = cuenta_debito.Saldo;
            item.Estado = cuenta_debito.Estado;
          }
          return newData;
        });
        setCuentas_Debito(newData);
        clearCuenta_Debito();
        getCuentas_Debito();
        setModalUpdate(!modalUpdate);
      });
  };

  const handlePutCuenta_Debito = () => {
    if (!cuenta_debito.CodigoUsuario) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de codigo de usuario esta vacio',
        'error'
      );
    } else if (!cuenta_debito.CodigoMoneda) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de codigo de moneda esta vacio',
        'error'
      );
    } else if (!cuenta_debito.CodigoSucursal) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de codigo de sucursal esta vacio',
        'error'
      );
    } else if (!cuenta_debito.CodigoTarjeta) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de codigo de tarjeta esta vacio',
        'error'
      );
    } else if (!cuenta_debito.Descripcion) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de descripcion esta vacio',
        'error'
      );
    } else if (!cuenta_debito.IBAN) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de IBAN esta vacio',
        'error'
      );
    } else if (!cuenta_debito.Saldo) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de saldo esta vacio',
        'error'
      );
    } else if (!cuenta_debito.Estado) {
      Swal.fire(
        'Error de ingreso de cuenta debito',
        'El campo de estado esta vacio',
        'error'
      );
    } else {
      putCuenta_Debito();
    }
  };

  const deleteCuenta_Debito = async (cuenta_debito) => {
    if (cuenta_debito.Codigo) {
      await axios.delete(url + cuenta_debito.Codigo, config).then((res) => {
        setCuentas_Debito(
          cuentas_debito.filter((item) => item.Codigo !== cuenta_debito.Codigo)
        );
        clearCuenta_Debito();
      });
    }
  };

  const handleDeleteCuenta_Debito = (cuenta_debito) => {
    Swal.fire({
      title: 'Esta seguro de eliminar?',
      text: 'Esta accion no se puede devolver!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        deleteCuenta_Debito(cuenta_debito);
        Swal.fire(
          'Transacción Completa',
          'La cuenta de debito se ha eliminado',
          'success'
        );
      }
    });
  };

  useEffect(() => {
    getCuentas_Debito();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mantenimiento Cuenta de Debito</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Codigo Usuario</th>
                      <th>Codigo Moneda</th>
                      <th>Codigo Sucursal</th>
                      <th>Codigo Tarjeta</th>
                      <th>Descripcion</th>
                      <th>IBAN</th>
                      <th>Saldo</th>
                      <th>Estado</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cuentas_debito &&
                      cuentas_debito.map((cuenta_debito) => {
                        return (
                          cuenta_debito.Estado === 'A' && (
                            <tr key={cuenta_debito && cuenta_debito.Codigo}>
                              <td>{cuenta_debito && cuenta_debito.Codigo}</td>
                              <td>
                                {cuenta_debito && cuenta_debito.CodigoUsuario}
                              </td>
                              <td>
                                {cuenta_debito && cuenta_debito.CodigoMoneda}
                              </td>
                              <td>
                                {cuenta_debito && cuenta_debito.CodigoSucursal}
                              </td>
                              <td>
                                {cuenta_debito && cuenta_debito.CodigoTarjeta}
                              </td>
                              <td>
                                {cuenta_debito && cuenta_debito.Descripcion}
                              </td>
                              <td>{cuenta_debito && cuenta_debito.IBAN}</td>
                              <td>{cuenta_debito && cuenta_debito.Saldo}</td>
                              <td>
                                {cuenta_debito && cuenta_debito.Estado === 'A'
                                  ? 'Activo'
                                  : 'Inactivo'}
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setCuenta_Debito(cuenta_debito);
                                    setModalUpdate(!modalUpdate);
                                  }}
                                >
                                  Editar
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    handleDeleteCuenta_Debito(cuenta_debito)
                                  }
                                >
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          )
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-outline-secondary btn-lg btn-block"
          onClick={() => setModalInsert(!modalInsert)}
        >
          Ingresar
        </button>
      </div>

      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Cuenta de Debito</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo Usuario"
              name="CodigoUsuario"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Moneda:</label>
            <input
              className="form-control"
              placeholder="Codigo Moneda"
              name="CodigoMoneda"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Sucursal:</label>
            <input
              className="form-control"
              placeholder="Codigo Sucursal"
              name="CodigoSucursal"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Tarjeta:</label>
            <input
              className="form-control"
              placeholder="Codigo Tarjeta"
              name="CodigoTarjeta"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>
            <input
              className="form-control"
              placeholder="Descripcion"
              name="Descripcion"
              type="text"
              maxLength="50"
              size="50"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>IBAN:</label>
            <input
              className="form-control"
              placeholder="IBAN"
              name="IBAN"
              type="text"
              maxLength="22"
              size="22"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Saldo:</label>
            <input
              className="form-control"
              placeholder="Saldo"
              name="Saldo"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={cuenta_debito && cuenta_debito.Estado}
              name="Estado"
              type="text"
              onChange={handleChange}
            >
              <option value="">Seleccione un Estado</option>
              <option value="I">Inactivo</option>
              <option value="A">Activo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePostCuenta_Debito()}>
            Insertar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearCuenta_Debito();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Cuenta de Debito</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={cuenta_debito && cuenta_debito.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo Usuario"
              name="CodigoUsuario"
              type="number"
              value={cuenta_debito && cuenta_debito.CodigoUsuario}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Moneda:</label>
            <input
              className="form-control"
              placeholder="Codigo Moneda"
              name="CodigoMoneda"
              type="number"
              value={cuenta_debito && cuenta_debito.CodigoMoneda}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Sucursal:</label>
            <input
              className="form-control"
              placeholder="Codigo Sucursal"
              name="CodigoSucursal"
              type="number"
              value={cuenta_debito && cuenta_debito.CodigoSucursal}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Tarjeta:</label>
            <input
              className="form-control"
              placeholder="Codigo Tarjeta"
              name="CodigoTarjeta"
              type="number"
              value={cuenta_debito && cuenta_debito.CodigoTarjeta}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>
            <input
              className="form-control"
              placeholder="Descripcion"
              name="Descripcion"
              type="text"
              maxLength="50"
              size="50"
              value={cuenta_debito && cuenta_debito.Descripcion}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>IBAN:</label>
            <input
              className="form-control"
              placeholder="IBAN"
              name="IBAN"
              type="text"
              maxLength="22"
              size="22"
              value={cuenta_debito && cuenta_debito.IBAN}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Saldo:</label>
            <input
              className="form-control"
              placeholder="Saldo"
              name="Saldo"
              type="number"
              step="0.01"
              value={cuenta_debito && cuenta_debito.Saldo}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={cuenta_debito && cuenta_debito.Estado}
              name="Estado"
              type="text"
              onChange={handleChange}
            >
              <option value="">Seleccione un Estado</option>
              <option value="I">Inactivo</option>
              <option value="A">Activo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutCuenta_Debito()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearCuenta_Debito();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Cuenta_Debito;
