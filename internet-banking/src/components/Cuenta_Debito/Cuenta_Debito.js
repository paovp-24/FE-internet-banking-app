import React, { useState } from "react";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";
import ModalInsert from "./ModalInsert";
import PrintCuentaDebito from "./PrintCuentaDebito";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";

import { useCuenta_Debito } from "../../hooks/useCuenta_Debito";
import { useClipboard } from "../../hooks/useClipboard";

const Cuenta_Debito = () => {
  const emptyCuenta_Debito = {
    Codigo: "",
    CodigoUsuario: "",
    CodigoMoneda: "",
    CodigoSucursal: "",
    CodigoTarjeta: "",
    Descripcion: "",
    IBAN: "",
    Saldo: "",
    Estado: "",
  };

  const {
    cuentas_debito,
    postCuenta_Debito,
    putCuenta_Debito,
    deleteCuenta_Debito,
  } = useCuenta_Debito();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [cuenta_debito, setCuenta_Debito] = useState(emptyCuenta_Debito);
  const { clipboard } = useClipboard();
  const [isPDF, setIsPDF] = useState(false);

  const clearCuenta_Debito = () => {
    setCuenta_Debito({ ...emptyCuenta_Debito });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuenta_Debito((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          "Error de ingreso de cuenta de debito",
          `El campo de ${campo} está vacio`,
          "error"
        )
      : option === 2
      ? Swal.fire(
          "Error de eliminación de cuenta de debito",
          "La cuenta de debito no se ha podido eliminar",
          "error"
        )
      : Swal.fire(
          "Transacción Completa",
          "La cuenta de debito se ha eliminado",
          "success"
        );
  };

  const handlePostCuenta_Debito = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      CodigoSucursal,
      CodigoTarjeta,
      Descripcion,
      IBAN,
      Saldo,
      Estado,
    } = cuenta_debito;

    !CodigoUsuario
      ? handleError(1, "codigo de usuario")
      : !CodigoMoneda
      ? handleError(1, "codigo de moneda")
      : !CodigoSucursal
      ? handleError(1, "codigo de sucursal")
      : !CodigoTarjeta
      ? handleError(1, "codigo de tarjeta")
      : !Descripcion
      ? handleError(1, "descripción")
      : !IBAN
      ? handleError(1, "IBAN")
      : !Saldo
      ? handleError(1, "saldo")
      : !Estado
      ? handleError(1, "estado")
      : postCuenta_Debito(cuenta_debito)
      .then(() => setModalInsert(!modalInsert))
      .then(() => clearCuenta_Debito());
  };

  const handlePutCuenta_Debito = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      CodigoSucursal,
      CodigoTarjeta,
      Descripcion,
      IBAN,
      Saldo,
      Estado,
    } = cuenta_debito;

    !CodigoUsuario
      ? handleError(1, "codigo de usuario")
      : !CodigoMoneda
      ? handleError(1, "codigo de moneda")
      : !CodigoSucursal
      ? handleError(1, "codigo de sucursal")
      : !CodigoTarjeta
      ? handleError(1, "codigo de tarjeta")
      : !Descripcion
      ? handleError(1, "descripción")
      : !IBAN
      ? handleError(1, "IBAN")
      : !Saldo
      ? handleError(1, "saldo")
      : !Estado
      ? handleError(1, "estado")
      : putCuenta_Debito(cuenta_debito)
      .then(() => setModalUpdate(!modalUpdate))
      .then(() => clearCuenta_Debito());
  };

  const handleDeleteCuenta_Debito = (cuenta_debito) => {
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
        deleteCuenta_Debito(cuenta_debito)
        .then(() => clearCuenta_Debito())
        .then(() => handleError(3))
        .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isPDF ? (
        <PrintCuentaDebito
          cuentas_debito={cuentas_debito}
          isPDF={isPDF}
          setIsPDF={setIsPDF}
        />
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Mantenimiento Cuenta de Debito</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Codigo Usuario</th>
                        <th>Codigo Moneda</th>
                        <th>Codigo Sucursal</th>
                        <th>Codigo Tarjeta</th>
                        <th>Descripcion</th>
                        <th>IBAN</th>
                        <th>Saldo</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cuentas_debito &&
                        cuentas_debito.map((cuenta_debito) => {
                          return (
                            cuenta_debito.Estado === "A" && (
                              <tr key={cuenta_debito && cuenta_debito.Codigo}>
                                <td>{cuenta_debito && cuenta_debito.Codigo}</td>
                                <td>
                                  {cuenta_debito && cuenta_debito.CodigoUsuario}
                                </td>
                                <td>
                                  {cuenta_debito && cuenta_debito.CodigoMoneda}
                                </td>
                                <td>
                                  {cuenta_debito &&
                                    cuenta_debito.CodigoSucursal}
                                </td>
                                <td>
                                  {cuenta_debito && cuenta_debito.CodigoTarjeta}
                                </td>
                                <td>
                                  {cuenta_debito && cuenta_debito.Descripcion}
                                </td>
                                <td>{cuenta_debito && cuenta_debito.IBAN}</td>
                                <td>{cuenta_debito && cuenta_debito.Saldo}</td>
                                <td>
                                  {cuenta_debito && cuenta_debito.Estado === "A"
                                    ? "Activo"
                                    : "Inactivo"}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      setCuenta_Debito(cuenta_debito);
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
                                      handleDeleteCuenta_Debito(cuenta_debito)
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
            onClick={() => setIsPDF(!isPDF)}
          >
            Guardar en PDF
          </button>

          <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={clipboard}
          >
            Guardar en Portapapeles
          </button>

          <ExportExcel cuentas_debito={cuentas_debito} />

          <CSVLink className="btn btn-outline-secondary btn-lg btn-block" data={cuentas_debito} filename="Cuentas_Debito.csv">Exportar a CSV</CSVLink>
        </div>
      )}

      <ModalInsert
        cuenta_debito={cuenta_debito}
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostCuenta_Debito={handlePostCuenta_Debito}
        setModalInsert={setModalInsert}
        clearCuenta_Debito={clearCuenta_Debito}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        cuenta_debito={cuenta_debito}
        handleChange={handleChange}
        handlePutCuenta_Debito={handlePutCuenta_Debito}
        setModalUpdate={setModalUpdate}
        clearCuenta_Debito={clearCuenta_Debito}
      />
    </>
  );
};

export default Cuenta_Debito;
