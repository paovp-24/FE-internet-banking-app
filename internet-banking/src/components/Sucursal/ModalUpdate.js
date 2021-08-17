import React from "react";

import { Form } from 'react-bootstrap';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalUpdate = ({ modalUpdate, sucursal, handleChange, handlePutSucursal, setModalUpdate, clearSucursal }) => {
  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Sucursal</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={sucursal && sucursal.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <Form.Group>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                maxLength="100"
                size="100"
                value={sucursal && sucursal.Nombre}
                onChange={handleChange}
              />
            </Form.Group>
          </FormGroup>

          <FormGroup>
            <Form.Group>
              <label>Ubicacion:</label>
              <input
                className="form-control"
                name="Ubicacion"
                type="text"
                maxLength="100"
                size="100"
                value={sucursal && sucursal.Ubicacion}
                onChange={handleChange}
              />
            </Form.Group>
          </FormGroup>

          <FormGroup>
            <Form.Group>
              <label>Correo:</label>
              <input
                className="form-control"
                name="Correo"
                type="text"
                value={sucursal && sucursal.Correo}
                maxLength="50"
                size="50"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <label>Telefono:</label>
              <input
                className="form-control"
                name="Telefono"
                type="number"
                value={sucursal && sucursal.Telefono}
                onChange={handleChange}
              />
            </Form.Group>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutSucursal()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearSucursal();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalUpdate;
