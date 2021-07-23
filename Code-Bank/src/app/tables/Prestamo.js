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

const url = Apiurl + 'Prestamo/';

const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
};

const Prestamo = () => {
  const emptyPrestamo = {
    Codigo: '',
    CodigoUsuario: '',
    CodigoMoneda: '',
    Monto: '',
    SaldoPendiente: '',
    TasaInteres: '',
    FechaEmision: '',
    FechaVencimiento: '',
    Estado: ''
  };

  const [prestamos, setPrestamos] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [prestamo, setPrestamo] = useState(emptyPrestamo);

  const clearPrestamo = () => {
    setPrestamo({ ...emptyPrestamo });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestamo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getPrestamos = async () => {
    await axios.get(url, config).then((res) => {
      const data = res.data;
      setPrestamos(data);
    });
  };

  // eslint-disable-next-line
  const getPrestamosById = async() => {
    await axios.get(url+prestamo.Codigo, config).then(res=>{
      const data = res.data;
      setPrestamo(data);
    })
  }

  const postPrestamo = async () => {
    await axios.post(url, prestamo, config).then((res) => {
      const data = res.data;
      setPrestamos(prestamos.concat(data));
      clearPrestamo();
      getPrestamos();
      setModalInsert(!modalInsert);
    });
  };

  const handlePostPrestamo = () => {
    if (!prestamo.CodigoUsuario) {
      Swal.fire(
        'Error de ingreso de prestamo',
        'El campo de codigo de usuario esta vacio',
        'error'
      );
    } else if (!prestamo.CodigoMoneda) {
      Swal.fire(
        'Error de ingreso de prestamo',
        'El campo de codigo de moneda esta vacio',
        'error'
      );
    } else if (!prestamo.Monto) {
      Swal.fire(
        'Error de ingreso de prestamo',
        'El campo de monto esta vacio',
        'error'
      );
    } else if (!prestamo.SaldoPendiente) {
        Swal.fire(
          'Error de ingreso de prestamo',
          'El campo de saldo pendiente esta vacio',
          'error'
        );
      } else if (!prestamo.TasaInteres) {
        Swal.fire(
          'Error de ingreso de prestamo',
          'El campo de tasa de interes esta vacio',
          'error'
        );
      } else if (!prestamo.FechaEmision) {
        Swal.fire(
          'Error de ingreso de prestamo',
          'El campo de fecha de emision esta vacio',
          'error'
        );
      } else if (!prestamo.FechaVencimiento) {
        Swal.fire(
          'Error de ingreso de prestamo',
          'El campo de fecha de vencimiento esta vacio',
          'error'
        );
      } else if (!prestamo.Estado) {
        Swal.fire(
          'Error de ingreso de prestamo',
          'El campo de estado esta vacio',
          'error'
        );
      } else {
      postPrestamo();
    }
  };

  const putPrestamo = async () => {
    await axios.put(url + prestamo.Codigo, prestamo, config).then((res) => {
      const newData = prestamos;
      newData.map((item) => {
        if (prestamo.Codigo === item.Codigo) {
          item.CodigoUsuario = prestamo.CodigoUsuario;
          item.CodigoMoneda = prestamo.CodigoMoneda;
          item.Monto = prestamo.Monto;
          item.SaldoPendiente = prestamo.SaldoPendiente;
          item.TasaInteres = prestamo.TasaInteres;
          item.FechaEmision = prestamo.FechaEmision;
          item.FechaVencimiento = prestamo.FechaVencimiento;
          item.Estado = prestamo.Estado;
        }
        return newData;
      });
      setPrestamos(newData);
      clearPrestamo();
      getPrestamos();
      setModalUpdate(!modalUpdate);
    });
  };

  const handlePutPrestamo = () => {
    if (!prestamo.CodigoUsuario) {
      Swal.fire(
        'Error de ingreso de prestamo',
        'El campo de codigo de usuario esta vacio',
        'error'
      );
    } else if (!prestamo.CodigoMoneda) {
      Swal.fire(
        'Error de ingreso de prestamo',
        'El campo de codigo de moneda esta vacio',
        'error'
      );
    } else if (!prestamo.Monto) {
      Swal.fire(
        'Error de ingreso de prestamo',
        'El campo de monto esta vacio',
        'error'
      );
    } else if (!prestamo.SaldoPendiente) {
        Swal.fire(
          'Error de ingreso de prestamo',
          'El campo de saldo pendiente esta vacio',
          'error'
        );
      } else if (!prestamo.TasaInteres) {
        Swal.fire(
          'Error de ingreso de prestamo',
          'El campo de tasa de interes esta vacio',
          'error'
        );
      } else if (!prestamo.FechaEmision) {
        Swal.fire(
          'Error de ingreso de prestamo',
          'El campo de fecha de emision esta vacio',
          'error'
        );
      } else if (!prestamo.FechaVencimiento) {
        Swal.fire(
          'Error de ingreso de prestamo',
          'El campo de fecha de vencimiento esta vacio',
          'error'
        );
      } else if (!prestamo.Estado) {
        Swal.fire(
          'Error de ingreso de prestamo',
          'El campo de estado esta vacio',
          'error'
        );
      } else {
        putPrestamo();
    }
  };

  const deletePrestamo = async (prestamo) => { 
    if (prestamo.Codigo) {
      await axios.delete(url + prestamo.Codigo, config).then((res) => {
        setPrestamos(prestamos.filter((item) => item.Codigo !== prestamo.Codigo));
        clearPrestamo();
      });
    }
  };

  const handleDeletePrestamo = (prestamo) => {
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
        deletePrestamo(prestamo);
        Swal.fire(
          'Transacción Completa',
          'El prestamo se ha eliminado',
          'success'
        );
      }
    });
  }

  useEffect(() => {
    getPrestamos();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mantenimiento Prestamo</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Codigo Usuario</th>
                      <th>Codigo Moneda</th>
                      <th>Monto</th>
                      <th>Saldo Pendiente</th>
                      <th>Tasa de Interes</th>
                      <th>Fecha Emision</th>
                      <th>Fecha Vencimiento</th>
                      <th>Estado</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prestamos && prestamos.map((prestamo) => {
                        return (prestamo.Estado === "A" &&
                          <tr key={prestamo && prestamo.Codigo}>
                            <td>{prestamo && prestamo.Codigo}</td>
                            <td>{prestamo && prestamo.CodigoUsuario}</td>
                            <td>{prestamo && prestamo.CodigoMoneda}</td>
                            <td>{prestamo && prestamo.Monto}</td>
                            <td>{prestamo && prestamo.SaldoPendiente}</td>
                            <td>{prestamo && prestamo.TasaInteres + "%"}</td>
                            <td>{prestamo && prestamo.FechaEmision}</td>
                            <td>{prestamo && prestamo.FechaVencimiento}</td>
                            <td>{prestamo && prestamo.Estado === "A" ? "Activo" : "Inactivo"}</td>
                            <td>
                              <button className="btn btn-primary" onClick={() => {setPrestamo(prestamo); setModalUpdate(!modalUpdate)}}>Editar</button>
                            </td>
                            <td>
                              <button className="btn btn-danger" onClick={() => handleDeletePrestamo(prestamo)}>Eliminar</button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-outline-secondary btn-lg btn-block" onClick={() => setModalInsert(!modalInsert)}>Ingresar</button>
      </div>

      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Prestamo</h3>
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
            <label>Monto:</label>
            <input
              className="form-control"
              placeholder="Monto"
              name="Monto"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Saldo Pendiente:</label>
            <input
              className="form-control"
              placeholder="Saldo Pendiente"
              name="SaldoPendiente"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Tasa de Interes:</label>
            <input
              className="form-control"
              placeholder="Tasa de Interes"
              name="TasaInteres"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Emision:</label>
            <input
              className="form-control"
              placeholder="Fecha de Emision"
              name="FechaEmision"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Vencimiento:</label>
            <input
              className="form-control"
              placeholder="Fecha de Vencimiento"
              name="FechaVencimiento"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={prestamo && prestamo.Estado}
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
          <Button color="primary" onClick={() => handlePostPrestamo()}>
            Insertar
          </Button>
          <Button color="danger" onClick={() => {setModalInsert(!modalInsert); clearPrestamo()}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Prestamo</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={prestamo && prestamo.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo Usuario"
              value={prestamo && prestamo.CodigoUsuario}
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
              value={prestamo && prestamo.CodigoMoneda}
              name="CodigoMoneda"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Monto:</label>
            <input
              className="form-control"
              placeholder="Correo"
              value={prestamo && prestamo.Monto}
              name="Correo"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Saldo Pendiente:</label>
            <input
              className="form-control"
              placeholder="Saldo Pendiente"
              value={prestamo && prestamo.SaldoPendiente}
              name="SaldoPendiente"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Tasa de Interes:</label>
            <input
              className="form-control"
              placeholder="Tasa de Interes"
              value={prestamo && prestamo.TasaInteres}
              name="TasaInteres"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Emision:</label>
            <input
              className="form-control"
              placeholder="Fecha de Emision"
              value={prestamo && prestamo.FechaEmision}
              name="FechaEmision"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Vencimiento:</label>
            <input
              className="form-control"
              placeholder="Fecha de Vencimiento"
              value={prestamo && prestamo.FechaVencimiento}
              name="FechaVencimiento"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={prestamo && prestamo.Estado}
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
          <Button color="primary" onClick={() => handlePutPrestamo()}>
            Editar
          </Button>
          <Button color="danger" onClick={() => {setModalUpdate(!modalUpdate); clearPrestamo()}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Prestamo;