import React from "react";
import ExcelExport from "../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ propiedades }) => {
  return (
    <ExcelFile className="btn btn-outline-secondary btn-lg btn-block" element="Exportar a Excel" filename="Propiedades">
      <ExcelSheet data={propiedades} name="Propiedad">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Codigo de Usuario" value="CodigoUsuario" />
        <ExcelColumn label="Ubicacion" value="Ubicacion" />
        <ExcelColumn label="Dimension" value="Dimension" />
        <ExcelColumn label="Descripcion" value="Descripcion" />
        <ExcelColumn label="Estado" value="Estado" />
        <ExcelColumn label="Precio Fiscal" value="PrecioFiscal" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
