import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const ContentToPrint = forwardRef((props, ref) => {
  const { estadisticas, isPDF, setIsPDF, handlePrint } = props;

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
                  {estadisticas &&
                    estadisticas.map((estadistica) => {
                      return (
                        <tr key={estadistica && estadistica.Codigo}>
                          <td>{estadistica && estadistica.CodigoUsuario}</td>
                          <td>{estadistica && estadistica.FechaHora}</td>
                          <td>{estadistica && estadistica.Navegador}</td>
                          <td>
                            {estadistica && estadistica.PlataformaDispositivo}
                          </td>
                          <td>
                            {estadistica && estadistica.FabricanteDispositivo === "none" ? "Sin Fabricante" : estadistica.FabricanteDispositivo}
                          </td>
                          <td>{estadistica && estadistica.Vista}</td>
                          <td>{estadistica && estadistica.Accion}</td>
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

const PrintEmisor = ({ estadisticas, isPDF, setIsPDF }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsPDF(!isPDF),
  });

  return (
    <div>
      <ContentToPrint
        estadisticas={estadisticas}
        isPDF={isPDF}
        setIsPDF={setIsPDF}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default PrintEmisor;
