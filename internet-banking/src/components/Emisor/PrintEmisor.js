import React, { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ContentToPrint = forwardRef((props, ref) => {
  const { emisores, isPDF, setIsPDF, handlePrint } = props;

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Guardar Emisores en .PDF</h4>
            <div className="table-responsive">
              <table className="table" ref={ref}>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Descripcion</th>
                    <th>Prefijo</th>
                    <th>Numero Digitos</th>
                  </tr>
                </thead>
                <tbody>
                  {emisores &&
                    emisores.map((emisor) => {
                      return (
                        <tr key={emisor && emisor.Codigo}>
                          <td>{emisor && emisor.Codigo}</td>
                          <td>{emisor && emisor.Descripcion}</td>
                          <td>{emisor && emisor.Prefijo}</td>
                          <td>{emisor && emisor.NumeroDigitos}</td>
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

const PrintEmisor = ({ emisores, isPDF, setIsPDF }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsPDF(!isPDF),
  });

  return (
    <div>
      <ContentToPrint emisores={emisores} isPDF={isPDF} setIsPDF={setIsPDF} handlePrint={handlePrint} ref={componentRef} />
    </div>
  );
};

export default PrintEmisor;
