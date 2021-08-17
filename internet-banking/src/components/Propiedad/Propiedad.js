import React, { useState } from "react";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";
import ModalInsert from "./ModalInsert";
import PrintPropiedad from "./PrintPropiedad";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";

import { usePropiedad } from "../../hooks/usePropiedad";
import { useClipboard } from "../../hooks/useClipboard";

const Propiedad = () => {
  const emptyPropiedad = {
    Codigo: "",
    CodigoUsuario: "",
    Ubicacion: "",
    Dimension: "",
    Descripcion: "",
    Estado: "",
    PrecioFiscal: "",
  };

  const { propiedades, postPropiedad, putPropiedad, deletePropiedad } =
    usePropiedad();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [propiedad, setPropiedad] = useState(emptyPropiedad);
  const { clipboard } = useClipboard();
  const [isPDF, setIsPDF] = useState(false);

  const clearPropiedad = () => {
    setPropiedad({ ...emptyPropiedad });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropiedad((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          "Error de ingreso de propiedad",
          `El campo de ${campo} está vacio`,
          "error"
        )
      : option === 2
      ? Swal.fire(
          "Error de eliminación de propiedad",
          "La propiedad no se ha podido eliminar",
          "error"
        )
      : Swal.fire(
          "Transacción Completa",
          "La propiedad se ha eliminado",
          "success"
        );
  };

  const handlePostPropiedad = () => {
    const {
      CodigoUsuario,
      Ubicacion,
      Dimension,
      Descripcion,
      Estado,
      PrecioFiscal,
    } = propiedad;

    !CodigoUsuario
      ? handleError(1, "codigo de usuario")
      : !Ubicacion
      ? handleError(1, "ubicacion")
      : !Dimension
      ? handleError(1, "dimension")
      : !Descripcion
      ? handleError(1, "descripción")
      : !Estado
      ? handleError(1, "estado")
      : !PrecioFiscal
      ? handleError(1, "precio fiscal")
      : postPropiedad(propiedad)
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearPropiedad());
  };

  const handlePutPropiedad = () => {
    const {
      CodigoUsuario,
      Ubicacion,
      Dimension,
      Descripcion,
      Estado,
      PrecioFiscal,
    } = propiedad;

    !CodigoUsuario
      ? handleError(1, "codigo de usuario")
      : !Ubicacion
      ? handleError(1, "ubicacion")
      : !Dimension
      ? handleError(1, "dimension")
      : !Descripcion
      ? handleError(1, "descripción")
      : !Estado
      ? handleError(1, "estado")
      : !PrecioFiscal
      ? handleError(1, "precio fiscal")
      : putPropiedad(propiedad)
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearPropiedad());
  };

  const handleDeletePropiedad = (propiedad) => {
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
        deletePropiedad(propiedad)
          .then(() => clearPropiedad())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isPDF ? (
        <PrintPropiedad propiedades={propiedades} isPDF={isPDF} setIsPDF={setIsPDF} />
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Mantenimiento Propiedad</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Codigo de Usuario</th>
                        <th>Ubicacion</th>
                        <th>Dimension</th>
                        <th>Descripcion</th>
                        <th>Estado</th>
                        <th>Precio Fiscal</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {propiedades &&
                        propiedades.map((propiedad) => {
                          return (
                            propiedad.Estado === "A" && (
                              <tr key={propiedad && propiedad.Codigo}>
                                <td>{propiedad && propiedad.Codigo}</td>
                                <td>{propiedad && propiedad.CodigoUsuario}</td>
                                <td>{propiedad && propiedad.Ubicacion}</td>
                                <td>{propiedad && propiedad.Dimension}</td>
                                <td>{propiedad && propiedad.Descripcion}</td>
                                <td>
                                  {propiedad && propiedad.Estado === "A"
                                    ? "Activo"
                                    : "Inactivo"}
                                </td>
                                <td>{propiedad && propiedad.PrecioFiscal}</td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      setPropiedad(propiedad);
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
                                      handleDeletePropiedad(propiedad)
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

          <ExportExcel propiedades={propiedades} />

          <CSVLink className="btn btn-outline-secondary btn-lg btn-block" data={propiedades} filename="Propiedades.csv">Exportar a CSV</CSVLink>
        </div>
      )}

      <ModalInsert
        propiedad={propiedad}
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostPropiedad={handlePostPropiedad}
        setModalInsert={setModalInsert}
        clearPropiedad={clearPropiedad}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        propiedad={propiedad}
        handleChange={handleChange}
        handlePutPropiedad={handlePutPropiedad}
        setModalUpdate={setModalUpdate}
        clearPropiedad={clearPropiedad}
      />
    </>
  );
};

export default Propiedad;
