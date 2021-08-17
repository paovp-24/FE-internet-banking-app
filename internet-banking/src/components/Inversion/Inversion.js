import React, { useState } from "react";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";
import ModalInsert from "./ModalInsert";
import PrintInversion from "./PrintInversion";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";

import { useInversion } from "../../hooks/useInversion";
import { useClipboard } from "../../hooks/useClipboard";

const Inversion = () => {
  const emptyInversion = {
    Codigo: "",
    CodigoUsuario: "",
    CodigoMoneda: "",
    Monto: "",
    Interes: "",
    Liquidez: "",
  };

  const { inversiones, postInversion, putInversion, deleteInversion } =
    useInversion();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [inversion, setInversion] = useState(emptyInversion);
  const { clipboard } = useClipboard();
  const [isPDF, setIsPDF] = useState(false);

  const clearInversion = () => {
    setInversion({ ...emptyInversion });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInversion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          "Error de ingreso de inversion",
          `El campo de ${campo} está vacio`,
          "error"
        )
      : option === 2
      ? Swal.fire(
          "Error de eliminación de inversion",
          "La inversion no se ha podido eliminar",
          "error"
        )
      : Swal.fire(
          "Transacción Completa",
          "La inversion se ha eliminado",
          "success"
        );
  };

  const handlePostInversion = () => {
    const { CodigoUsuario, CodigoMoneda, Monto, Interes, Liquidez } = inversion;

    !CodigoUsuario
      ? handleError(1, "codigo de usuario")
      : !CodigoMoneda
      ? handleError(1, "codigo de moneda")
      : !Monto
      ? handleError(1, "monto")
      : !Interes
      ? handleError(1, "interes")
      : !Liquidez
      ? handleError(1, "liquidez")
      : postInversion(inversion)
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearInversion());
  };

  const handlePutInversion = () => {
    const { CodigoUsuario, CodigoMoneda, Monto, Interes, Liquidez } = inversion;

    !CodigoUsuario
      ? handleError(1, "codigo de usuario")
      : !CodigoMoneda
      ? handleError(1, "codigo de moneda")
      : !Monto
      ? handleError(1, "monto")
      : !Interes
      ? handleError(1, "interes")
      : !Liquidez
      ? handleError(1, "liquidez")
      : putInversion(inversion)
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearInversion());
  };

  const handleDeleteInversion = (inversion) => {
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
        deleteInversion(inversion)
          .then(() => clearInversion())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isPDF ? (
        <PrintInversion inversiones={inversiones} isPDF={isPDF} setIsPDF={setIsPDF} />
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Mantenimiento Inversion</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Codigo de Usuario</th>
                        <th>Codigo de Moneda</th>
                        <th>Monto</th>
                        <th>Interes</th>
                        <th>Liquidez</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inversiones &&
                        inversiones.map((inversion) => {
                          return (
                            <tr key={inversion && inversion.Codigo}>
                              <td>{inversion && inversion.Codigo}</td>
                              <td>{inversion && inversion.CodigoUsuario}</td>
                              <td>{inversion && inversion.CodigoMoneda}</td>
                              <td>{inversion && inversion.Monto}</td>
                              <td>{inversion && inversion.Interes + "%"}</td>
                              <td>{inversion && inversion.Liquidez}</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setInversion(inversion);
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
                                    handleDeleteInversion(inversion)
                                  }
                                >
                                  Eliminar
                                </button>
                              </td>
                            </tr>
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

          <ExportExcel inversiones={inversiones} />

          <CSVLink className="btn btn-outline-secondary btn-lg btn-block" data={inversiones} filename="Inversiones.csv">Exportar a CSV</CSVLink>
        </div>
      )}

      <ModalInsert
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostInversion={handlePostInversion}
        setModalInsert={setModalInsert}
        clearInversion={clearInversion}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        inversion={inversion}
        handleChange={handleChange}
        handlePutInversion={handlePutInversion}
        setModalUpdate={setModalUpdate}
        clearInversion={clearInversion}
      />
    </>
  );
};

export default Inversion;
