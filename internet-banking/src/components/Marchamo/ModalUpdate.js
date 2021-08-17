import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalUpdate = ({
  modalUpdate,
  marchamo,
  handleChange,
  handlePutMarchamo,
  setModalUpdate,
  clearMarchamo,
}) => {
  return (
    <>
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
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearMarchamo();
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
