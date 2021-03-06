import React, { useState } from "react";
import PrintSesion from "./PrintSesion";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";
import { useEstadistica } from '../../hooks/useEstadistica';
import { useSesion } from "../../hooks/useSesion";
import { useClipboard } from "../../hooks/useClipboard";

const Sesion = () => {
  const { postEstadistica } = useEstadistica();
  const { sesiones } = useSesion();
  const { clipboard } = useClipboard();
  const [isPDF, setIsPDF] = useState(false);

  return (
    <>
      {isPDF ? (
        <PrintSesion sesiones={sesiones} isPDF={isPDF} setIsPDF={setIsPDF} />
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Mantenimiento Sesión</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Codigo de Usuario</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Expiracion</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sesiones &&
                        sesiones.map((sesion) => {
                          return (
                            sesion.Estado === "A" && (
                              <tr key={sesion && sesion.Codigo}>
                                <td>{sesion && sesion.Codigo}</td>
                                <td>{sesion && sesion.CodigoUsuario}</td>
                                <td>{sesion && sesion.FechaInicio}</td>
                                <td>{sesion && sesion.FechaExpiracion}</td>
                                <td>
                                  {sesion && sesion.Estado === "A"
                                    ? "Activo"
                                    : "Inactivo"}
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
            onClick={() => {setIsPDF(!isPDF); postEstadistica(localStorage.getItem("Codigo"),'Sesion', 'Exportar pdf') }}
          >
            Guardar en PDF
          </button>

          <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={ () => {clipboard(); postEstadistica(localStorage.getItem("Codigo"),'Sesion', 'Copiar al portapapeles')}}
          >
            Guardar en Portapapeles
          </button>

          <ExportExcel sesiones={sesiones} onClick ={() =>  postEstadistica(localStorage.getItem("Codigo"),'Sesion', 'Exportar excel') }/>

<CSVLink className="btn btn-outline-secondary btn-lg btn-block" data={sesiones} onClick  ={() =>  postEstadistica(localStorage.getItem("Codigo"),'Sesion', 'Exportar csv') } filename="Sesion.csv">Exportar a CSV</CSVLink>
        </div>
      )}
    </>
  );
};

export default Sesion;
