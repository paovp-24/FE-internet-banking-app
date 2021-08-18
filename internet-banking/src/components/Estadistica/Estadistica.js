import React, { useState } from "react";
import PrintEstadistica from "./PrintEstadistica";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";

import { useEstadistica } from "../../hooks/useEstadistica";
import { useClipboard } from "../../hooks/useClipboard";

const Estadistica = () => {
  const { postEstadistica, estadisticas } = useEstadistica();
  const { clipboard } = useClipboard();
  const [isPDF, setIsPDF] = useState(false);

  return (
    <>
      {isPDF ? (
        <PrintEstadistica
          estadisticas={estadisticas}
          isPDF={isPDF}
          setIsPDF={setIsPDF}
        />
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Mantenimiento Estadistica</h4>
                <div className="table-responsive">
                  <table className="table" id="table" style={{textAlign: 'center'}}>  
                    <thead>
                      <tr>
                        <th>Codigo de Usuario</th>
                        <th>Fecha horaria</th>
                        <th>Navegador</th>
                        <th>Sistema Operativo</th>
                        <th>Fabricante de Dispositivo</th>
                        <th>Apartado del sistema</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {estadisticas &&
                        estadisticas.map((Estadistica) => {
                          return (
                            <tr key={Estadistica && Estadistica.Codigo}>
                              <td>
                                {Estadistica && Estadistica.CodigoUsuario}
                              </td>
                              <td>{Estadistica && Estadistica.FechaHora}</td>
                              <td>{Estadistica && Estadistica.Navegador}</td>
                              <td>
                                {Estadistica &&
                                  Estadistica.PlataformaDispositivo}
                              </td>
                              <td>{Estadistica && Estadistica.FabricanteDispositivo === "none" ? "Sin Fabricante" : Estadistica.FabricanteDispositivo}</td>
                              <td>{Estadistica && Estadistica.Vista}</td>
                              <td>{Estadistica && Estadistica.Accion}</td>
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
            onClick={() => {setIsPDF(!isPDF); postEstadistica(localStorage.getItem("Codigo"),'Estadistica', 'Exportar PDF')}}
          >
            Guardar en PDF
          </button>

          <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={() => {clipboard(); postEstadistica(localStorage.getItem("Codigo"),'Estadistica', 'Copiar al portapapeles')}}
          >
            Guardar en Portapapeles
          </button>

          <ExportExcel estadisticas={estadisticas} />

          <CSVLink
           onClick={() =>  postEstadistica(localStorage.getItem("Codigo"),'Estadistica', 'Copiar al portapapeles')}
            className="btn btn-outline-secondary btn-lg btn-block"
            data={estadisticas}
            filename="Estadisticas.csv"
          >
            Exportar a CSV
          </CSVLink>
        </div>
      )}
    </>
  );
};

export default Estadistica;
