import React, { useState } from "react";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";
import ModalInsert from "./ModalInsert";
import PrintPrestamo from "./PrintPrestamo";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";

import { usePrestamo } from "../../hooks/usePrestamo";

const Prestamo = () => {
  const emptyPrestamo = {
    Codigo: "",
    CodigoUsuario: "",
    CodigoMoneda: "",
    Monto: "",
    SaldoPendiente: "",
    TasaInteres: "",
    FechaEmision: "",
    FechaVencimiento: "",
    Estado: "",
  };

  const { prestamos, postPrestamo, putPrestamo, deletePrestamo } =
    usePrestamo();
  const [prestamo, setPrestamo] = useState(emptyPrestamo);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [isPDF, setIsPDF] = useState(false);

  const clearPrestamo = () => {
    setPrestamo({ ...emptyPrestamo });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestamo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          "Error de ingreso de prestamo",
          `El campo de ${campo} está vacio`,
          "error"
        )
      : option === 2
      ? Swal.fire(
          "Error de eliminación de prestamo",
          "El prestamo no se ha podido eliminar",
          "error"
        )
      : Swal.fire(
          "Transacción Completa",
          "El prestamo se ha eliminado",
          "success"
        );
  };

  const handlePostPrestamo = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      Monto,
      SaldoPendiente,
      TasaInteres,
      FechaEmision,
      FechaVencimiento,
      Estado,
    } = prestamo;

    !CodigoUsuario
      ? handleError(1, "codigo de usuario")
      : !CodigoMoneda
      ? handleError(1, "codigo de moneda")
      : !Monto
      ? handleError(1, "monto")
      : !SaldoPendiente
      ? handleError(1, "saldo pendiente")
      : !TasaInteres
      ? handleError(1, "tasa de interes")
      : !FechaEmision
      ? handleError(1, "fecha de emision")
      : !FechaVencimiento
      ? handleError(1, "fecha de vencimiento")
      : !Estado
      ? handleError(1, "estado")
      : postPrestamo(prestamo)
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearPrestamo());
  };

  const handlePutPrestamo = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      Monto,
      SaldoPendiente,
      TasaInteres,
      FechaEmision,
      FechaVencimiento,
      Estado,
    } = prestamo;

    !CodigoUsuario
      ? handleError(1, "codigo de usuario")
      : !CodigoMoneda
      ? handleError(1, "codigo de moneda")
      : !Monto
      ? handleError(1, "monto")
      : !SaldoPendiente
      ? handleError(1, "saldo pendiente")
      : !TasaInteres
      ? handleError(1, "tasa de interes")
      : !FechaEmision
      ? handleError(1, "fecha de emision")
      : !FechaVencimiento
      ? handleError(1, "fecha de vencimiento")
      : !Estado
      ? handleError(1, "estado")
      : putPrestamo(prestamo)
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearPrestamo());
  };

  const handleDeletePrestamo = (prestamo) => {
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
        deletePrestamo(prestamo)
          .then(() => clearPrestamo())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isPDF ? (
        <PrintPrestamo
          prestamos={prestamos}
          isPDF={isPDF}
          setIsPDF={setIsPDF}
        />
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Mantenimiento Prestamo</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Codigo Usuario</th>
                        <th>Codigo Moneda</th>
                        <th>Monto</th>
                        <th>Saldo Pendiente</th>
                        <th>Tasa de Interes</th>
                        <th>Fecha Emision</th>
                        <th>Fecha Vencimiento</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prestamos &&
                        prestamos.map((prestamo) => {
                          return (
                            prestamo.Estado === "A" && (
                              <tr key={prestamo && prestamo.Codigo}>
                                <td>{prestamo && prestamo.Codigo}</td>
                                <td>{prestamo && prestamo.CodigoUsuario}</td>
                                <td>{prestamo && prestamo.CodigoMoneda}</td>
                                <td>{prestamo && prestamo.Monto}</td>
                                <td>{prestamo && prestamo.SaldoPendiente}</td>
                                <td>
                                  {prestamo && prestamo.TasaInteres + "%"}
                                </td>
                                <td>{prestamo && prestamo.FechaEmision}</td>
                                <td>{prestamo && prestamo.FechaVencimiento}</td>
                                <td>
                                  {prestamo && prestamo.Estado === "A"
                                    ? "Activo"
                                    : "Inactivo"}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      setPrestamo(prestamo);
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
                                      handleDeletePrestamo(prestamo)
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

          <ExportExcel prestamos={prestamos} />

          <CSVLink className="btn btn-outline-secondary btn-lg btn-block" data={prestamos} filename="Prestamos.csv">Exportar a CSV</CSVLink>
        </div>
      )}

      <ModalInsert
        prestamo={prestamo}
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostPrestamo={handlePostPrestamo}
        setModalInsert={setModalInsert}
        clearPrestamo={clearPrestamo}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        prestamo={prestamo}
        handleChange={handleChange}
        handlePutPrestamo={handlePutPrestamo}
        setModalUpdate={setModalUpdate}
        clearPrestamo={clearPrestamo}
      />
    </>
  );
};

export default Prestamo;
