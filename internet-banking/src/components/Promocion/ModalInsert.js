import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalInsert = ({ modalInsert, handleChange, handlePostPromocion, setModalInsert, clearPromocion }) => {
  return (
    <>
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Promocion</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo de Emisor:</label>
            <input
              className="form-control"
              placeholder="Codigo de Emisor"
              name="CodigoEmisor"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Empresa:</label>
            <input
              className="form-control"
              placeholder="Empresa"
              name="Empresa"
              type="text"
              maxLength="50"
              size="50"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Inicio:</label>
            <input
              className="form-control"
              placeholder="Fecha de Inicio"
              name="FechaInicio"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Finalizacion:</label>
            <input
              className="form-control"
              placeholder="Fecha de Finalizacion"
              name="FechaFinalizacion"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descuento:</label>
            <input
              className="form-control"
              placeholder="Descuento"
              name="Descuento"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePostPromocion()}>
            Insertar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearPromocion();
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
