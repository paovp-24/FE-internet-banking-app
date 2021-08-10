import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrintEstadistica from './PrintEstadistica';
import ExportExcel from './ExportExcel';
import { CSVLink } from 'react-csv';


import { baseUrl, config } from '../../services/API/APIRest';
const url = baseUrl + 'Estadistica/';


const Estadistica = () => {


  function portapapeles() {
    var urlField = document.querySelector('table');
    window.getSelection().removeAllRanges(); 
    var range = document.createRange();  
    range.selectNode(urlField);
    window.getSelection().addRange(range);
    document.execCommand('copy');
  }
  
  const [Estadisticaes, setEstadisticaes] = useState([]);
  const [isPDF, setIsPDF] = useState(false);

  const getEstadisticaes = async () => {
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setEstadisticaes(data);
    });
  };

  useEffect(() => {
    getEstadisticaes();
  }, []);

  return (
    <>
      {isPDF ? (
        <PrintEstadistica
          Estadisticaes={Estadisticaes}
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
                  <table className="table" id="table">
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
                      {Estadisticaes &&
                        Estadisticaes.map((Estadistica) => {
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
                              <td>
                                {Estadistica &&
                                  Estadistica.FabricanteDispositivo}
                              </td>
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
            onClick={() => setIsPDF(!isPDF)}
          >
            Guardar en PDF
          </button>
     
          <button  className="btn btn-outline-secondary btn-lg btn-block" onClick={portapapeles}>
      Guardar en Portapapeles
    </button>

          <ExportExcel Estadisticaes={Estadisticaes} />

          <CSVLink
            className="btn btn-outline-secondary btn-lg btn-block"
            data={Estadisticaes}
            filename="Estadisticaes.csv"
          >
            Exportar a CSV
          </CSVLink>
        </div>
      )}
    </>
  );
};

export default Estadistica;
