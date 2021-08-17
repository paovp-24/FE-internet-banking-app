import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalUpdate = ({ modalUpdate, promocion, handleChange, handlePutPromocion, setModalUpdate, clearPromocion }) => {
  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Promocion</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={promocion && promocion.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo de Emisor:</label>
            <input
              className="form-control"
              placeholder="Codigo de Emisor"
              value={promocion && promocion.CodigoEmisor}
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
              value={promocion && promocion.Empresa}
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
              value={promocion && promocion.FechaInicio}
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
              value={promocion && promocion.FechaFinalizacion}
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
              value={promocion && promocion.Descuento}
              name="Descuento"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutPromocion()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
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

export default ModalUpdate;
