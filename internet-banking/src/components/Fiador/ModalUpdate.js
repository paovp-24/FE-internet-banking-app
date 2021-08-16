import React from 'react';

import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    FormGroup,
    ModalFooter,
  } from "reactstrap";

const ModalUpdate = ({ modalUpdate, fiador, handleChange, handlePutFiador, setModalUpdate, clearFiador }) => {
    return (
        <>
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
        </>
    );
}

export default ModalUpdate;