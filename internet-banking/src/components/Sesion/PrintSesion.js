import React, { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ContentToPrint = forwardRef((props, ref) => {
  const { sesiones, isPDF, setIsPDF, handlePrint } = props;

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Guardar Sesiones en .PDF</h4>
            <div className="table-responsive">
              <table className="table" ref={ref}>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Codigo de Usuario</th>
                    <th>Fecha de Inicio</th>
                    <th>Fecha de Expiracion</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {sesiones &&
                    sesiones.map((sesion) => {
                      return (sesion.Estado === "A" &&
                        <tr key={sesion && sesion.Codigo}>
                          <td>{sesion && sesion.Codigo}</td>
                          <td>{sesion && sesion.CodigoUsuario}</td>
                          <td>{sesion && sesion.FechaInicio}</td>
                          <td>{sesion && sesion.FechaExpiracion}</td>
                          <td>{sesion && sesion.Estado === "A" ? "Activo" : "Inactivo"}</td>
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

const PrintSesion = ({ sesiones, isPDF, setIsPDF }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsPDF(!isPDF),
  });

  return (
    <div>
      <ContentToPrint sesiones={sesiones} isPDF={isPDF} setIsPDF={setIsPDF} handlePrint={handlePrint} ref={componentRef} />
    </div>
  );
};

export default PrintSesion;
