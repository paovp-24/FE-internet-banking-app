import React from "react";
import PieChart from "../../components/ChartJS/PieChart";
import DoughnutChart from "../../components/ChartJS/DoughnutChart";
import LineChart from "../../components/ChartJS/LineChart";
import BarChart from "../../components/ChartJS/BarChart";
import { useEmisor } from "../../hooks/useEmisor";
import { useSesion } from "../../hooks/useSesion";
import { useMarchamo } from "../../hooks/useMarchamo";
import { useFiador } from "../../hooks/useFiador";
import { usePromocion } from "../../hooks/usePromocion";
import { useTarjeta } from "../../hooks/useTarjeta";
import { useEstadistica } from "../../hooks/useEstadistica";
import { useInversion } from "../../hooks/useInversion";
import { usePropiedad } from "../../hooks/usePropiedad";
import { useSucursal } from "../../hooks/useSucursal";
import { usePrestamo } from "../../hooks/usePrestamo";
import { useCuenta_Credito } from "../../hooks/useCuenta_Credito";
import { useCuenta_Debito } from "../../hooks/useCuenta_Debito";

import { useCharts } from "../../hooks/useCharts";

const Dashboard = () => {
  //#region Emisor

  const { emisores } = useEmisor();
  const emisorData = emisores.map((emisor) => emisor.NumeroDigitos);
  const filteredEmisorData = emisorData.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
  const doughnutPieEmisor = useCharts(emisorData, filteredEmisorData);
  const emisorDoughnutPie = doughnutPieEmisor.getChartData();

  //#endregion

  //#region Sesion

  const { sesiones } = useSesion();
  const sesionData = sesiones.map((sesion) => sesion.CodigoUsuario);
  const filteredSesionData = sesionData.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
  const doughnutPieSesion = useCharts(sesionData, filteredSesionData);
  const sesionDoughnutPie = doughnutPieSesion.getChartData();

  //#endregion Sesion

  //#region Marchamo

  const { marchamos } = useMarchamo();
  const marchamoData = marchamos.map((marchamo) => marchamo.CodigoUsuario);
  const filteredMarchamoData = marchamoData.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
  const doughnutPieMarchamo = useCharts(
    marchamoData,
    filteredMarchamoData
  );
  const marchamoDoughnutPie = doughnutPieMarchamo.getChartData();

  //#endregion Marchamo

  //#region Fiador

  const { fiadores } = useFiador();
  const fiadorData = fiadores.map((fiador) => fiador.Ocupacion);
  const filteredFiadorData = fiadorData.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
  const doughnutPieFiador = useCharts(
    fiadorData,
    filteredFiadorData
  );
  const fiadorDoughnutPie = doughnutPieFiador.getChartData();

  //#endregion Fiador

  //#region Promocion

  const { promociones } = usePromocion();
  const promocionData = promociones.map((promocion) => promocion.CodigoEmisor);
  const filteredPromocionData = promocionData.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
  const doughnutPiePromocion = useCharts(
    promocionData,
    filteredPromocionData
  );
  const promocionDoughnutPie = doughnutPiePromocion.getChartData();

  //#endregion Promocion

  //#region Tarjeta

  const { tarjetas } = useTarjeta();
  const tarjetaData = tarjetas.map((tarjeta) =>
    tarjeta.Estado === "A" ? "Activo" : "Inactivo"
  );
  const filteredTarjetaData = tarjetaData.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
  const doughnutPieTarjeta = useCharts(tarjetaData, filteredTarjetaData);
  const tarjetaDoughnutPie = doughnutPieTarjeta.getChartData();

  //#endregion Tarjeta

  //#region Estadistica

  const { estadisticas } = useEstadistica();
  const estadisticaData = estadisticas.map(
    (estadistica) => estadistica.Navegador
  );
  const filteredEstadisticaData = estadisticaData.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
  const doughnutPieEstadistica = useCharts(
    estadisticaData,
    filteredEstadisticaData
  );
  const estadisticaDoughnutPie = doughnutPieEstadistica.getChartData();

  //#endregion Estadistica

  //#region Inversion

  const { inversiones } = useInversion();
  const inversionData = inversiones.map((inversion) => inversion.Interes);
  const filteredInversionData = inversionData.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
  const doughnutPieInversion = useCharts(
    inversionData,
    filteredInversionData
  );
  const inversionDoughnutPie = doughnutPieInversion.getChartData();

  //#endregion Inversion

  //#region Propiedad

  const { propiedades } = usePropiedad();
  const propiedadData = propiedades.map((propiedad) => propiedad.Ubicacion);
  const filteredPropiedadData = propiedadData.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
  const doughnutPiePropiedad = useCharts(
    propiedadData,
    filteredPropiedadData
  );
  const propiedadDoughnutPie = doughnutPiePropiedad.getChartData();

  //#endregion Propiedad

  //#region Sucursal

  const { sucursales } = useSucursal();
  const sucursalData = sucursales.map((sucursal) => sucursal.Ubicacion);
  const filteredSucursalData = sucursalData.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
  const doughnutPieSucursal = useCharts(
    sucursalData,
    filteredSucursalData
  );
  const sucursalDoughnutPie = doughnutPieSucursal.getChartData();

  //#endregion Sucursal

  //#region Prestamo

  const { prestamos } = usePrestamo();
  const MontoData = prestamos.map((prestamo) => prestamo.Monto);
  const SaldoPendienteData = prestamos.map(
    (prestamo) => prestamo.SaldoPendiente
  );

  const lineData = {
    labels: MontoData,
    datasets: [
      {
        label: "Monto",
        data: MontoData,
        backgroundColor: "#0066cc",
        borderColor: "#0066cc",
        fill: false,
        tension: 0.1
      },
      {
        label: "Saldo Pendiente",
        data: SaldoPendienteData,
        backgroundColor: "#66ccff",
        borderColor: "#66ccff",
        fill: false,
        tension: 0.1
      },
    ],
  };

  //#endregion Prestamo

  //#region Cuenta_Credito

  const { cuentas_credito } = useCuenta_Credito();
  const cuenta_creditoData = cuentas_credito.map(
    (cuenta_credito) => cuenta_credito.CodigoMoneda
  );
  const filteredCuenta_CreditoData = cuenta_creditoData.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
  const doughnutPieCuenta_Credito = useCharts(
    cuenta_creditoData,
    filteredCuenta_CreditoData
  );
  const cuenta_creditoDoughnutPie =
    doughnutPieCuenta_Credito.getChartData();

  //#endregion Cuenta_Credito

  //#region Cuenta_Credito

  const { cuentas_debito } = useCuenta_Debito();
  const cuenta_debitoData = cuentas_debito.map(
    (cuenta_debito) => cuenta_debito.CodigoMoneda
  );
  const filteredCuenta_DebitoData = cuenta_debitoData.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
  const doughnutPieCuenta_Debito = useCharts(
    cuenta_debitoData,
    filteredCuenta_DebitoData
  );
  const cuenta_debitoDoughnutPie =
    doughnutPieCuenta_Debito.getChartData();

  //#endregion Cuenta_Credito

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Dashboard</h3>
      </div>
      <div className="row">
        <PieChart title="Tarjeta" descripcion="Estado" data={tarjetaDoughnutPie} />
        <PieChart title="Promoción" descripcion="Código Emisor" data={promocionDoughnutPie} />
      </div>
      <div className="row">
        <DoughnutChart title="Emisor" descripcion="Número de digitos" data={emisorDoughnutPie} />
        <DoughnutChart title="Sesión" descripcion="Código de Usuario" data={sesionDoughnutPie} />
      </div>
      <div className="row">
        <DoughnutChart title="Marchamo" descripcion="Código de Usuario" data={marchamoDoughnutPie} />
        <DoughnutChart title="Fiador" descripcion="Ocupación" data={fiadorDoughnutPie} />
      </div>
      <div className="row">
        <LineChart title="Préstamo" descripcion="Monto y Saldo Pendiente" data={lineData} />
      </div>
      <div className="row">
        <BarChart title="Inversión" descripcion="Interés" data={inversionDoughnutPie} />
        <BarChart title="Estadística" descripcion="Navegador" data={estadisticaDoughnutPie} />
      </div>
      <div className="row">
        <BarChart title="Sucursal" descripcion="Ubicación" data={sucursalDoughnutPie} />
        <BarChart title="Propiedad" descripcion="Ubicación" data={propiedadDoughnutPie} />
      </div>
      <div className="row">
        <BarChart title="Cuenta Crédito" descripcion="Código de Moneda" data={cuenta_creditoDoughnutPie} />
        <BarChart title="Cuenta Débito" descripcion="Código de Moneda" data={cuenta_debitoDoughnutPie} />
      </div>
    </div>
  );
};

export default Dashboard;
