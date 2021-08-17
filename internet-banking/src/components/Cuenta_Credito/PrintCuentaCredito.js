import React, { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ContentToPrint = forwardRef((props, ref) => {
  const { cuentas_credito, isPDF, setIsPDF, handlePrint } = props;

  return (
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Guardar Cuentas de Credito en .PDF</h4>
            <div className="table-responsive">
              <table className="table" ref={ref}>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Codigo Usuario</th>
                    <th>Codigo Moneda</th>
                    <th>Codigo Sucursal</th>
                    <th>Codigo Tarjeta</th>
                    <th>Descripción</th>
                    <th>IBAN</th>
                    <th>Saldo</th>
                    <th>Fecha de Pago</th>
                    <th>Pago Minimo</th>
                    <th>Pago Contado</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {cuentas_credito &&
                    cuentas_credito.map((cuenta_credito) => {
                      return (
                        cuenta_credito.Estado === "A" && (
                          <tr key={cuenta_credito && cuenta_credito.Codigo}>
                            <td>{cuenta_credito && cuenta_credito.Codigo}</td>
                            <td>
                              {cuenta_credito && cuenta_credito.CodigoUsuario}
                            </td>
                            <td>
                              {cuenta_credito && cuenta_credito.CodigoMoneda}
                            </td>
                            <td>
                              {cuenta_credito && cuenta_credito.CodigoSucursal}
                            </td>
                            <td>
                              {cuenta_credito && cuenta_credito.CodigoTarjeta}
                            </td>
                            <td>
                              {cuenta_credito && cuenta_credito.Descripción}
                            </td>
                            <td>{cuenta_credito && cuenta_credito.IBAN}</td>
                            <td>{cuenta_credito && cuenta_credito.Saldo}</td>
                            <td>
                              {cuenta_credito && cuenta_credito.FechaPago}
                            </td>
                            <td>
                              {cuenta_credito && cuenta_credito.PagoMinimo}
                            </td>
                            <td>
                              {cuenta_credito && cuenta_credito.PagoContado}
                            </td>
                            <td>
                              {cuenta_credito && cuenta_credito.Estado === "A"
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

const PrintCuentaCredito = ({ cuentas_credito, isPDF, setIsPDF }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsPDF(!isPDF),
  });

  return (
    <div>
      <ContentToPrint
        cuentas_credito={cuentas_credito}
        isPDF={isPDF}
        setIsPDF={setIsPDF}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default PrintCuentaCredito;
