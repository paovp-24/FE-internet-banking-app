import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalUpdate = ({ modalUpdate, emisor, handleChange, handlePutEmisor, setModalUpdate, clearEmisor }) => {
  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Emisor</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={emisor && emisor.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>
            <input
              className="form-control"
              name="Descripcion"
              type="text"
              maxLength="50"
              size="50"
              value={emisor && emisor.Descripcion}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Prefijo:</label>
            <input
              className="form-control"
              name="Prefijo"
              type="text"
              maxLength="10"
              size="10"
              value={emisor && emisor.Prefijo}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Numero de Digitos:</label>
            <input
              className="form-control"
              name="NumeroDigitos"
              type="number"
              value={emisor && emisor.NumeroDigitos}
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutEmisor()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
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

export default ModalUpdate;
