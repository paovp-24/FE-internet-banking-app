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

const url = Apiurl + 'Sucursal/';

const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
};

const Sucursal = () => {
  const emptySucursal = {
    Codigo: '',
    Nombre: '',
    Ubicacion: '',
    Correo: '',
    Telefono: '',
  };

  const [sucursales, setSucursales] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [sucursal, setSucursal] = useState(emptySucursal);

  const clearSucursal = () => {
    setSucursal({ ...emptySucursal });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSucursal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getSucursales = async () => {
    await axios.get(url, config).then((res) => {
      const data = res.data;
      setSucursales(data);
    });
  };

  // eslint-disable-next-line
  const getSucursalesById = async () => {
    await axios.get(url + sucursal.Codigo, config).then((res) => {
      const data = res.data;
      setSucursal(data);
    });
  };

  const postSucursal = async () => {
    await axios.post(url, sucursal, config).then((res) => {
      const data = res.data;
      setSucursales(sucursales.concat(data));
      clearSucursal();
      getSucursales();
      setModalInsert(!modalInsert);
    });
  };

  const handlePostSucursal = () => {
    if (!sucursal.Nombre) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de nombre esta vacio',
        'error'
      );
    } else if (!sucursal.Ubicacion) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de ubicacion esta vacio',
        'error'
      );
    } else if (!sucursal.Correo) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de correo esta vacio',
        'error'
      );
    } else if (!sucursal.Telefono) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de telefono esta vacio',
        'error'
      );
    } else {
      postSucursal();
    }
  };

  const putSucursal = async () => {
    await axios.put(url + sucursal.Codigo, sucursal, config).then((res) => {
      const newData = sucursales;
      newData.map((item) => {
        if (sucursal.Codigo === item.Codigo) {
          item.Nombre = sucursal.Nombre;
          item.Ubicacion = sucursal.Ubicacion;
          item.Correo = sucursal.Correo;
          item.Telefono = sucursal.Telefono;
        }
        return newData;
      });
      setSucursales(newData);
      clearSucursal();
      getSucursales();
      setModalUpdate(!modalUpdate);
    });
  };

  const handlePutSucursal = () => {
    if (!sucursal.Nombre) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de nombre esta vacio',
        'error'
      );
    } else if (!sucursal.Ubicacion) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de ubicacion esta vacio',
        'error'
      );
    } else if (!sucursal.Correo) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de correo esta vacio',
        'error'
      );
    } else if (!sucursal.Telefono) {
      Swal.fire(
        'Error de ingreso de emisor',
        'El campo de telefono esta vacio',
        'error'
      );
    } else {
      putSucursal();
    }
  };

  const deleteSucursal = async (sucursal) => {
    if (sucursal.Codigo) {
      await axios.delete(url + sucursal.Codigo, config).then((res) => {
        setSucursales(
          sucursales.filter((item) => item.Codigo !== sucursal.Codigo)
        );
        clearSucursal();
      });
    }
  };

  const handleDeleteSucursal = (sucursal) => {
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
        deleteSucursal(sucursal);
        Swal.fire(
          'Transacción Completa',
          'La sucursal se ha eliminado',
          'success'
        );
      }
    });
  };

  useEffect(() => {
    getSucursales();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mantenimiento Sucursal</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Nombre</th>
                      <th>Ubicacion</th>
                      <th>Correo</th>
                      <th>Telefono</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sucursales &&
                      sucursales.map((sucursal) => {
                        return (
                          <tr key={sucursal && sucursal.Codigo}>
                            <td>{sucursal && sucursal.Codigo}</td>
                            <td>{sucursal && sucursal.Nombre}</td>
                            <td>{sucursal && sucursal.Ubicacion}</td>
                            <td>{sucursal && sucursal.Correo}</td>
                            <td>{sucursal && sucursal.Telefono}</td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  setSucursal(sucursal);
                                  setModalUpdate(!modalUpdate);
                                }}
                              >
                                Editar
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteSucursal(sucursal)}
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
            <h3>Insertar Sucursal</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              placeholder="Nombre"
              name="Nombre"
              type="text"
              maxLength="100"
              size="100"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Ubicacion:</label>
            <input
              className="form-control"
              placeholder="Ubicacion"
              name="Ubicacion"
              type="text"
              maxLength="100"
              size="100"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Correo:</label>
            <input
              className="form-control"
              placeholder="Correo"
              name="Correo"
              type="text"
              maxLength="50"
              size="50"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Telefono:</label>
            <input
              className="form-control"
              placeholder="Telefono"
              name="Telefono"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePostSucursal()}>
            Insertar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearSucursal();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Sucursal</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={sucursal && sucursal.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <Form.Group>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                maxLength="100"
                size="100"
                value={sucursal && sucursal.Nombre}
                onChange={handleChange}
              />
            </Form.Group>
          </FormGroup>

          <FormGroup>
            <Form.Group>
              <label>Ubicacion:</label>
              <input
                className="form-control"
                name="Ubicacion"
                type="text"
                maxLength="100"
                size="100"
                value={sucursal && sucursal.Ubicacion}
                onChange={handleChange}
              />
            </Form.Group>
          </FormGroup>

          <FormGroup>
            <Form.Group>
              <label>Correo:</label>
              <input
                className="form-control"
                name="Correo"
                type="text"
                value={sucursal && sucursal.Correo}
                maxLength="50"
                size="50"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <label>Telefono:</label>
              <input
                className="form-control"
                name="Telefono"
                type="number"
                value={sucursal && sucursal.Telefono}
                onChange={handleChange}
              />
            </Form.Group>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutSucursal()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearSucursal();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Sucursal;
