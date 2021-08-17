import React, { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ContentToPrint = forwardRef((props, ref) => {
  const { tarjetas, isPDF, setIsPDF, handlePrint } = props;

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Guardar Tarjetas en .PDF</h4>
            <div className="table-responsive">
              <table className="table" ref={ref}>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Codigo de Emisor</th>
                    <th>Numero</th>
                    <th>Fecha de Emision</th>
                    <th>Fecha de Vencimiento</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {tarjetas &&
                    tarjetas.map((tarjeta) => {
                      return (
                        tarjeta.Estado === "A" && (
                          <tr key={tarjeta && tarjeta.Codigo}>
                            <td>{tarjeta && tarjeta.Codigo}</td>
                            <td>{tarjeta && tarjeta.CodigoEmisor}</td>
                            <td>{tarjeta && tarjeta.Numero}</td>
                            <td>{tarjeta && tarjeta.FechaEmision}</td>
                            <td>{tarjeta && tarjeta.FechaVencimiento}</td>
                            <td>
                              {tarjeta && tarjeta.Estado === "A"
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

const PrintTarjeta = ({ tarjetas, isPDF, setIsPDF }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsPDF(!isPDF),
  });

  return (
    <div>
      <ContentToPrint
        tarjetas={tarjetas}
        isPDF={isPDF}
        setIsPDF={setIsPDF}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default PrintTarjeta;
