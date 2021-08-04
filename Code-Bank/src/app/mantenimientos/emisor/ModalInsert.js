import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalInsert = ({ modalInsert, handleChange, handlePostEmisor, setModalInsert, clearEmisor }) => {
  return (
    <>
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Emisor</h3>
          </div>
        </ModalHeader>

        <ModalBody>
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
            <label>Prefijo:</label>
            <input
              className="form-control"
              placeholder="Prefijo"
              name="Prefijo"
              type="text"
              maxLength="10"
              size="10"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Numero de Digitos:</label>
            <input
              className="form-control"
              placeholder="Numero de Digitos"
              name="NumeroDigitos"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePostEmisor()}>
            Insertar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearEmisor();
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
