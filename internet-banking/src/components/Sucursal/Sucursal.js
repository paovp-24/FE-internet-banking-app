import React, { useState } from "react";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";
import ModalInsert from "./ModalInsert";
import PrintSucursal from "./PrintSucursal";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";

import { useEstadistica } from '../../hooks/useEstadistica';
import { useSucursal } from "../../hooks/useSucursal";
import { useClipboard } from "../../hooks/useClipboard";

const Sucursal = () => {
  const { postEstadistica } = useEstadistica();

  const emptySucursal = {
    Codigo: "",
    Nombre: "",
    Ubicacion: "",
    Correo: "",
    Telefono: "",
  };

  const { sucursales, postSucursal, putSucursal, deleteSucursal } =
    useSucursal();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [sucursal, setSucursal] = useState(emptySucursal);
  const { clipboard } = useClipboard();
  const [isPDF, setIsPDF] = useState(false);

  const clearSucursal = () => {
    setSucursal({ ...emptySucursal });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSucursal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          "Error de ingreso de sucursal",
          `El campo de ${campo} está vacio`,
          "error"
        )
      : option === 2
      ? Swal.fire(
          "Error de eliminación de sucursal",
          "La sucursal no se ha podido eliminar",
          "error"
        )
      : Swal.fire(
          "Transacción Completa",
          "La sucursal se ha eliminado",
          "success"
        );
  };

  const handlePostSucursal = () => {
    const { Nombre, Ubicacion, Correo, Telefono } = sucursal;

    !Nombre
      ? handleError(1, "nombre")
      : !Ubicacion
      ? handleError(1, "ubicacion")
      : !Correo
      ? handleError(1, "correo")
      : !Telefono
      ? handleError(1, "telefono")
      : postSucursal(sucursal)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Sucursal', 'Ingresar Sucursal'))
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearSucursal());
  };

  const handlePutSucursal = () => {
    const { Nombre, Ubicacion, Correo, Telefono } = sucursal;

    !Nombre
      ? handleError(1, "nombre")
      : !Ubicacion
      ? handleError(1, "ubicacion")
      : !Correo
      ? handleError(1, "correo")
      : !Telefono
      ? handleError(1, "telefono")
      : putSucursal(sucursal)
      .then(() => postEstadistica(localStorage.getItem("Codigo"),'Sucursal', 'Editar Sucursal'))
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearSucursal());
  };

  const handleDeleteSucursal = (sucursal) => {
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
        deleteSucursal(sucursal)
        .then(() => postEstadistica(localStorage.getItem("Codigo"),'Sucursal', 'Eliminar Sucursal'))
          .then(() => clearSucursal())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isPDF ? (
        <PrintSucursal sucursales={sucursales} isPDF={isPDF} setIsPDF={setIsPDF} />
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Mantenimiento Sucursal</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Ubicacion</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sucursales &&
                        sucursales.map((sucursal) => {
                          return (
                            <tr key={sucursal && sucursal.Codigo}>
                              <td>{sucursal && sucursal.Codigo}</td>
                              <td>{sucursal && sucursal.Nombre}</td>
                              <td>{sucursal && sucursal.Ubicacion}</td>
                              <td>{sucursal && sucursal.Correo}</td>
                              <td>{sucursal && sucursal.Telefono}</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setSucursal(sucursal);
                                    setModalUpdate(!modalUpdate);
                                  }}
                                >
                                  Editar
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteSucursal(sucursal)}
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
            onClick={() => {setIsPDF(!isPDF);postEstadistica(localStorage.getItem("Codigo"),'Sucursal', 'Exportar a PDF') }}
          >
            Guardar en PDF
          </button>

          <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={() => {clipboard(); postEstadistica(localStorage.getItem("Codigo"),'Sucursal', 'Copiar al portapapeles')}}
          >
            Guardar en Portapapeles
          </button>

          <ExportExcel  sucursales={sucursales} />

          <CSVLink onClick = {() => postEstadistica(localStorage.getItem("Codigo"),'Sucursal', 'Exportar a CSV')} className="btn btn-outline-secondary btn-lg btn-block" data={sucursales} filename="Sucursales.csv">Exportar a CSV</CSVLink>
        </div>
      )}

      <ModalInsert
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostSucursal={handlePostSucursal}
        setModalInsert={setModalInsert}
        clearSucursal={clearSucursal}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        sucursal={sucursal}
        handleChange={handleChange}
        handlePutSucursal={handlePutSucursal}
        setModalUpdate={setModalUpdate}
        clearSucursal={clearSucursal}
      />
    </>
  );
};

export default Sucursal;
