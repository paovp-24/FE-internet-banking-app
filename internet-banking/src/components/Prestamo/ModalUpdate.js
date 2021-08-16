import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalUpdate = ({ modalUpdate, prestamo, handleChange, handlePutPrestamo, setModalUpdate, clearPrestamo }) => {
  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Prestamo</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={prestamo && prestamo.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo Usuario"
              value={prestamo && prestamo.CodigoUsuario}
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
              value={prestamo && prestamo.CodigoMoneda}
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
              value={prestamo && prestamo.Monto}
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
              value={prestamo && prestamo.SaldoPendiente}
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
              value={prestamo && prestamo.TasaInteres}
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
              value={prestamo && prestamo.FechaEmision}
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
              value={prestamo && prestamo.FechaVencimiento}
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
          <Button color="primary" onClick={() => handlePutPrestamo()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
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

export default ModalUpdate;
