import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalInsert = ({ modalInsert, handleChange, handlePostInversion, setModalInsert, clearInversion }) => {
  return (
    <>
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Inversion</h3>
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
            <label>Codigo de Moneda:</label>
            <input
              className="form-control"
              placeholder="Codigo de Moneda"
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
            <label>Interes:</label>
            <input
              className="form-control"
              placeholder="Interes"
              name="Interes"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Liquidez:</label>
            <input
              className="form-control"
              placeholder="Liquidez"
              name="Liquidez"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePostInversion()}>
            Insertar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearInversion();
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
