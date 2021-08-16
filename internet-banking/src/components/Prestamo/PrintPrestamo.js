import React, { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ContentToPrint = forwardRef((props, ref) => {
  const { prestamos, isPDF, setIsPDF, handlePrint } = props;

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Mantenimiento Prestamo</h4>
            <div className="table-responsive">
              <table className="table" ref={ref}>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Codigo Usuario</th>
                    <th>Codigo Moneda</th>
                    <th>Monto</th>
                    <th>Saldo Pendiente</th>
                    <th>Tasa de Interes</th>
                    <th>Fecha Emision</th>
                    <th>Fecha Vencimiento</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {prestamos &&
                    prestamos.map((prestamo) => {
                      return (
                        prestamo.Estado === "A" && (
                          <tr key={prestamo && prestamo.Codigo}>
                            <td>{prestamo && prestamo.Codigo}</td>
                            <td>{prestamo && prestamo.CodigoUsuario}</td>
                            <td>{prestamo && prestamo.CodigoMoneda}</td>
                            <td>{prestamo && prestamo.Monto}</td>
                            <td>{prestamo && prestamo.SaldoPendiente}</td>
                            <td>{prestamo && prestamo.TasaInteres + "%"}</td>
                            <td>{prestamo && prestamo.FechaEmision}</td>
                            <td>{prestamo && prestamo.FechaVencimiento}</td>
                            <td>
                              {prestamo && prestamo.Estado === "A"
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

const PrintPrestamo = ({ prestamos, isPDF, setIsPDF }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      onAfterPrint: () => setIsPDF(!isPDF),
    });
  
    return (
      <div>
        <ContentToPrint prestamos={prestamos} isPDF={isPDF} setIsPDF={setIsPDF} handlePrint={handlePrint} ref={componentRef} />
      </div>
    );
  };
  
  export default PrintPrestamo;
