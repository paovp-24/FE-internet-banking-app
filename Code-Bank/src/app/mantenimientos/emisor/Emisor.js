import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalUpdate from "./ModalUpdate";
import ModalInsert from "./ModalInsert";
import Swal from "sweetalert2";

import { baseUrl, config } from "../../../services/apirest";
const url = baseUrl + "Emisor/";

const Emisor = () => {
  const emptyEmisor = {
    Codigo: "",
    Descripcion: "",
    Prefijo: "",
    NumeroDigitos: "",
  };

  const [emisores, setEmisores] = useState([]);
  const [emisor, setEmisor] = useState(emptyEmisor);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const clearEmisor = () => {
    setEmisor({ ...emptyEmisor });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmisor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1 ? Swal.fire("Error de ingreso de emisor", `El campo de ${campo} está vacio`, "error") 
    : Swal.fire("Transacción Completa", "El emisor se ha eliminado", "success");
  };

  const getEmisores = async () => {
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setEmisores(data);
    });
  };

  // eslint-disable-next-line
  const getEmisoresById = async () => {
    await axios.get(url + emisor.Codigo, config).then((response) => {
      const { data } = response;
      setEmisor(data);
    });
  };

  const postEmisor = async () => {
    await axios.post(url, emisor, config).then((response) => {
      const { data } = response;
      setEmisores(emisores.concat(data));
      clearEmisor();
      getEmisores();
      setModalInsert(!modalInsert);
    });
  };

  const handlePostEmisor = () => {
    const { Descripcion, Prefijo, NumeroDigitos } = emisor;

    !Descripcion
      ? handleError(1, "descripción")
      : !Prefijo
      ? handleError(1, "prefijo")
      : !NumeroDigitos
      ? handleError(1, "número de digitos")
      : postEmisor();
  };

  const putEmisor = async () => {
    await axios.put(url + emisor.Codigo, emisor, config).then((response) => {
      const newData = emisores;
      newData.map((item) => {
        if (emisor.Codigo === item.Codigo) {
          item.Descripcion = emisor.Descripcion;
          item.Prefijo = emisor.Prefijo;
          item.NumeroDigitos = emisor.NumeroDigitos;
        }
        return newData;
      });
      setEmisores(newData);
      clearEmisor();
      getEmisores();
      setModalUpdate(!modalUpdate);
    });
  };

  const handlePutEmisor = () => {
    const { Descripcion, Prefijo, NumeroDigitos } = emisor;

    !Descripcion
      ? handleError(1, "descripción")
      : !Prefijo
      ? handleError(1, "prefijo")
      : !NumeroDigitos
      ? handleError(1, "número de digitos")
      : putEmisor();
  };

  const deleteEmisor = async (emisor) => {
    if (emisor.Codigo) {
      await axios.delete(url + emisor.Codigo, config).then((res) => {
        const newData = emisores.filter(
          (item) => item.Codigo !== emisor.Codigo
        );
        setEmisores(newData);
        clearEmisor();
      });
    }
  };

  const handleDeleteEmisor = (emisor) => {
    Swal.fire({
      title: "Está seguro de eliminar?",
      text: "Esta acción no se puede devolver!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        deleteEmisor(emisor);
        handleError(2);
      }
    });
  };

  useEffect(() => {
    getEmisores();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mantenimiento Emisor</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Descripcion</th>
                      <th>Prefijo</th>
                      <th>Numero Digitos</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emisores &&
                      emisores.map((emisor) => {
                        return (
                          <tr key={emisor && emisor.Codigo}>
                            <td>{emisor && emisor.Codigo}</td>
                            <td>{emisor && emisor.Descripcion}</td>
                            <td>{emisor && emisor.Prefijo}</td>
                            <td>{emisor && emisor.NumeroDigitos}</td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  setEmisor(emisor);
                                  setModalUpdate(!modalUpdate);
                                }}
                              >
                                Editar
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteEmisor(emisor)}
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
      </div>

      <ModalInsert
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostEmisor={handlePostEmisor}
        setModalInsert={setModalInsert}
        clearEmisor={clearEmisor}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        emisor={emisor}
        handleChange={handleChange}
        handlePutEmisor={handlePutEmisor}
        setModalUpdate={setModalUpdate}
        clearEmisor={clearEmisor} 
      />
    </>
  );
};

export default Emisor;
