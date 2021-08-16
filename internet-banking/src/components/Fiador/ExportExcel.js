import React from "react";
import ExcelExport from "../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ fiadores }) => {
  return (
    <ExcelFile className="btn btn-outline-secondary btn-lg btn-block" element="Exportar a Excel" filename="Fiadores">
      <ExcelSheet data={fiadores} name="Fiador">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Codigo Prestamo" value="CodigoPrestamo" />
        <ExcelColumn label="Cedula" value="Cedula" />
        <ExcelColumn label="Nombre" value="Nombre" />
        <ExcelColumn label="Apellidos" value="Apellidos" />
        <ExcelColumn label="Ocupacion" value="Ocupacion" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
