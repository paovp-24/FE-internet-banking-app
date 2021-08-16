import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from 'reactstrap';
import Swal from 'sweetalert2';

import { useCuenta_Credito } from '../../hooks/useCuenta_Credito';

const Cuenta_Credito = () => {
  const emptyCuenta_Credito = {
    Codigo: '',
    CodigoUsuario: '',
    CodigoMoneda: '',
    CodigoSucursal: '',
    CodigoTarjeta: '',
    Descripción: '',
    IBAN: '',
    Saldo: '',
    FechaPago: '',
    PagoMinimo: '',
    PagoContado: '',
    Estado: '',
  };

  const { cuentas_credito, postCuenta_Credito, putCuenta_Credito, deleteCuenta_Credito } = useCuenta_Credito();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [cuenta_credito, setCuenta_Credito] = useState(emptyCuenta_Credito);

  const clearCuenta_Credito = () => {
    setCuenta_Credito({ ...emptyCuenta_Credito });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuenta_Credito((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePostCuenta_Credito = () => {
    if (!cuenta_credito.CodigoUsuario) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de codigo de usuario esta vacio',
        'error'
      );
    } else if (!cuenta_credito.CodigoMoneda) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de codigo de moneda esta vacio',
        'error'
      );
    } else if (!cuenta_credito.CodigoSucursal) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de codigo de sucursal esta vacio',
        'error'
      );
    } else if (!cuenta_credito.CodigoTarjeta) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de codigo de tarjeta esta vacio',
        'error'
      );
    } else if (!cuenta_credito.Descripción) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de descripcion esta vacio',
        'error'
      );
    } else if (!cuenta_credito.IBAN) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de IBAN esta vacio',
        'error'
      );
    } else if (!cuenta_credito.Saldo) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de saldo esta vacio',
        'error'
      );
    } else if (!cuenta_credito.FechaPago) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de fecha de pago esta vacio',
        'error'
      );
    } else if (!cuenta_credito.PagoMinimo) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de pago minimo esta vacio',
        'error'
      );
    } else if (!cuenta_credito.PagoContado) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de pago de contado esta vacio',
        'error'
      );
    } else if (!cuenta_credito.Estado) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de estado esta vacio',
        'error'
      );
    } else {
      postCuenta_Credito(cuenta_credito)
      .then(() => setModalInsert(!modalInsert))
      .then(() => clearCuenta_Credito());
    }
  };

  const handlePutCuenta_Credito = () => {
    if (!cuenta_credito.CodigoUsuario) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de codigo de usuario esta vacio',
        'error'
      );
    } else if (!cuenta_credito.CodigoMoneda) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de codigo de moneda esta vacio',
        'error'
      );
    } else if (!cuenta_credito.CodigoSucursal) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de codigo de sucursal esta vacio',
        'error'
      );
    } else if (!cuenta_credito.CodigoTarjeta) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de codigo de tarjeta esta vacio',
        'error'
      );
    } else if (!cuenta_credito.Descripción) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de descripcion esta vacio',
        'error'
      );
    } else if (!cuenta_credito.IBAN) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de IBAN esta vacio',
        'error'
      );
    } else if (!cuenta_credito.Saldo) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de saldo esta vacio',
        'error'
      );
    } else if (!cuenta_credito.FechaPago) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de fecha de pago esta vacio',
        'error'
      );
    } else if (!cuenta_credito.PagoMinimo) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de pago minimo esta vacio',
        'error'
      );
    } else if (!cuenta_credito.PagoContado) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de pago de contado esta vacio',
        'error'
      );
    } else if (!cuenta_credito.Estado) {
      Swal.fire(
        'Error de ingreso de cuenta credito',
        'El campo de estado esta vacio',
        'error'
      );
    } else {
      putCuenta_Credito(cuenta_credito)
      .then(() => setModalUpdate(!modalUpdate))
      .then(() => clearCuenta_Credito());
    }
  };

  const handleDeleteCuenta_Credito = (cuenta_credito) => {
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
        deleteCuenta_Credito(cuenta_credito)
        .then(() => clearCuenta_Credito());
        Swal.fire(
          'Transacción Completa',
          'La cuenta de credito se ha eliminado',
          'success'
        );
      }
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mantenimiento Cuenta de Credito</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Codigo Usuario</th>
                      <th>Codigo Moneda</th>
                      <th>Codigo Sucursal</th>
                      <th>Codigo Tarjeta</th>
                      <th>Descripción</th>
                      <th>IBAN</th>
                      <th>Saldo</th>
                      <th>Fecha de Pago</th>
                      <th>Pago Minimo</th>
                      <th>Pago Contado</th>
                      <th>Estado</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cuentas_credito &&
                      cuentas_credito.map((cuenta_credito) => {
                        return (
                          cuenta_credito.Estado === 'A' && (
                            <tr key={cuenta_credito && cuenta_credito.Codigo}>
                              <td>{cuenta_credito && cuenta_credito.Codigo}</td>
                              <td>
                                {cuenta_credito && cuenta_credito.CodigoUsuario}
                              </td>
                              <td>
                                {cuenta_credito && cuenta_credito.CodigoMoneda}
                              </td>
                              <td>
                                {cuenta_credito &&
                                  cuenta_credito.CodigoSucursal}
                              </td>
                              <td>
                                {cuenta_credito && cuenta_credito.CodigoTarjeta}
                              </td>
                              <td>
                                {cuenta_credito && cuenta_credito.Descripción}
                              </td>
                              <td>{cuenta_credito && cuenta_credito.IBAN}</td>
                              <td>{cuenta_credito && cuenta_credito.Saldo}</td>
                              <td>
                                {cuenta_credito && cuenta_credito.FechaPago}
                              </td>
                              <td>
                                {cuenta_credito && cuenta_credito.PagoMinimo}
                              </td>
                              <td>
                                {cuenta_credito && cuenta_credito.PagoContado}
                              </td>
                              <td>
                                {cuenta_credito && cuenta_credito.Estado === 'A'
                                  ? 'Activo'
                                  : 'Inactivo'}
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setCuenta_Credito(cuenta_credito);
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
                                    handleDeleteCuenta_Credito(cuenta_credito)
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
            <h3>Insertar Cuenta de Credito</h3>
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
            <label>Descripción:</label>
            <input
              className="form-control"
              placeholder="Descripción"
              name="Descripción"
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
            <label>Fecha de Pago:</label>
            <input
              className="form-control"
              placeholder="Fecha de Pago"
              name="FechaPago"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Pago Minimo:</label>
            <input
              className="form-control"
              placeholder="Pago Minimo"
              name="PagoMinimo"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Pago Contado:</label>
            <input
              className="form-control"
              placeholder="Pago Contado"
              name="PagoContado"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={cuenta_credito && cuenta_credito.Estado}
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
          <Button color="primary" onClick={() => handlePostCuenta_Credito()}>
            Insertar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearCuenta_Credito();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Cuenta de Credito</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={cuenta_credito && cuenta_credito.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo Usuario"
              name="CodigoUsuario"
              type="number"
              value={cuenta_credito && cuenta_credito.CodigoUsuario}
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
              value={cuenta_credito && cuenta_credito.CodigoMoneda}
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
              value={cuenta_credito && cuenta_credito.CodigoSucursal}
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
              value={cuenta_credito && cuenta_credito.CodigoTarjeta}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripción:</label>
            <input
              className="form-control"
              placeholder="Descripción"
              name="Descripción"
              type="text"
              maxLength="50"
              size="50"
              value={cuenta_credito && cuenta_credito.Descripción}
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
              value={cuenta_credito && cuenta_credito.IBAN}
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
              value={cuenta_credito && cuenta_credito.Saldo}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Pago:</label>
            <input
              className="form-control"
              placeholder="Fecha de Pago"
              name="FechaPago"
              type="date"
              value={cuenta_credito && cuenta_credito.FechaPago}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Pago Minimo:</label>
            <input
              className="form-control"
              placeholder="Pago Minimo"
              name="PagoMinimo"
              type="number"
              step="0.01"
              value={cuenta_credito && cuenta_credito.PagoMinimo}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Pago Contado:</label>
            <input
              className="form-control"
              placeholder="Pago Contado"
              name="PagoContado"
              type="number"
              step="0.01"
              value={cuenta_credito && cuenta_credito.PagoContado}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={cuenta_credito && cuenta_credito.Estado}
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
          <Button color="primary" onClick={() => handlePutCuenta_Credito()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearCuenta_Credito();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Cuenta_Credito;
