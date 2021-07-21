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

const url = Apiurl + 'Emisor/';

const Emisor = () => {
  const emptyEmisor = {
    Codigo: '',
    Descripcion: '',
    Prefijo: '',
    NumeroDigitos: '',
  };

  const [emisores, setEmisores] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [emisor, setEmisor] = useState(emptyEmisor);

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

  const getEmisores = async () => {
    await axios.get(url, config).then((res) => {
      const data = res.data;
      setEmisores(data);
    });
  };

  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  // eslint-disable-next-line
  const getEmisoresById = async () => {
    console.log(localStorage.getItem('token'));
    await axios.get(url + emisor.Codigo, config).then((res) => {
      const data = res.data;
      setEmisor(data);
    });
  };

  const postEmisor = async () => {
    await axios.post(url, emisor, config).then((res) => {
      const data = res.data;
      setEmisores(emisores.concat(data));
      clearEmisor();
      getEmisores();
      setModalInsert(!modalInsert);
    });
  };

  const handlePostEmisor = () => {
    if (!emisor.Descripcion) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de descripcion esta vacio',
        'error'
      );
    } else if (!emisor.Prefijo) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de prefijo esta vacio',
        'error'
      );
    } else if (!emisor.NumeroDigitos) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de numero de digitos esta vacio',
        'error'
      );
    } else {
      postEmisor();
    }
  };

  const putEmisor = async () => {
    await axios.put(url + emisor.Codigo, emisor, config).then((res) => {
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
    if (!emisor.Descripcion) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de descripcion esta vacio',
        'error'
      );
    } else if (!emisor.Prefijo) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de prefijo esta vacio',
        'error'
      );
    } else if (!emisor.NumeroDigitos) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de numero de digitos esta vacio',
        'error'
      );
    } else {
      putEmisor();
    }
  };

  const deleteEmisor = async (emisor) => {
    if (emisor.Codigo) {
      await axios.delete(url + emisor.Codigo, config).then((res) => {
        setEmisores(emisores.filter((item) => item.Codigo !== emisor.Codigo));
        clearEmisor();
      });
    }
  };

  const handleDeleteEmisor = (emisor) => {
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
        deleteEmisor(emisor);
        Swal.fire(
          'Transacción Completa',
          'El emisor se ha eliminado',
          'success'
        );
      }
    });
  };

  useEffect(() => {
    getEmisores();
  }, []);

  return (
    <div>
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

      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Emisor</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Descripcion:</label>
            <input
              className="form-control"
              placeholder="Descripcion"
              name="Descripcion"
              type="text"
              maxLength="50"
              size="50"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Prefijo:</label>
            <input
              className="form-control"
              placeholder="Prefijo"
              name="Prefijo"
              type="text"
              maxLength="10"
              size="10"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Numero de Digitos:</label>
            <input
              className="form-control"
              placeholder="Numero de Digitos"
              name="NumeroDigitos"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePostEmisor()}>
            Insertar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearEmisor();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Emisor</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={emisor && emisor.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <Form.Group>
              <label>Descripcion:</label>
              <input
                className="form-control"
                name="Descripcion"
                type="text"
                maxLength="50"
                size="50"
                value={emisor && emisor.Descripcion}
                onChange={handleChange}
              />
            </Form.Group>
          </FormGroup>

          <FormGroup>
            <Form.Group>
              <label>Prefijo:</label>
              <input
                className="form-control"
                name="Prefijo"
                type="text"
                maxLength="10"
                size="10"
                value={emisor && emisor.Prefijo}
                onChange={handleChange}
              />
            </Form.Group>
          </FormGroup>

          <FormGroup>
            <Form.Group>
              <label>Numero de Digitos:</label>
              <input
                className="form-control"
                name="NumeroDigitos"
                type="number"
                value={emisor && emisor.NumeroDigitos}
                onChange={handleChange}
              />
            </Form.Group>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutEmisor()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearEmisor();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Emisor;
