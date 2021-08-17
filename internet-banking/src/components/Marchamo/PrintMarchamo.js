import React, { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ContentToPrint = forwardRef((props, ref) => {
  const { marchamos, isPDF, setIsPDF, handlePrint } = props;

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Guardar Marchamos en .PDF</h4>
            <div className="table-responsive">
              <table className="table" ref={ref}>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Codigo de Usuario</th>
                    <th>Placa</th>
                    <th>Monto</th>
                    <th>Fecha Limite</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {marchamos &&
                    marchamos.map((marchamo) => {
                      return (
                        marchamo.Estado === "A" && (
                          <tr key={marchamo && marchamo.Codigo}>
                            <td>{marchamo && marchamo.Codigo}</td>
                            <td>{marchamo && marchamo.CodigoUsuario}</td>
                            <td>{marchamo && marchamo.Placa}</td>
                            <td>{marchamo && marchamo.Monto}</td>
                            <td>{marchamo && marchamo.FechaLimite}</td>
                            <td>
                              {marchamo && marchamo.Estado === "A"
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

const PrintMarchamo = ({ marchamos, isPDF, setIsPDF }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsPDF(!isPDF),
  });

  return (
    <div>
      <ContentToPrint
        marchamos={marchamos}
        isPDF={isPDF}
        setIsPDF={setIsPDF}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default PrintMarchamo;
