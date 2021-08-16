import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalInsert = ({ prestamo, modalInsert, handleChange, handlePostPrestamo, setModalInsert, clearPrestamo }) => {
  return (
    <>
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Prestamo</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo Usuario"
              name="CodigoUsuario"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Moneda:</label>
            <input
              className="form-control"
              placeholder="Codigo Moneda"
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
            <label>Saldo Pendiente:</label>
            <input
              className="form-control"
              placeholder="Saldo Pendiente"
              name="SaldoPendiente"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Tasa de Interes:</label>
            <input
              className="form-control"
              placeholder="Tasa de Interes"
              name="TasaInteres"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Emision:</label>
            <input
              className="form-control"
              placeholder="Fecha de Emision"
              name="FechaEmision"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Vencimiento:</label>
            <input
              className="form-control"
              placeholder="Fecha de Vencimiento"
              name="FechaVencimiento"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={prestamo && prestamo.Estado}
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
          <Button color="primary" onClick={() => handlePostPrestamo()}>
            Insertar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearPrestamo();
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
