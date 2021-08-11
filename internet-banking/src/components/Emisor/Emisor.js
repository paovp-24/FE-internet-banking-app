import React, { useState } from "react";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";
import ModalInsert from "./ModalInsert";
import PrintEmisor from "./PrintEmisor";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";

import { useEmisor } from "../../hooks/useEmisor";

const Emisor = () => {
  const emptyEmisor = {
    Codigo: "",
    Descripcion: "",
    Prefijo: "",
    NumeroDigitos: "",
  };

  const { emisores, postEmisor, putEmisor, deleteEmisor } = useEmisor();
  const [emisor, setEmisor] = useState(emptyEmisor);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [isPDF, setIsPDF] = useState(false);

  const clearEmisor = () => {
    setEmisor({ ...emptyEmisor });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmisor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1 ? Swal.fire("Error de ingreso de emisor", `El campo de ${campo} está vacio`,"error") :
    option === 2 ? Swal.fire("Error de eliminación de emisor", "El emisor no se ha podido eliminar", "error") :
    Swal.fire("Transacción Completa", "El emisor se ha eliminado", "success")
  };

  const handlePostEmisor = () => {
    const { Descripcion, Prefijo, NumeroDigitos } = emisor;

    !Descripcion
      ? handleError(1, "descripción")
      : !Prefijo
      ? handleError(1, "prefijo")
      : !NumeroDigitos
      ? handleError(1, "número de digitos")
      : postEmisor(emisor)
      .then(() => setModalInsert(!modalInsert))
      .then(() => clearEmisor());
  };

  const handlePutEmisor = () => {
    const { Descripcion, Prefijo, NumeroDigitos } = emisor;

    !Descripcion
      ? handleError(1, "descripción")
      : !Prefijo
      ? handleError(1, "prefijo")
      : !NumeroDigitos
      ? handleError(1, "número de digitos")
      : putEmisor(emisor)
      .then(() => setModalUpdate(!modalUpdate))
      .then(() => clearEmisor());
  };

  const handleDeleteEmisor = (emisor) => {
    Swal.fire({
      title: "Está seguro de eliminar?",
      text: "Esta acción no se puede devolver!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        deleteEmisor(emisor)
        .then(() => clearEmisor())
        .then(() => handleError(3))
        .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isPDF ? (
        <PrintEmisor emisores={emisores} isPDF={isPDF} setIsPDF={setIsPDF} />
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Mantenimiento Emisor</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Descripcion</th>
                        <th>Prefijo</th>
                        <th>Numero Digitos</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emisores &&
                        emisores.map((emisor) => {
                          return (
                            <tr key={emisor && emisor.Codigo}>
                              <td>{emisor && emisor.Codigo}</td>
                              <td>{emisor && emisor.Descripcion}</td>
                              <td>{emisor && emisor.Prefijo}</td>
                              <td>{emisor && emisor.NumeroDigitos}</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setEmisor(emisor);
                                    setModalUpdate(!modalUpdate);
                                  }}
                                >
                                  Editar
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteEmisor(emisor)}
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

          <ExportExcel emisores={emisores} />

          <CSVLink className="btn btn-outline-secondary btn-lg btn-block" data={emisores} filename="Emisores.csv">Exportar a CSV</CSVLink>
        </div>
      )}

      <ModalInsert
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostEmisor={handlePostEmisor}
        setModalInsert={setModalInsert}
        clearEmisor={clearEmisor}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        emisor={emisor}
        handleChange={handleChange}
        handlePutEmisor={handlePutEmisor}
        setModalUpdate={setModalUpdate}
        clearEmisor={clearEmisor}
      />
    </>
  );
};

export default Emisor;
