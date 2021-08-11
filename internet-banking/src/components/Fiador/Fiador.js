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

import { useFiador } from '../../hooks/useFiador';

const Fiador = () => {
  const emptyFiador = {
    Codigo: '',
    CodigoPrestamo: '',
    Cedula: '',
    Nombre: '',
    Apellidos: '',
    Ocupacion: '',
  };

  const { fiadores, postFiador, putFiador, deleteFiador } = useFiador();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [fiador, setFiador] = useState(emptyFiador);

  const clearFiador = () => {
    setFiador({ ...emptyFiador });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiador((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1 ? Swal.fire("Error de ingreso de fiador", `El campo de ${campo} está vacio`,"error") :
    option === 2 ? Swal.fire("Error de eliminación de fiador", "El fiador no se ha podido eliminar", "error") :
    Swal.fire("Transacción Completa", "El fiador se ha eliminado", "success")
  };

  const handlePostFiador = () => {
    if (!fiador.CodigoPrestamo) {
      Swal.fire(
        'Error de ingreso de fiador',
        'El campo de codigo de prestamo esta vacio',
        'error'
      );
    } else if (!fiador.Cedula) {
      Swal.fire(
        'Error de ingreso de fiador',
        'El campo de cedula esta vacio',
        'error'
      );
    } else if (!fiador.Nombre) {
      Swal.fire(
        'Error de ingreso de fiador',
        'El campo de nombre esta vacio',
        'error'
      );
    } else if (!fiador.Apellidos) {
      Swal.fire(
        'Error de ingreso de fiador',
        'El campo de apellidos esta vacio',
        'error'
      );
    } else if (!fiador.Ocupacion) {
      Swal.fire(
        'Error de ingreso de fiador',
        'El campo de ocupacion esta vacio',
        'error'
      );
    } else {
      postFiador(fiador)
      .then(() => setModalInsert(!modalInsert))
      .then(() => clearFiador());
    }
  };

  const handlePutFiador = () => {
    if (!fiador.CodigoPrestamo) {
      Swal.fire(
        'Error de ingreso de fiador',
        'El campo de codigo de prestamo esta vacio',
        'error'
      );
    } else if (!fiador.Cedula) {
      Swal.fire(
        'Error de ingreso de fiador',
        'El campo de cedula esta vacio',
        'error'
      );
    } else if (!fiador.Nombre) {
      Swal.fire(
        'Error de ingreso de fiador',
        'El campo de nombre esta vacio',
        'error'
      );
    } else if (!fiador.Apellidos) {
      Swal.fire(
        'Error de ingreso de fiador',
        'El campo de apellidos esta vacio',
        'error'
      );
    } else if (!fiador.Ocupacion) {
      Swal.fire(
        'Error de ingreso de fiador',
        'El campo de ocupacion esta vacio',
        'error'
      );
    } else {
      putFiador(fiador)
      .then(() => setModalUpdate(!modalUpdate))
      .then(() => clearFiador());
    }
  };

  const handleDeleteFiador = (fiador) => {
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
        deleteFiador(fiador)
        .then(() => clearFiador());
        Swal.fire(
          'Transacción Completa',
          'El fiador se ha eliminado',
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
              <h4 className="card-title">Mantenimiento Fiador</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Codigo de Prestamo</th>
                      <th>Cedula</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Ocupacion</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fiadores &&
                      fiadores.map((fiador) => {
                        return (
                          <tr key={fiador && fiador.Codigo}>
                            <td>{fiador && fiador.Codigo}</td>
                            <td>{fiador && fiador.CodigoPrestamo}</td>
                            <td>{fiador && fiador.Cedula}</td>
                            <td>{fiador && fiador.Nombre}</td>
                            <td>{fiador && fiador.Apellidos}</td>
                            <td>{fiador && fiador.Ocupacion}</td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  setFiador(fiador);
                                  setModalUpdate(!modalUpdate);
                                }}
                              >
                                Editar
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteFiador(fiador)}
                              >
                                Eliminar
                              </button>
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
            <h3>Insertar Fiador</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo de Prestamo:</label>
            <input
              className="form-control"
              placeholder="Codigo de Prestamo"
              name="CodigoPrestamo"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Cedula:</label>
            <input
              className="form-control"
              placeholder="Cedula"
              name="Cedula"
              type="text"
              maxLength="50"
              size="50"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              placeholder="Nombre"
              name="Nombre"
              type="text"
              maxLength="50"
              size="50"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Apellidos:</label>
            <input
              className="form-control"
              placeholder="Apellidos"
              name="Apellidos"
              type="text"
              maxLength="50"
              size="50"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Ocupacion:</label>
            <input
              className="form-control"
              placeholder="Ocupacion"
              name="Ocupacion"
              type="text"
              maxLength="50"
              size="50"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePostFiador()}>
            Insertar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearFiador();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Fiador</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={fiador && fiador.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo de Prestamo:</label>
            <input
              className="form-control"
              placeholder="Codigo de Prestamo"
              name="CodigoPrestamo"
              type="number"
              value={fiador && fiador.CodigoPrestamo}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Cedula:</label>
            <input
              className="form-control"
              placeholder="Cedula"
              name="Cedula"
              type="text"
              maxLength="50"
              size="50"
              value={fiador && fiador.Cedula}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              placeholder="Nombre"
              name="Nombre"
              type="text"
              maxLength="50"
              size="50"
              value={fiador && fiador.Nombre}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Apellidos:</label>
            <input
              className="form-control"
              placeholder="Apellidos"
              name="Apellidos"
              type="text"
              maxLength="50"
              size="50"
              value={fiador && fiador.Apellidos}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Ocupacion:</label>
            <input
              className="form-control"
              placeholder="Ocupacion"
              name="Ocupacion"
              type="text"
              maxLength="50"
              size="50"
              value={fiador && fiador.Ocupacion}
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutFiador()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearFiador();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Fiador;
