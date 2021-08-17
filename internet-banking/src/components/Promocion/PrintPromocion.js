import React, { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ContentToPrint = forwardRef((props, ref) => {
  const { promociones, isPDF, setIsPDF, handlePrint } = props;

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Guardar Promociones en .PDF</h4>
            <div className="table-responsive">
              <table className="table" ref={ref}>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Codigo Emisor</th>
                    <th>Empresa</th>
                    <th>Fecha de Inicio</th>
                    <th>Fecha de Finalizacion</th>
                    <th>Descuento</th>
                  </tr>
                </thead>
                <tbody>
                  {promociones &&
                    promociones.map((promocion) => {
                      return (
                        <tr key={promocion && promocion.Codigo}>
                          <td>{promocion && promocion.Codigo}</td>
                          <td>{promocion && promocion.CodigoEmisor}</td>
                          <td>{promocion && promocion.Empresa}</td>
                          <td>{promocion && promocion.FechaInicio}</td>
                          <td>{promocion && promocion.FechaFinalizacion}</td>
                          <td>{promocion && promocion.Descuento + "%"}</td>
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

const PrintPromocion = ({ promociones, isPDF, setIsPDF }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      onAfterPrint: () => setIsPDF(!isPDF),
    });
  
    return (
      <div>
        <ContentToPrint
          promociones={promociones}
          isPDF={isPDF}
          setIsPDF={setIsPDF}
          handlePrint={handlePrint}
          ref={componentRef}
        />
      </div>
    );
  };
  
  export default PrintPromocion;
