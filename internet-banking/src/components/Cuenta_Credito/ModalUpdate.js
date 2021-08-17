import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalUpdate = ({ modalUpdate, cuenta_credito, handleChange, handlePutCuenta_Credito, setModalUpdate, clearCuenta_Credito }) => {
  return (
    <Modal isOpen={modalUpdate}>
      <ModalHeader>
        <div>
          <h3>Editar Cuenta de Credito</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>Codigo:</label>
          <input
            className="form-control"
            readOnly
            type="text"
            value={cuenta_credito && cuenta_credito.Codigo}
          />
        </FormGroup>

        <FormGroup>
          <label>Codigo Usuario:</label>
          <input
            className="form-control"
            placeholder="Codigo Usuario"
            name="CodigoUsuario"
            type="number"
            value={cuenta_credito && cuenta_credito.CodigoUsuario}
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
            value={cuenta_credito && cuenta_credito.CodigoMoneda}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Codigo Sucursal:</label>
          <input
            className="form-control"
            placeholder="Codigo Sucursal"
            name="CodigoSucursal"
            type="number"
            value={cuenta_credito && cuenta_credito.CodigoSucursal}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Codigo Tarjeta:</label>
          <input
            className="form-control"
            placeholder="Codigo Tarjeta"
            name="CodigoTarjeta"
            type="number"
            value={cuenta_credito && cuenta_credito.CodigoTarjeta}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Descripción:</label>
          <input
            className="form-control"
            placeholder="Descripción"
            name="Descripción"
            type="text"
            maxLength="50"
            size="50"
            value={cuenta_credito && cuenta_credito.Descripción}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>IBAN:</label>
          <input
            className="form-control"
            placeholder="IBAN"
            name="IBAN"
            type="text"
            maxLength="22"
            size="22"
            value={cuenta_credito && cuenta_credito.IBAN}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Saldo:</label>
          <input
            className="form-control"
            placeholder="Saldo"
            name="Saldo"
            type="number"
            step="0.01"
            value={cuenta_credito && cuenta_credito.Saldo}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Fecha de Pago:</label>
          <input
            className="form-control"
            placeholder="Fecha de Pago"
            name="FechaPago"
            type="date"
            value={cuenta_credito && cuenta_credito.FechaPago}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Pago Minimo:</label>
          <input
            className="form-control"
            placeholder="Pago Minimo"
            name="PagoMinimo"
            type="number"
            step="0.01"
            value={cuenta_credito && cuenta_credito.PagoMinimo}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Pago Contado:</label>
          <input
            className="form-control"
            placeholder="Pago Contado"
            name="PagoContado"
            type="number"
            step="0.01"
            value={cuenta_credito && cuenta_credito.PagoContado}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Estado:</label>
          <select
            className="form-control"
            value={cuenta_credito && cuenta_credito.Estado}
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
        <Button color="primary" onClick={() => handlePutCuenta_Credito()}>
          Editar
        </Button>
        <Button
          color="danger"
          onClick={() => {
            setModalUpdate(!modalUpdate);
            clearCuenta_Credito();
          }}
        >
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalUpdate;
