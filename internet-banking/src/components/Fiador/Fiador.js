import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ModalUpdate from "./ModalUpdate";
import ModalInsert from "./ModalInsert";
import PrintFiador from "./PrintFiador";
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";

import { useFiador } from '../../hooks/useFiador';

const Fiador = () => {
  const emptyFiador = {
    Codigo: '',
    CodigoPrestamo: '',
    Cedula: '',
    Nombre: '',
    Apellidos: '',
    Ocupacion: '',
  };

  const { fiadores, postFiador, putFiador, deleteFiador } = useFiador();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [fiador, setFiador] = useState(emptyFiador);
  const [isPDF, setIsPDF] = useState(false);

  const clearFiador = () => {
    setFiador({ ...emptyFiador });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiador((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1 ? Swal.fire("Error de ingreso de fiador", `El campo de ${campo} está vacio`,"error") :
    option === 2 ? Swal.fire("Error de eliminación de fiador", "El fiador no se ha podido eliminar", "error") :
    Swal.fire("Transacción Completa", "El fiador se ha eliminado", "success")
  };

  const handlePostFiador = () => {
    const { CodigoPrestamo, Cedula, Nombre, Apellidos, Ocupacion } = fiador;

    !CodigoPrestamo 
    ? handleError(1, "codigo de prestamo") 
    : !Cedula 
    ? handleError(1, "cedula")
    : !Nombre 
    ? handleError(1, "nombre")
    : !Apellidos
    ? handleError(1, "apellidos")
    : !Ocupacion
    ? handleError(1, "ocupacion")
    : postFiador(fiador)
    .then(() => setModalInsert(!modalInsert))
    .then(() => clearFiador());
  };

  const handlePutFiador = () => {
    const { CodigoPrestamo, Cedula, Nombre, Apellidos, Ocupacion } = fiador;

    !CodigoPrestamo 
    ? handleError(1, "codigo de prestamo") 
    : !Cedula 
    ? handleError(1, "cedula")
    : !Nombre 
    ? handleError(1, "nombre")
    : !Apellidos
    ? handleError(1, "apellidos")
    : !Ocupacion
    ? handleError(1, "ocupacion")
    : putFiador(fiador)
    .then(() => setModalUpdate(!modalUpdate))
    .then(() => clearFiador());
  };

  const handleDeleteFiador = (fiador) => {
    Swal.fire({
      title: 'Esta seguro de eliminar?',
      text: 'Esta accion no se puede devolver!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        deleteFiador(fiador)
        .then(() => clearFiador())
        .then(() => handleError(3))
        .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isPDF ? (
        <PrintFiador fiadores={fiadores} isPDF={isPDF} setIsPDF={setIsPDF} />
      ) : (
        <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mantenimiento Fiador</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Codigo de Prestamo</th>
                      <th>Cedula</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Ocupacion</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fiadores &&
                      fiadores.map((fiador) => {
                        return (
                          <tr key={fiador && fiador.Codigo}>
                            <td>{fiador && fiador.Codigo}</td>
                            <td>{fiador && fiador.CodigoPrestamo}</td>
                            <td>{fiador && fiador.Cedula}</td>
                            <td>{fiador && fiador.Nombre}</td>
                            <td>{fiador && fiador.Apellidos}</td>
                            <td>{fiador && fiador.Ocupacion}</td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  setFiador(fiador);
                                  setModalUpdate(!modalUpdate);
                                }}
                              >
                                Editar
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteFiador(fiador)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
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
          onClick={() => setModalInsert(!modalInsert)}
        >
          Ingresar
        </button>
        <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={() => setIsPDF(!isPDF)}
          >
            Guardar en PDF
          </button>

          <ExportExcel fiadores={fiadores} />

          <CSVLink className="btn btn-outline-secondary btn-lg btn-block" data={fiadores} filename="Fiadores.csv">Exportar a CSV</CSVLink>
      </div>
      )}

      <ModalInsert
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostFiador={handlePostFiador}
        setModalInsert={setModalInsert}
        clearFiador={clearFiador}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        fiador={fiador}
        handleChange={handleChange}
        handlePutFiador={handlePutFiador}
        setModalUpdate={setModalUpdate}
        clearFiador={clearFiador}
      />
    </>
  );
};

export default Fiador;
