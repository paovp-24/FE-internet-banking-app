import React from "react";
import ExcelExport from "../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ inversiones }) => {
  return (
    <ExcelFile className="btn btn-outline-secondary btn-lg btn-block" element="Exportar a Excel" filename="Inversiones">
      <ExcelSheet data={inversiones} name="Inversion">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Codigo de Usuario" value="CodigoUsuario" />
        <ExcelColumn label="Codigo de Moneda" value="CodigoMoneda" />
        <ExcelColumn label="Monto" value="Monto" />
        <ExcelColumn label="Interes" value="Interes" />
        <ExcelColumn label="Liquidez" value="Liquidez" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;