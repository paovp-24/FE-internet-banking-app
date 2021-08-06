import React from "react";
import ExcelExport from "react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ emisores }) => {
  return (
    <ExcelFile element={<button className="btn btn-outline-secondary btn-lg btn-block">Exportar a Excel</button>} filename="Emisores">
      <ExcelSheet data={emisores} name="Emisor">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Descripcion" value="Descripcion" />
        <ExcelColumn label="Prefijo" value="Prefijo" />
        <ExcelColumn label="Numero de Digitos" value="NumeroDigitos" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
