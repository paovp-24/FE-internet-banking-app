import React from "react";
import ExcelExport from "../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ emisores }) => {
  return (
    <ExcelFile className="btn btn-outline-secondary btn-lg btn-block" element="Exportar a Excel" filename="Emisores">
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
