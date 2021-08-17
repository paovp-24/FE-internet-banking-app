import React, { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ContentToPrint = forwardRef((props, ref) => {
  const { sucursales, isPDF, setIsPDF, handlePrint } = props;

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Guardar Sucursales en .PDF</h4>
            <div className="table-responsive">
              <table className="table" ref={ref}>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Ubicacion</th>
                    <th>Correo</th>
                    <th>Telefono</th>
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

const PrintSucursal = ({ sucursales, isPDF, setIsPDF }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsPDF(!isPDF),
  });

  return (
    <div>
      <ContentToPrint
        sucursales={sucursales}
        isPDF={isPDF}
        setIsPDF={setIsPDF}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default PrintSucursal;
