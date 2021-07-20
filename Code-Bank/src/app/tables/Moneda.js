import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from 'reactstrap';
import Swal from 'sweetalert2';

import { Apiurl } from '../../services/apirest';

const url = Apiurl + 'Moneda/';

const Moneda = () => {
  const emptyMoneda = {
    Codigo: '',
    Descripcion: '',
    Estado: '',
  };

  const [monedas, setMonedas] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [moneda, setMoneda] = useState(emptyMoneda);

  const clearMoneda = () => {
    setMoneda({ ...emptyMoneda });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMoneda((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getMonedas = async () => {
    await axios.get(url).then((res) => {
      const data = res.data;
      setMonedas(data);
    });
  };

  /*const getMonedasById = async() => {
    await axios.get(url+moneda.Codigo).then(res=>{
      const data = res.data;
      setMoneda(data);
    })
  }*/

  const postMoneda = async () => {
    await axios.post(url, moneda).then((res) => {
      const data = res.data;
      setMonedas(monedas.concat(data));
      clearMoneda();
      getMonedas();
      setModalInsert(!modalInsert);
    });
  };

  const handlePostMoneda = () => {
    if (!moneda.Descripcion) {
      Swal.fire(
        'Error de ingreso de moneda',
        'El campo de descripcion esta vacio',
        'error'
      );
    } else if (!moneda.Estado) {
      Swal.fire(
        'Error de ingreso de moneda',
        'El campo de estado esta vacio',
        'error'
      );
    } else {
      postMoneda();
    }
  };

  const putMoneda = async () => {
    await axios.put(url + moneda.Codigo, moneda).then((res) => {
      const newData = monedas;
      newData.map((item) => {
        if (moneda.Codigo === item.Codigo) {
          item.Descripcion = moneda.Descripcion;
          item.Estado = moneda.Estado;
        }
        return newData;
      });
      setMonedas(newData);
      clearMoneda();
      getMonedas();
      setModalUpdate(!modalUpdate);
    });
  };

  const handlePutMoneda = () => {
    if (!moneda.Descripcion) {
      Swal.fire(
        'Error de ingreso de moneda',
        'El campo de descripcion esta vacio',
        'error'
      );
    } else if (!moneda.Estado) {
      Swal.fire(
        'Error de ingreso de moneda',
        'El campo de estado esta vacio',
        'error'
      );
    } else {
      putMoneda();
    }
  };

  const deleteMoneda = async () => {
    await axios.delete(url + moneda.Codigo).then((res) => {
      setMonedas(monedas.filter((item) => item.Codigo !== moneda.Codigo));
    });
  };

  const selectMoneda = (moneda) => {
    setMoneda(moneda);
  };

  useEffect(() => {
    getMonedas();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mantenimiento Moneda</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Descripcion</th>
                      <th>Estado</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monedas &&
                      monedas.map((moneda) => {
                        return (
                          <tr key={moneda && moneda.Codigo}>
                            <td>{moneda && moneda.Codigo}</td>
                            <td>{moneda && moneda.Descripcion}</td>
                            <td>{moneda && moneda.Estado}</td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  selectMoneda(moneda);
                                  setModalUpdate(!modalUpdate);
                                }}
                              >
                                Editar
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  selectMoneda(moneda);

                                  Swal.fire({
                                    title: 'Esta seguro de eliminar?',
                                    text: 'Esta accion no puede devolver!',
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Confirmar',
                                    cancelButtonText: 'Cancelar',
                                  }).then((resulto) => {
                                    console.log(resulto);
                                    if (resulto.value) {
                                      deleteMoneda();
                                      Swal.fire(
                                        'Transacción Completa',
                                        'La moneda se ha eliminado',
                                        'success'
                                      );
                                    } else {
                                    }
                                  });
                                }}
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
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Moneda</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            {/* <label>Descripcion:</label> */}
            <input
              className="form-control"
              placeholder="Descripcion"
              name="Descripcion"
              type="text"
              maxLength="20"
              size="20"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="exampleFormControlSelect2">Estado:</label>
            <select
              name="Estado"
              type="text"
              value={moneda && moneda.Estado}
              onChange={handleChange}
              className="form-control"
              id="exampleFormControlSelect2"
            >
              <option value="I">Inactivo</option>
              <option value="A">Activo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePostMoneda()}>
            Insertar
          </Button>
          <Button color="danger" onClick={() => setModalInsert(!modalInsert)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Moneda</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={moneda && moneda.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <Form.Group>
              <label>Descripcion:</label>
              <input
                className="form-control"
                name="Descripcion"
                type="text"
                maxLength="20"
                size="20"
                value={moneda && moneda.Descripcion}
                onChange={handleChange}
              />
            </Form.Group>
          </FormGroup>

          <FormGroup>
            <label htmlFor="exampleFormControlSelect2">Estado:</label>
            <select
              name="Estado"
              type="text"
              value={moneda && moneda.Estado}
              onChange={handleChange}
              className="form-control"
              id="exampleFormControlSelect2"
            >
              <option value="I">Inactivo</option>
              <option value="A">Activo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutMoneda()}>
            Editar
          </Button>
          <Button color="danger" onClick={() => setModalUpdate(!modalUpdate)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Moneda;
