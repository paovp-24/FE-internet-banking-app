import React, { useState } from "react";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";
import ModalInsert from "./ModalInsert";
import PrintTarjeta from "./PrintTarjeta";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";

import { useEstadistica } from '../../hooks/useEstadistica';
import { useTarjeta } from "../../hooks/useTarjeta";
import { useClipboard } from "../../hooks/useClipboard";

const Tarjeta = () => {
  const { postEstadistica } = useEstadistica();

  const emptyTarjeta = {
    Codigo: "",
    CodigoEmisor: "",
    Numero: "",
    FechaEmision: "",
    FechaVencimiento: "",
    Estado: "",
  };

  const { tarjetas, postTarjeta, putTarjeta, deleteTarjeta } = useTarjeta();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [tarjeta, setTarjeta] = useState(emptyTarjeta);
  const { clipboard } = useClipboard();
  const [isPDF, setIsPDF] = useState(false);

  const clearTarjeta = () => {
    setTarjeta({ ...emptyTarjeta });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarjeta((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1 ? Swal.fire("Error de ingreso de tarjeta", `El campo de ${campo} está vacio`,"error") :
    option === 2 ? Swal.fire("Error de eliminación de tarjeta", "La tarjeta no se ha podido eliminar", "error") :
    Swal.fire("Transacción Completa", "La tarjeta se ha eliminado", "success")
  };

  const handlePostTarjeta = () => {
    const { CodigoEmisor, Numero, FechaEmision, FechaVencimiento, Estado } = tarjeta;

    !CodigoEmisor
    ? handleError(1, "codigo de emisor")
    : !Numero
    ? handleError(1, "numero")
    : !FechaEmision
    ? handleError(1, "fecha de emision")
    : !FechaVencimiento
    ? handleError(1, "fecha de vencimiento")
    : !Estado
    ? handleError(1, "estado")
    : postTarjeta(tarjeta)
    .then(() => postEstadistica(localStorage.getItem("Codigo"),'Tarjeta', 'Ingresar Tarjeta'))
    .then(() => setModalInsert(!modalInsert))
    .then(() => clearTarjeta());
  };

  const handlePutTarjeta = () => {
    const { CodigoEmisor, Numero, FechaEmision, FechaVencimiento, Estado } = tarjeta;

    !CodigoEmisor
    ? handleError(1, "codigo de emisor")
    : !Numero
    ? handleError(1, "numero")
    : !FechaEmision
    ? handleError(1, "fecha de emision")
    : !FechaVencimiento
    ? handleError(1, "fecha de vencimiento")
    : !Estado
    ? handleError(1, "estado")
    : putTarjeta(tarjeta)
    .then(() => postEstadistica(localStorage.getItem("Codigo"),'Tarjeta', 'Editar Tarjeta'))
    .then(() => setModalUpdate(!modalUpdate))
    .then(() => clearTarjeta());
  };

  const handleDeleteTarjeta = (tarjeta) => {
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
        deleteTarjeta(tarjeta)
        .then(() => postEstadistica(localStorage.getItem("Codigo"),'Tarjeta', 'Eliminar Tarjeta'))
        .then(() => clearTarjeta())
        .then(() => handleError(3))
        .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isPDF ? (
        <PrintTarjeta tarjetas={tarjetas} isPDF={isPDF} setIsPDF={setIsPDF} />
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Mantenimiento Tarjeta</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Codigo de Emisor</th>
                        <th>Numero</th>
                        <th>Fecha de Emision</th>
                        <th>Fecha de Vencimiento</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tarjetas &&
                        tarjetas.map((tarjeta) => {
                          return (
                            tarjeta.Estado === "A" && (
                              <tr key={tarjeta && tarjeta.Codigo}>
                                <td>{tarjeta && tarjeta.Codigo}</td>
                                <td>{tarjeta && tarjeta.CodigoEmisor}</td>
                                <td>{tarjeta && tarjeta.Numero}</td>
                                <td>{tarjeta && tarjeta.FechaEmision}</td>
                                <td>{tarjeta && tarjeta.FechaVencimiento}</td>
                                <td>
                                  {tarjeta && tarjeta.Estado === "A"
                                    ? "Activo"
                                    : "Inactivo"}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      setTarjeta(tarjeta);
                                      setModalUpdate(!modalUpdate);
                                    }}
                                  >
                                    Editar
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteTarjeta(tarjeta)}
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
            onClick={() => {setIsPDF(!isPDF); postEstadistica(localStorage.getItem("Codigo"),'Tarjeta', 'Exportar a PDF')}}
          >
            Guardar en PDF
          </button>

          <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={() => {clipboard(); postEstadistica(localStorage.getItem("Codigo"),'Tarjeta', 'Copiar al portapapeles')}}
          >
            Guardar en Portapapeles
          </button>

          <ExportExcel tarjetas={tarjetas} />

          <CSVLink onClick = {() => postEstadistica(localStorage.getItem("Codigo"),'Tarjeta', 'Exportar a CSV')} className="btn btn-outline-secondary btn-lg btn-block" data={tarjetas} filename="Tarjetas.csv">Exportar a CSV</CSVLink>
        </div>
      )}

      <ModalInsert
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostTarjeta={handlePostTarjeta}
        setModalInsert={setModalInsert}
        clearTarjeta={clearTarjeta}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        tarjeta={tarjeta}
        handleChange={handleChange}
        handlePutTarjeta={handlePutTarjeta}
        setModalUpdate={setModalUpdate}
        clearTarjeta={clearTarjeta}
      />
    </>
  );
};

export default Tarjeta;
