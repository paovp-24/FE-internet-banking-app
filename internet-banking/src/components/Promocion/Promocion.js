import React, { useState } from "react";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";
import ModalInsert from "./ModalInsert";
import PrintPromocion from "./PrintPromocion";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";

import { usePromocion } from "../../hooks/usePromocion";
import { useClipboard } from "../../hooks/useClipboard";
import { useEstadistica } from '../../hooks/useEstadistica';

const Promocion = () => {
  const emptyPromocion = {
    Codigo: "",
    CodigoEmisor: "",
    Empresa: "",
    FechaInicio: "",
    FechaFinalizacion: "",
    Descuento: "",
  };

  const { postEstadistica } = useEstadistica();

  const { promociones, postPromocion, putPromocion, deletePromocion } =
    usePromocion();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [promocion, setPromocion] = useState(emptyPromocion);
  const { clipboard } = useClipboard();
  const [isPDF, setIsPDF] = useState(false);

  const clearPromocion = () => {
    setPromocion({ ...emptyPromocion });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromocion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          "Error de ingreso de promocion",
          `El campo de ${campo} está vacio`,
          "error"
        )
      : option === 2
      ? Swal.fire(
          "Error de eliminación de promocion",
          "La promocion no se ha podido eliminar",
          "error"
        )
      : Swal.fire(
          "Transacción Completa",
          "La promocion se ha eliminado",
          "success"
        );
  };

  const handlePostPromocion = () => {
    const { CodigoEmisor, Empresa, FechaInicio, FechaFinalizacion, Descuento } =
      promocion;

    !CodigoEmisor
      ? handleError(1, "codigo de emisor")
      : !Empresa
      ? handleError(1, "empresa")
      : !FechaInicio
      ? handleError(1, "fecha de inicio")
      : !FechaFinalizacion
      ? handleError(1, "fecha de finalizacion")
      : !Descuento
      ? handleError(1, "descuento")
      : postPromocion(promocion)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Promoción', 'Ingresar Promoción'))
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearPromocion());
  };

  const handlePutPromocion = () => {
    const { CodigoEmisor, Empresa, FechaInicio, FechaFinalizacion, Descuento } =
      promocion;

    !CodigoEmisor
      ? handleError(1, "codigo de emisor")
      : !Empresa
      ? handleError(1, "empresa")
      : !FechaInicio
      ? handleError(1, "fecha de inicio")
      : !FechaFinalizacion
      ? handleError(1, "fecha de finalizacion")
      : !Descuento
      ? handleError(1, "descuento")
      : putPromocion(promocion)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Promoción', 'Actualizar Promoción'))
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearPromocion());
  };

  const handleDeletePromocion = (promocion) => {
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
        deletePromocion(promocion)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Promoción', 'Eliminar Promoción'))
          .then(() => clearPromocion())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isPDF ? (
        <PrintPromocion promociones={promociones} isPDF={isPDF} setIsPDF={setIsPDF} />
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Mantenimiento Promocion</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Codigo Emisor</th>
                        <th>Empresa</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Finalizacion</th>
                        <th>Descuento</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {promociones &&
                        promociones.map((promocion) => {
                          return (
                            <tr key={promocion && promocion.Codigo}>
                              <td>{promocion && promocion.Codigo}</td>
                              <td>{promocion && promocion.CodigoEmisor}</td>
                              <td>{promocion && promocion.Empresa}</td>
                              <td>{promocion && promocion.FechaInicio}</td>
                              <td>
                                {promocion && promocion.FechaFinalizacion}
                              </td>
                              <td>{promocion && promocion.Descuento + "%"}</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setPromocion(promocion);
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
                                    handleDeletePromocion(promocion)
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
            onClick={() => {setIsPDF(!isPDF); postEstadistica(localStorage.getItem("Codigo"),'Promoción', 'Exportar a Excel')}}
          >
            Guardar en PDF
          </button>

          <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={ () =>  {clipboard(); postEstadistica(localStorage.getItem("Codigo"),'Promoción', 'Copiar al portapapeles')}}
          >
            Guardar en Portapapeles
          </button>

          <ExportExcel promociones={promociones} />

          <CSVLink className="btn btn-outline-secondary btn-lg btn-block" data={promociones}  onClick = { () => postEstadistica(localStorage.getItem("Codigo"),'Promoción', 'Exportar a CSV')} filename="Promociones.csv">Exportar a CSV</CSVLink>
        </div>
      )}

      <ModalInsert
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostPromocion={handlePostPromocion}
        setModalInsert={setModalInsert}
        clearPromocion={clearPromocion}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        promocion={promocion}
        handleChange={handleChange}
        handlePutPromocion={handlePutPromocion}
        setModalUpdate={setModalUpdate}
        clearPromocion={clearPromocion}
      />
    </>
  );
};

export default Promocion;
