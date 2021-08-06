import React, { useState, useEffect } from 'react';
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

import { baseUrl } from '../services/API/APIRest';

const url = baseUrl + 'Promocion/';

const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
};

const Promocion = () => {
  const emptyPromocion = {
    Codigo: '',
    CodigoEmisor: '',
    Empresa: '',
    FechaInicio: '',
    FechaFinalizacion: '',
    Descuento: ''
  };

  const [promociones, setPromociones] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [promocion, setPromocion] = useState(emptyPromocion);

  const clearPromocion = () => {
    setPromocion({ ...emptyPromocion });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromocion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getPromociones = async () => {
    await axios.get(url, config).then((res) => {
      const data = res.data;
      setPromociones(data);
    });
  };

  // eslint-disable-next-line
  const getPromocionById = async() => {
    await axios.get(url+promocion.Codigo, config).then(res=>{
      const data = res.data;
      setPromocion(data);
    })
  }

  const postPromocion = async () => {
    await axios.post(url, promocion, config).then((res) => {
      const data = res.data;
      setPromociones(promociones.concat(data));
      clearPromocion();
      getPromociones();
      setModalInsert(!modalInsert);
    })
  };

  const handlePostPromocion = () => {
    if (!promocion.CodigoEmisor) {
      Swal.fire(
        'Error de ingreso de promocion',
        'El campo de codigo de emisor esta vacio',
        'error'
      );
    } else if (!promocion.Empresa) {
      Swal.fire(
        'Error de ingreso de promocion',
        'El campo de empresa esta vacio',
        'error'
      );
    } else if (!promocion.FechaInicio) {
      Swal.fire(
        'Error de ingreso de promocion',
        'El campo de fecha de inicio esta vacio',
        'error'
      );
    } else if (!promocion.FechaFinalizacion) {
        Swal.fire(
          'Error de ingreso de promocion',
          'El campo de fecha de finalizacion esta vacio',
          'error'
        );
      } else if (!promocion.Descuento) {
        Swal.fire(
          'Error de ingreso de promocion',
          'El campo de descuento esta vacio',
          'error'
        );
      } else {
      postPromocion();
    }
  };

  const putPromocion = async () => {
    await axios.put(url + promocion.Codigo, promocion, config).then((res) => {
      const newData = promociones;
      newData.map((item) => {
        if (promocion.Codigo === item.Codigo) {
          item.CodigoEmisor = promocion.CodigoEmisor;
          item.Empresa = promocion.Empresa;
          item.FechaInicio = promocion.FechaInicio;
          item.FechaFinalizacion = promocion.FechaFinalizacion;
          item.Descuento = promocion.Descuento;
        }
        return newData;
      });
      setPromociones(newData);
      clearPromocion();
      getPromociones();
      setModalUpdate(!modalUpdate);
    });
  };

  const handlePutPromocion = () => {
    if (!promocion.CodigoEmisor) {
      Swal.fire(
        'Error de ingreso de promocion',
        'El campo de codigo de emisor esta vacio',
        'error'
      );
    } else if (!promocion.Empresa) {
      Swal.fire(
        'Error de ingreso de promocion',
        'El campo de empresa esta vacio',
        'error'
      );
    } else if (!promocion.FechaInicio) {
      Swal.fire(
        'Error de ingreso de promocion',
        'El campo de fecha de inicio esta vacio',
        'error'
      );
    } else if (!promocion.FechaFinalizacion) {
        Swal.fire(
          'Error de ingreso de promocion',
          'El campo de fecha de finalizacion esta vacio',
          'error'
        );
      } else if (!promocion.Descuento) {
        Swal.fire(
          'Error de ingreso de promocion',
          'El campo de descuento esta vacio',
          'error'
        );
      } else {
        putPromocion();
    }
  };

  const deletePromocion = async (promocion) => { 
    if (promocion.Codigo) {
      await axios.delete(url + promocion.Codigo, config).then((res) => {
        setPromociones(promociones.filter((item) => item.Codigo !== promocion.Codigo));
        clearPromocion();
      });
    }
  };

  const handleDeletePromocion = (promocion) => {
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
        deletePromocion(promocion);
        Swal.fire(
          'Transacción Completa',
          'La promocion se ha eliminado',
          'success'
        );
      }
    });
  }

  useEffect(() => {
    getPromociones();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mantenimiento Promocion</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Codigo Emisor</th>
                      <th>Empresa</th>
                      <th>Fecha de Inicio</th>
                      <th>Fecha de Finalizacion</th>
                      <th>Descuento</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promociones && promociones.map((promocion) => {
                        return (
                          <tr key={promocion && promocion.Codigo}>
                            <td>{promocion && promocion.Codigo}</td>
                            <td>{promocion && promocion.CodigoEmisor}</td>
                            <td>{promocion && promocion.Empresa}</td>
                            <td>{promocion && promocion.FechaInicio}</td>
                            <td>{promocion && promocion.FechaFinalizacion}</td>
                            <td>{promocion && promocion.Descuento + "%"}</td>
                            <td>
                              <button className="btn btn-primary" onClick={() => {setPromocion(promocion); setModalUpdate(!modalUpdate)}}>Editar</button>
                            </td>
                            <td>
                              <button className="btn btn-danger" onClick={() => handleDeletePromocion(promocion)}>Eliminar</button>
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
        <button className="btn btn-outline-secondary btn-lg btn-block" onClick={() => setModalInsert(!modalInsert)}>Ingresar</button>
      </div>

      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Promocion</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo de Emisor:</label>
            <input
              className="form-control"
              placeholder="Codigo de Emisor"
              name="CodigoEmisor"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Empresa:</label>
            <input
              className="form-control"
              placeholder="Empresa"
              name="Empresa"
              type="text"
              maxLength="50"
              size="50"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Inicio:</label>
            <input
              className="form-control"
              placeholder="Fecha de Inicio"
              name="FechaInicio"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Finalizacion:</label>
            <input
              className="form-control"
              placeholder="Fecha de Finalizacion"
              name="FechaFinalizacion"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descuento:</label>
            <input
              className="form-control"
              placeholder="Descuento"
              name="Descuento"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePostPromocion()}>
            Insertar
          </Button>
          <Button color="danger" onClick={() => {setModalInsert(!modalInsert); clearPromocion()}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Promocion</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={promocion && promocion.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo de Emisor:</label>
            <input
              className="form-control"
              placeholder="Codigo de Emisor"
              value={promocion && promocion.CodigoEmisor}
              name="CodigoEmisor"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Empresa:</label>
            <input
              className="form-control"
              placeholder="Empresa"
              value={promocion && promocion.Empresa}
              name="Empresa"
              type="text"
              maxLength="50"
              size="50"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Inicio:</label>
            <input
              className="form-control"
              placeholder="Fecha de Inicio"
              value={promocion && promocion.FechaInicio}
              name="FechaInicio"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Finalizacion:</label>
            <input
              className="form-control"
              placeholder="Fecha de Finalizacion"
              value={promocion && promocion.FechaFinalizacion}
              name="FechaFinalizacion"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descuento:</label>
            <input
              className="form-control"
              placeholder="Descuento"
              value={promocion && promocion.Descuento}
              name="Descuento"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutPromocion()}>
            Editar
          </Button>
          <Button color="danger" onClick={() => {setModalUpdate(!modalUpdate); clearPromocion()}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Promocion;