import React from "react";
import ExcelExport from "../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ prestamos }) => {
  return (
    <ExcelFile className="btn btn-outline-secondary btn-lg btn-block" element="Exportar a Excel" filename="Prestamos">
      <ExcelSheet data={prestamos} name="Prestamo">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Codigo de Usuario" value="CodigoUsuario" />
        <ExcelColumn label="Codigo de Moneda" value="CodigoMoneda" />
        <ExcelColumn label="Monto" value="Monto" />
        <ExcelColumn label="Saldo Pendiente" value="SaldoPendiente" />
        <ExcelColumn label="Tasa de Interes" value="TasaInteres" />
        <ExcelColumn label="Fecha de Emision" value="FechaEmision" />
        <ExcelColumn label="Fecha de Vencimiento" value="FechaVencimiento" />
        <ExcelColumn label="Estado" value="Estado" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
