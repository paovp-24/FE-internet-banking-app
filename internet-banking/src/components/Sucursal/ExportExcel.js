import React from "react";
import ExcelExport from "../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ sucursales }) => {
  return (
    <ExcelFile className="btn btn-outline-secondary btn-lg btn-block" element="Exportar a Excel" filename="Sucursales">
      <ExcelSheet data={sucursales} name="Sucursal">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Nombre" value="Nombre" />
        <ExcelColumn label="Ubicacion" value="Ubicacion" />
        <ExcelColumn label="Correo" value="Correo" />
        <ExcelColumn label="Telefono" value="Telefono" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
