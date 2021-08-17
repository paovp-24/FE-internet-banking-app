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
  propiedad,
  handleChange,
  handlePutPropiedad,
  setModalUpdate,
  clearPropiedad,
}) => {
  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Propiedad</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={propiedad && propiedad.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo de Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo de Usuario"
              name="CodigoUsuario"
              type="number"
              value={propiedad && propiedad.CodigoUsuario}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Ubicacion:</label>
            <input
              className="form-control"
              placeholder="Ubicacion"
              name="Ubicacion"
              type="text"
              maxLength="100"
              size="100"
              value={propiedad && propiedad.Ubicacion}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Dimension:</label>
            <input
              className="form-control"
              placeholder="Dimension"
              name="Dimension"
              type="text"
              maxLength="50"
              size="50"
              value={propiedad && propiedad.Dimension}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>
            <input
              className="form-control"
              placeholder="Descripcion"
              name="Descripcion"
              type="text"
              maxLength="100"
              size="100"
              value={propiedad && propiedad.Descripcion}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={propiedad && propiedad.Estado}
              name="Estado"
              type="text"
              onChange={handleChange}
            >
              <option value="">Seleccione un Estado</option>
              <option value="I">Inactivo</option>
              <option value="A">Activo</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Precio Fiscal:</label>
            <input
              className="form-control"
              placeholder="Precio Fiscal"
              name="PrecioFiscal"
              type="number"
              step="0.01"
              value={propiedad && propiedad.PrecioFiscal}
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutPropiedad()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearPropiedad();
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
