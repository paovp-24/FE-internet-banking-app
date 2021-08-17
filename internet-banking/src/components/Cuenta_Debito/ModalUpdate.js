import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalUpdate = ({ modalUpdate, cuenta_debito, handleChange, handlePutCuenta_Debito, setModalUpdate, clearCuenta_Debito }) => {
  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Cuenta de Debito</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={cuenta_debito && cuenta_debito.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo Usuario"
              name="CodigoUsuario"
              type="number"
              value={cuenta_debito && cuenta_debito.CodigoUsuario}
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
              value={cuenta_debito && cuenta_debito.CodigoMoneda}
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
              value={cuenta_debito && cuenta_debito.CodigoSucursal}
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
              value={cuenta_debito && cuenta_debito.CodigoTarjeta}
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
              maxLength="50"
              size="50"
              value={cuenta_debito && cuenta_debito.Descripcion}
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
              value={cuenta_debito && cuenta_debito.IBAN}
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
              value={cuenta_debito && cuenta_debito.Saldo}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={cuenta_debito && cuenta_debito.Estado}
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
          <Button color="primary" onClick={() => handlePutCuenta_Debito()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearCuenta_Debito();
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
