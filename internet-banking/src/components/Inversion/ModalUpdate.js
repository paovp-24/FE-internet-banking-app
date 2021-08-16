import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalUpdate = ({ modalUpdate, inversion, handleChange, handlePutInversion, setModalUpdate, clearInversion }) => {
  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Inversion</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={inversion && inversion.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo de Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo de Usuario"
              name="CodigoUsuario"
              type="number"
              value={inversion && inversion.CodigoUsuario}
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
              value={inversion && inversion.CodigoMoneda}
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
              value={inversion && inversion.Monto}
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
              value={inversion && inversion.Interes}
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
              value={inversion && inversion.liquidez}
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutInversion()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
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

export default ModalUpdate;