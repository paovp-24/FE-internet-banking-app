import React, { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ContentToPrint = forwardRef((props, ref) => {
  const { cuentas_debito, isPDF, setIsPDF, handlePrint } = props;

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Guardar Cuentas de Debito en .PDF</h4>
            <div className="table-responsive">
              <table className="table" ref={ref}>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Codigo Usuario</th>
                    <th>Codigo Moneda</th>
                    <th>Codigo Sucursal</th>
                    <th>Codigo Tarjeta</th>
                    <th>Descripcion</th>
                    <th>IBAN</th>
                    <th>Saldo</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {cuentas_debito &&
                    cuentas_debito.map((cuenta_debito) => {
                      return (
                        cuenta_debito.Estado === "A" && (
                          <tr key={cuenta_debito && cuenta_debito.Codigo}>
                            <td>{cuenta_debito && cuenta_debito.Codigo}</td>
                            <td>
                              {cuenta_debito && cuenta_debito.CodigoUsuario}
                            </td>
                            <td>
                              {cuenta_debito && cuenta_debito.CodigoMoneda}
                            </td>
                            <td>
                              {cuenta_debito && cuenta_debito.CodigoSucursal}
                            </td>
                            <td>
                              {cuenta_debito && cuenta_debito.CodigoTarjeta}
                            </td>
                            <td>
                              {cuenta_debito && cuenta_debito.Descripcion}
                            </td>
                            <td>{cuenta_debito && cuenta_debito.IBAN}</td>
                            <td>{cuenta_debito && cuenta_debito.Saldo}</td>
                            <td>
                              {cuenta_debito && cuenta_debito.Estado === "A"
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

const PrintCuentaDebito = ({ cuentas_debito, isPDF, setIsPDF }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsPDF(!isPDF),
  });

  return (
    <div>
      <ContentToPrint
        cuentas_debito={cuentas_debito}
        isPDF={isPDF}
        setIsPDF={setIsPDF}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default PrintCuentaDebito;
