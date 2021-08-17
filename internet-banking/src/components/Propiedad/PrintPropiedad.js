import React, { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ContentToPrint = forwardRef((props, ref) => {
  const { propiedades, isPDF, setIsPDF, handlePrint } = props;

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Guardar Propiedades en .PDF</h4>
            <div className="table-responsive">
              <table className="table" ref={ref}>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Codigo de Usuario</th>
                    <th>Ubicacion</th>
                    <th>Dimension</th>
                    <th>Descripcion</th>
                    <th>Estado</th>
                    <th>Precio Fiscal</th>
                  </tr>
                </thead>
                <tbody>
                  {propiedades &&
                    propiedades.map((propiedad) => {
                      return (
                        propiedad.Estado === "A" && (
                          <tr key={propiedad && propiedad.Codigo}>
                            <td>{propiedad && propiedad.Codigo}</td>
                            <td>{propiedad && propiedad.CodigoUsuario}</td>
                            <td>{propiedad && propiedad.Ubicacion}</td>
                            <td>{propiedad && propiedad.Dimension}</td>
                            <td>{propiedad && propiedad.Descripcion}</td>
                            <td>
                              {propiedad && propiedad.Estado === "A"
                                ? "Activo"
                                : "Inactivo"}
                            </td>
                            <td>{propiedad && propiedad.PrecioFiscal}</td>
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

const PrintPropiedad = ({ propiedades, isPDF, setIsPDF }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      onAfterPrint: () => setIsPDF(!isPDF),
    });
  
    return (
      <div>
        <ContentToPrint
          propiedades={propiedades}
          isPDF={isPDF}
          setIsPDF={setIsPDF}
          handlePrint={handlePrint}
          ref={componentRef}
        />
      </div>
    );
  };
  
  export default PrintPropiedad;
