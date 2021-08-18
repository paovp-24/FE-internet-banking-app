import React, { useState } from "react";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";
import ModalInsert from "./ModalInsert";
import PrintCuentaCredito from "./PrintCuentaCredito";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";
import { useEstadistica } from '../../hooks/useEstadistica';

import { useCuenta_Credito } from "../../hooks/useCuenta_Credito";
import { useClipboard } from "../../hooks/useClipboard";

const Cuenta_Credito = () => {
  const { postEstadistica } = useEstadistica();
  const emptyCuenta_Credito = {
    Codigo: "",
    CodigoUsuario: "",
    CodigoMoneda: "",
    CodigoSucursal: "",
    CodigoTarjeta: "",
    Descripción: "",
    IBAN: "",
    Saldo: "",
    FechaPago: "",
    PagoMinimo: "",
    PagoContado: "",
    Estado: "",
  };

  const {
    cuentas_credito,
    postCuenta_Credito,
    putCuenta_Credito,
    deleteCuenta_Credito,
  } = useCuenta_Credito();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [cuenta_credito, setCuenta_Credito] = useState(emptyCuenta_Credito);
  const { clipboard } = useClipboard();
  const [isPDF, setIsPDF] = useState(false);

  const clearCuenta_Credito = () => {
    setCuenta_Credito({ ...emptyCuenta_Credito });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuenta_Credito((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          "Error de ingreso de cuenta de credito",
          `El campo de ${campo} está vacio`,
          "error"
        )
      : option === 2
      ? Swal.fire(
          "Error de eliminación de cuenta de credito",
          "La cuenta de credito no se ha podido eliminar",
          "error"
        )
      : Swal.fire(
          "Transacción Completa",
          "La cuenta de credito se ha eliminado",
          "success"
        );
  };

  const handlePostCuenta_Credito = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      CodigoSucursal,
      CodigoTarjeta,
      Descripción,
      IBAN,
      Saldo,
      FechaPago,
      PagoMinimo,
      PagoContado,
      Estado,
    } = cuenta_credito;

    !CodigoUsuario
      ? handleError(1, "codigo de usuario")
      : !CodigoMoneda
      ? handleError(1, "codigo de moneda")
      : !CodigoSucursal
      ? handleError(1, "codigo de sucursal")
      : !CodigoTarjeta
      ? handleError(1, "codigo de tarjeta")
      : !Descripción
      ? handleError(1, "descripción")
      : !IBAN
      ? handleError(1, "IBAN")
      : !Saldo
      ? handleError(1, "saldo")
      : !FechaPago
      ? handleError(1, "fecha de pago")
      : !PagoMinimo
      ? handleError(1, "pago minimo")
      : !PagoContado
      ? handleError(1, "pago de contado")
      : !Estado
      ? handleError(1, "estado")
      : postCuenta_Credito(cuenta_credito)
      .then(() => postEstadistica(localStorage.getItem("Codigo"),'Cuenta_Credito', 'Ingresar Cuenta Credito'))
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearCuenta_Credito());
  };

  const handlePutCuenta_Credito = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      CodigoSucursal,
      CodigoTarjeta,
      Descripción,
      IBAN,
      Saldo,
      FechaPago,
      PagoMinimo,
      PagoContado,
      Estado,
    } = cuenta_credito;

    !CodigoUsuario
      ? handleError(1, "codigo de usuario")
      : !CodigoMoneda
      ? handleError(1, "codigo de moneda")
      : !CodigoSucursal
      ? handleError(1, "codigo de sucursal")
      : !CodigoTarjeta
      ? handleError(1, "codigo de tarjeta")
      : !Descripción
      ? handleError(1, "descripción")
      : !IBAN
      ? handleError(1, "IBAN")
      : !Saldo
      ? handleError(1, "saldo")
      : !FechaPago
      ? handleError(1, "fecha de pago")
      : !PagoMinimo
      ? handleError(1, "pago minimo")
      : !PagoContado
      ? handleError(1, "pago de contado")
      : !Estado
      ? handleError(1, "estado")
      : putCuenta_Credito(cuenta_credito)
      .then(() => postEstadistica(localStorage.getItem("Codigo"),'Cuenta_Credito', 'Actualizar Cuenta Credito'))
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearCuenta_Credito());
  };

  const handleDeleteCuenta_Credito = (cuenta_credito) => {
    Swal.fire({
      title: "Esta seguro de eliminar?",
      text: "Esta accion no se puede devolver!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        deleteCuenta_Credito(cuenta_credito)
        .then(() => postEstadistica(localStorage.getItem("Codigo"),'Cuenta_Credito', 'Eliminar Cuenta Credito'))
          .then(() => clearCuenta_Credito())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isPDF ? (
        <PrintCuentaCredito cuentas_credito={cuentas_credito} isPDF={isPDF} setIsPDF={setIsPDF} />
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Mantenimiento Cuenta de Credito</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Codigo Usuario</th>
                        <th>Codigo Moneda</th>
                        <th>Codigo Sucursal</th>
                        <th>Codigo Tarjeta</th>
                        <th>Descripción</th>
                        <th>IBAN</th>
                        <th>Saldo</th>
                        <th>Fecha de Pago</th>
                        <th>Pago Minimo</th>
                        <th>Pago Contado</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cuentas_credito &&
                        cuentas_credito.map((cuenta_credito) => {
                          return (
                            cuenta_credito.Estado === "A" && (
                              <tr key={cuenta_credito && cuenta_credito.Codigo}>
                                <td>
                                  {cuenta_credito && cuenta_credito.Codigo}
                                </td>
                                <td>
                                  {cuenta_credito &&
                                    cuenta_credito.CodigoUsuario}
                                </td>
                                <td>
                                  {cuenta_credito &&
                                    cuenta_credito.CodigoMoneda}
                                </td>
                                <td>
                                  {cuenta_credito &&
                                    cuenta_credito.CodigoSucursal}
                                </td>
                                <td>
                                  {cuenta_credito &&
                                    cuenta_credito.CodigoTarjeta}
                                </td>
                                <td>
                                  {cuenta_credito && cuenta_credito.Descripción}
                                </td>
                                <td>{cuenta_credito && cuenta_credito.IBAN}</td>
                                <td>
                                  {cuenta_credito && cuenta_credito.Saldo}
                                </td>
                                <td>
                                  {cuenta_credito && cuenta_credito.FechaPago}
                                </td>
                                <td>
                                  {cuenta_credito && cuenta_credito.PagoMinimo}
                                </td>
                                <td>
                                  {cuenta_credito && cuenta_credito.PagoContado}
                                </td>
                                <td>
                                  {cuenta_credito &&
                                  cuenta_credito.Estado === "A"
                                    ? "Activo"
                                    : "Inactivo"}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      setCuenta_Credito(cuenta_credito);
                                      setModalUpdate(!modalUpdate);
                                    }}
                                  >
                                    Editar
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleDeleteCuenta_Credito(cuenta_credito)
                                    }
                                  >
                                    Eliminar
                                  </button>
                                </td>
                              </tr>
                            )
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={() => setModalInsert(!modalInsert)}
          >
            Ingresar
          </button>
          <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={() => {setIsPDF(!isPDF); postEstadistica(localStorage.getItem("Codigo"),'Cuenta_Credito', 'Exportar excel') }}
          >
            Guardar en PDF
          </button>

          <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={ () => {clipboard(); postEstadistica(localStorage.getItem("Codigo"),'Cuenta_Credito', 'Copiar al portapapeles')}}
          >
            Guardar en Portapapeles
          </button>

          <ExportExcel cuentas_credito={cuentas_credito} onClick ={() =>  postEstadistica(localStorage.getItem("Codigo"),'Cuenta_Credito', 'Exportar excel') }/>

          <CSVLink className="btn btn-outline-secondary btn-lg btn-block" data={cuentas_credito} onClick  ={() =>  postEstadistica(localStorage.getItem("Codigo"),'Cuenta_Credito', 'Exportar csv') } filename="Cuenta_Credito.csv">Exportar a CSV</CSVLink>
        </div>
      )}

      <ModalInsert
        cuenta_credito={cuenta_credito}
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostCuenta_Credito={handlePostCuenta_Credito}
        setModalInsert={setModalInsert}
        clearCuenta_Credito={clearCuenta_Credito}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        cuenta_credito={cuenta_credito}
        handleChange={handleChange}
        handlePutCuenta_Credito={handlePutCuenta_Credito}
        setModalUpdate={setModalUpdate}
        clearCuenta_Credito={clearCuenta_Credito}
      />
    </>
  );
};

export default Cuenta_Credito;
