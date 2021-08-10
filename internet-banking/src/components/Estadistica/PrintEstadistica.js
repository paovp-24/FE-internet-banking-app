import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const ContentToPrint = forwardRef((props, ref) => {
  const { Estadisticaes, isPDF, setIsPDF, handlePrint } = props;

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Guardar Estadisticas en .PDF</h4>
            <div className="table-responsive">
              <table
                className="table"
                style={{
                  textAlign: 'center',
                }}
                ref={ref}
              >
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
                          <td>{Estadistica && Estadistica.CodigoUsuario}</td>
                          <td>{Estadistica && Estadistica.FechaHora}</td>
                          <td>{Estadistica && Estadistica.Navegador}</td>
                          <td>
                            {Estadistica && Estadistica.PlataformaDispositivo}
                          </td>
                          <td>
                            {Estadistica && Estadistica.FabricanteDispositivo}
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
        onClick={handlePrint}
      >
        Guardar
      </button>
      <button
        className="btn btn-outline-secondary btn-lg btn-block"
        onClick={() => setIsPDF(!isPDF)}
      >
        Cancelar
      </button>
    </div>
  );
});

const PrintEmisor = ({ Estadisticaes, isPDF, setIsPDF }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsPDF(!isPDF),
  });

  return (
    <div>
      <ContentToPrint
        Estadisticaes={Estadisticaes}
        isPDF={isPDF}
        setIsPDF={setIsPDF}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default PrintEmisor;
