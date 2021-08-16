import React from 'react';

import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    FormGroup,
    ModalFooter,
  } from "reactstrap";

const ModalInsert = ({ modalInsert, handleChange, handlePostFiador, setModalInsert, clearFiador }) => {
  return (
    <>
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
    </>
  );
};

export default ModalInsert;
