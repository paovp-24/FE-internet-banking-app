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

import { useMarchamo } from '../../hooks/useMarchamo';

const Marchamo = () => {
  const emptyMarchamo = {
    Codigo: '',
    CodigoUsuario: '',
    Placa: '',
    Monto: '',
    FechaLimite: '',
    Estado: ''
  };

  const { marchamos, postMarchamo, putMarchamo, deleteMarchamo } = useMarchamo();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [marchamo, setMarchamo] = useState(emptyMarchamo);

  const clearMarchamo = () => {
    setMarchamo({ ...emptyMarchamo });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarchamo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePostMarchamo = () => {
    if (!marchamo.CodigoUsuario) {
      Swal.fire(
        'Error de ingreso de marchamo',
        'El campo de codigo de usuario esta vacio',
        'error'
      );
    } else if (!marchamo.Placa) {
      Swal.fire(
        'Error de ingreso de marchamo',
        'El campo de placa esta vacio',
        'error'
      );
    } else if (!marchamo.Monto) {
      Swal.fire(
        'Error de ingreso de marchamo',
        'El campo de monto esta vacio',
        'error'
      );
    } else if (!marchamo.FechaLimite) {
        Swal.fire(
          'Error de ingreso de marchamo',
          'El campo de fecha limite esta vacio',
          'error'
        );
      } else if (!marchamo.Estado) {
        Swal.fire(
          'Error de ingreso de marchamo',
          'El campo de estado esta vacio',
          'error'
        );
      } else {
      postMarchamo(marchamo)
      .then(() => setModalInsert(!modalInsert))
      .then(() => clearMarchamo());
    }
  };

  
  const handlePutMarchamo = () => {
    if (!marchamo.CodigoUsuario) {
      Swal.fire(
        'Error de ingreso de marchamo',
        'El campo de codigo de usuario esta vacio',
        'error'
      );
    } else if (!marchamo.Placa) {
      Swal.fire(
        'Error de ingreso de marchamo',
        'El campo de placa esta vacio',
        'error'
      );
    } else if (!marchamo.Monto) {
      Swal.fire(
        'Error de ingreso de marchamo',
        'El campo de monto esta vacio',
        'error'
      );
    } else if (!marchamo.FechaLimite) {
        Swal.fire(
          'Error de ingreso de marchamo',
          'El campo de fecha limite esta vacio',
          'error'
        );
      } else if (!marchamo.Estado) {
        Swal.fire(
          'Error de ingreso de marchamo',
          'El campo de estado esta vacio',
          'error'
        );
      } else {
        putMarchamo(marchamo)
        .then(() => setModalUpdate(!modalUpdate))
        .then(() => clearMarchamo());
    }
  };

  const handleDeleteMarchamo = (marchamo) => {
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
        deleteMarchamo(marchamo)
        .then(() => clearMarchamo());
        Swal.fire(
          'Transacción Completa',
          'El marchamo se ha eliminado',
          'success'
        );
      }
    });
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mantenimiento Marchamo</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Codigo de Usuario</th>
                      <th>Placa</th>
                      <th>Monto</th>
                      <th>Fecha Limite</th>
                      <th>Estado</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marchamos && marchamos.map((marchamo) => {
                        return (marchamo.Estado === "A" &&
                          <tr key={marchamo && marchamo.Codigo}>
                            <td>{marchamo && marchamo.Codigo}</td>
                            <td>{marchamo && marchamo.CodigoUsuario}</td>
                            <td>{marchamo && marchamo.Placa}</td>
                            <td>{marchamo && marchamo.Monto}</td>
                            <td>{marchamo && marchamo.FechaLimite}</td>
                            <td>{marchamo && marchamo.Estado === "A" ? "Activo" : "Inactivo"}</td>
                            <td>
                              <button className="btn btn-primary" onClick={() => {setMarchamo(marchamo); setModalUpdate(!modalUpdate)}}>Editar</button>
                            </td>
                            <td>
                              <button className="btn btn-danger" onClick={() => handleDeleteMarchamo(marchamo)}>Eliminar</button>
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
            <h3>Insertar Marchamo</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo de Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo de Usuario"
              name="CodigoUsuario"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Placa:</label>
            <input
              className="form-control"
              placeholder="Placa"
              name="Placa"
              type="text"
              maxLength="10"
              size="10"
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
            <label>Fecha Limite:</label>
            <input
              className="form-control"
              placeholder="Fecha Limite"
              name="FechaLimite"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={marchamo && marchamo.Estado}
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
          <Button color="primary" onClick={() => handlePostMarchamo()}>
            Insertar
          </Button>
          <Button color="danger" onClick={() => {setModalInsert(!modalInsert); clearMarchamo()}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Marchamo</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={marchamo && marchamo.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo de Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo de Usuario"
              name="CodigoUsuario"
              type="number"
              value={marchamo && marchamo.CodigoUsuario}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Placa:</label>
            <input
              className="form-control"
              placeholder="Placa"
              name="Placa"
              type="text"
              maxLength="10"
              size="10"
              value={marchamo && marchamo.Placa}
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
              value={marchamo && marchamo.Monto}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha Limite:</label>
            <input
              className="form-control"
              placeholder="Fecha Limite"
              name="FechaLimite"
              type="date"
              value={marchamo && marchamo.FechaLimite}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={marchamo && marchamo.Estado}
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
          <Button color="primary" onClick={() => handlePutMarchamo()}>
            Editar
          </Button>
          <Button color="danger" onClick={() => {setModalUpdate(!modalUpdate); clearMarchamo()}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Marchamo;