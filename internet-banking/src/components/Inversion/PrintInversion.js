import React, { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ContentToPrint = forwardRef((props, ref) => {
  const { inversiones, isPDF, setIsPDF, handlePrint } = props;

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Guardar Inversiones en .PDF</h4>
            <div className="table-responsive">
              <table className="table" ref={ref}>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Codigo de Usuario</th>
                    <th>Codigo de Moneda</th>
                    <th>Monto</th>
                    <th>Interes</th>
                    <th>Liquidez</th>
                  </tr>
                </thead>
                <tbody>
                  {inversiones &&
                    inversiones.map((inversion) => {
                      return (
                        <tr key={inversion && inversion.Codigo}>
                          <td>{inversion && inversion.Codigo}</td>
                          <td>{inversion && inversion.CodigoUsuario}</td>
                          <td>{inversion && inversion.CodigoMoneda}</td>
                          <td>{inversion && inversion.Monto}</td>
                          <td>{inversion && inversion.Interes + "%"}</td>
                          <td>{inversion && inversion.Liquidez}</td>
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

const PrintInversion = ({ inversiones, isPDF, setIsPDF }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsPDF(!isPDF),
  });

  return (
    <div>
      <ContentToPrint
        inversiones={inversiones}
        isPDF={isPDF}
        setIsPDF={setIsPDF}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default PrintInversion;
