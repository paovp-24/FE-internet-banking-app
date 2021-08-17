import React from "react";
import ExcelExport from "../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ promociones }) => {
  return (
    <ExcelFile className="btn btn-outline-secondary btn-lg btn-block" element="Exportar a Excel" filename="Promociones">
      <ExcelSheet data={promociones} name="Promocion">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Codigo de Emisor" value="CodigoEmisor" />
        <ExcelColumn label="Empresa" value="Empresa" />
        <ExcelColumn label="Fecha de Inicio" value="FechaInicio" />
        <ExcelColumn label="Fecha de Finalizacion" value="FechaFinalizacion" />
        <ExcelColumn label="Descuento" value="Descuento" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
