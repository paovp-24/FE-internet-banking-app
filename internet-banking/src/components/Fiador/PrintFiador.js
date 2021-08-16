import React, { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const ContentToPrint = forwardRef((props, ref) => {
    const { fiadores, isPDF, setIsPDF, handlePrint } = props;

    return (
        <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Guardar Fiadores en .PDF</h4>
              <div className="table-responsive">
                <table className="table" ref={ref}>
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Codigo de Prestamo</th>
                      <th>Cedula</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Ocupacion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fiadores &&
                      fiadores.map((fiador) => {
                        return (
                          <tr key={fiador && fiador.Codigo}>
                            <td>{fiador && fiador.Codigo}</td>
                            <td>{fiador && fiador.CodigoPrestamo}</td>
                            <td>{fiador && fiador.Cedula}</td>
                            <td>{fiador && fiador.Nombre}</td>
                            <td>{fiador && fiador.Apellidos}</td>
                            <td>{fiador && fiador.Ocupacion}</td>
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

const PrintFiador = ({ fiadores, isPDF, setIsPDF }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      onAfterPrint: () => setIsPDF(!isPDF),
    });
  
    return (
      <div>
        <ContentToPrint fiadores={fiadores} isPDF={isPDF} setIsPDF={setIsPDF} handlePrint={handlePrint} ref={componentRef} />
      </div>
    );
  };
  
  export default PrintFiador;