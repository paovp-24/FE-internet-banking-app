import React, { useState } from "react";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";
import ModalInsert from "./ModalInsert";
import PrintMarchamo from "./PrintMarchamo";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";

import { useMarchamo } from "../../hooks/useMarchamo";
import { useClipboard } from "../../hooks/useClipboard";
import { useEstadistica } from '../../hooks/useEstadistica';

const Marchamo = () => {
  const emptyMarchamo = {
    Codigo: "",
    CodigoUsuario: "",
    Placa: "",
    Monto: "",
    FechaLimite: "",
    Estado: "",
  };

  const { postEstadistica } = useEstadistica();

  const { marchamos, postMarchamo, putMarchamo, deleteMarchamo } =
    useMarchamo();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [marchamo, setMarchamo] = useState(emptyMarchamo);
  const { clipboard } = useClipboard();
  const [isPDF, setIsPDF] = useState(false);

  const clearMarchamo = () => {
    setMarchamo({ ...emptyMarchamo });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarchamo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          "Error de ingreso de marchamo",
          `El campo de ${campo} está vacio`,
          "error"
        )
      : option === 2
      ? Swal.fire(
          "Error de eliminación de marchamo",
          "El marchamo no se ha podido eliminar",
          "error"
        )
      : Swal.fire(
          "Transacción Completa",
          "El marchamo se ha eliminado",
          "success"
        );
  };

  const handlePostMarchamo = () => {
    const { CodigoUsuario, Placa, Monto, FechaLimite, Estado } = marchamo;

    !CodigoUsuario
      ? handleError(1, "codigo de usuario")
      : !Placa
      ? handleError(1, "placa")
      : !Monto
      ? handleError(1, "monto")
      : !FechaLimite
      ? handleError(1, "fecha limite")
      : !Estado
      ? handleError(1, "estado")
      : postMarchamo(marchamo)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Marchamo', 'Ingresar Marchamo'))
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearMarchamo());
  };

  const handlePutMarchamo = () => {
    const { CodigoUsuario, Placa, Monto, FechaLimite, Estado } = marchamo;

    !CodigoUsuario
      ? handleError(1, "codigo de usuario")
      : !Placa
      ? handleError(1, "placa")
      : !Monto
      ? handleError(1, "monto")
      : !FechaLimite
      ? handleError(1, "fecha limite")
      : !Estado
      ? handleError(1, "estado")
      : putMarchamo(marchamo)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Marchamo', 'Actualizar Marchamo'))
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearMarchamo());
  };

  const handleDeleteMarchamo = (marchamo) => {
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
        deleteMarchamo(marchamo)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Marchamo', 'Eliminar Marchamo'))
          .then(() => clearMarchamo())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isPDF ? (
        <PrintMarchamo
          marchamos={marchamos}
          isPDF={isPDF}
          setIsPDF={setIsPDF}
        />
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Mantenimiento Marchamo</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Codigo de Usuario</th>
                        <th>Placa</th>
                        <th>Monto</th>
                        <th>Fecha Limite</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marchamos &&
                        marchamos.map((marchamo) => {
                          return (
                            marchamo.Estado === "A" && (
                              <tr key={marchamo && marchamo.Codigo}>
                                <td>{marchamo && marchamo.Codigo}</td>
                                <td>{marchamo && marchamo.CodigoUsuario}</td>
                                <td>{marchamo && marchamo.Placa}</td>
                                <td>{marchamo && marchamo.Monto}</td>
                                <td>{marchamo && marchamo.FechaLimite}</td>
                                <td>
                                  {marchamo && marchamo.Estado === "A"
                                    ? "Activo"
                                    : "Inactivo"}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      setMarchamo(marchamo);
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
                                      handleDeleteMarchamo(marchamo)
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
            onClick={() => {setIsPDF(!isPDF); postEstadistica(localStorage.getItem("Codigo"),'Marchamo', 'Guardar PDF')}}
          >
            Guardar en PDF
          </button>

          <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={ () => {clipboard(); postEstadistica(localStorage.getItem("Codigo"),'Marchamo', 'Copiar al portapapeles')}}
          >
            Guardar en Portapapeles
          </button>

          <ExportExcel marchamos={marchamos}  onClick ={() =>  postEstadistica(localStorage.getItem("Codigo"),'Marchamo', 'Exportar Excel') }/>

          <CSVLink
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick = { () => postEstadistica(localStorage.getItem("Codigo"),'Marchamo', 'Exportar CSV')}
            data={marchamos}
            filename="Marchamos.csv"
          >
            Exportar a CSV
          </CSVLink>
        </div>
      )}

      <ModalInsert
        marchamo={marchamo}
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostMarchamo={handlePostMarchamo}
        setModalInsert={setModalInsert}
        clearMarchamo={clearMarchamo}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        marchamo={marchamo}
        handleChange={handleChange}
        handlePutMarchamo={handlePutMarchamo}
        setModalUpdate={setModalUpdate}
        clearMarchamo={clearMarchamo}
      />
    </>
  );
};

export default Marchamo;
