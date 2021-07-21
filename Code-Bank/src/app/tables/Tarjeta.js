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

import { Apiurl } from '../../services/apirest';

const url = Apiurl + 'Tarjeta/';

const Tarjeta = () => {
  const emptyTarjeta = {
    Codigo: '',
    CodigoEmisor: '',
    Numero: '',
    FechaEmision: '',
    FechaVencimiento: '',
    Estado: ''
  };

  const [tarjetas, setTarjetas] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [tarjeta, setTarjeta] = useState(emptyTarjeta);

  const clearTarjeta = () => {
    setTarjeta({ ...emptyTarjeta });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarjeta((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getTarjetas = async () => {
    await axios.get(url).then((res) => {
      const data = res.data;
      setTarjetas(data);
    });
  };

  // eslint-disable-next-line
  const getTarjetaById = async() => {
    await axios.get(url+tarjeta.Codigo).then(res=>{
      const data = res.data;
      setTarjeta(data);
    })
  }

  const postTarjeta = async () => {
    await axios.post(url, tarjeta).then((res) => {
      const data = res.data;
      setTarjetas(tarjetas.concat(data));
      clearTarjeta();
      getTarjetas();
      setModalInsert(!modalInsert);
    })
  };

  const handlePostTarjeta = () => {
    if (!tarjeta.CodigoEmisor) {
      Swal.fire(
        'Error de ingreso de tarjeta',
        'El campo de codigo de emisor esta vacio',
        'error'
      );
    } else if (!tarjeta.Numero) {
      Swal.fire(
        'Error de ingreso de tarjeta',
        'El campo de numero de tarjeta esta vacio',
        'error'
      );
    } else if (!tarjeta.FechaEmision) {
      Swal.fire(
        'Error de ingreso de tarjeta',
        'El campo de fecha de emision esta vacio',
        'error'
      );
    } else if (!tarjeta.FechaVencimiento) {
        Swal.fire(
          'Error de ingreso de tarjeta',
          'El campo de fecha de vencimiento esta vacio',
          'error'
        );
      } else if (!tarjeta.Estado) {
        Swal.fire(
          'Error de ingreso de tarjeta',
          'El campo de estado esta vacio',
          'error'
        );
      } else {
      postTarjeta();
    }
  };

  const putTarjeta = async () => {
    await axios.put(url + tarjeta.Codigo, tarjeta).then((res) => {
      const newData = tarjetas;
      newData.map((item) => {
        if (tarjeta.Codigo === item.Codigo) {
          item.CodigoEmisor = tarjeta.CodigoEmisor;
          item.Numero = tarjeta.Numero;
          item.FechaEmision = tarjeta.FechaEmision;
          item.FechaVencimiento = tarjeta.FechaVencimiento;
          item.Estado = tarjeta.Estado;
        }
        return newData;
      });
      setTarjetas(newData);
      clearTarjeta();
      getTarjetas();
      setModalUpdate(!modalUpdate);
    });
  };

  const handlePutTarjeta = () => {
    if (!tarjeta.CodigoEmisor) {
      Swal.fire(
        'Error de ingreso de tarjeta',
        'El campo de codigo de emisor esta vacio',
        'error'
      );
    } else if (!tarjeta.Numero) {
      Swal.fire(
        'Error de ingreso de tarjeta',
        'El campo de numero de tarjeta esta vacio',
        'error'
      );
    } else if (!tarjeta.FechaEmision) {
      Swal.fire(
        'Error de ingreso de tarjeta',
        'El campo de fecha de emision esta vacio',
        'error'
      );
    } else if (!tarjeta.FechaVencimiento) {
        Swal.fire(
          'Error de ingreso de tarjeta',
          'El campo de fecha de vencimiento esta vacio',
          'error'
        );
      } else if (!tarjeta.Estado) {
        Swal.fire(
          'Error de ingreso de tarjeta',
          'El campo de estado esta vacio',
          'error'
        );
      } else {
        putTarjeta();
    }
  };

  const deleteTarjeta = async (tarjeta) => { 
    if (tarjeta.Codigo) {
      await axios.delete(url + tarjeta.Codigo).then((res) => {
        setTarjetas(tarjetas.filter((item) => item.Codigo !== tarjeta.Codigo));
        clearTarjeta();
      });
    }
  };

  const handleDeleteTarjeta = (tarjeta) => {
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
        deleteTarjeta(tarjeta);
        Swal.fire(
          'Transacción Completa',
          'La tarjeta se ha eliminado',
          'success'
        );
      }
    });
  }

  useEffect(() => {
    getTarjetas();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mantenimiento Tarjeta</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Codigo de Emisor</th>
                      <th>Numero</th>
                      <th>Fecha de Emision</th>
                      <th>Fecha de Vencimiento</th>
                      <th>Estado</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tarjetas && tarjetas.map((tarjeta) => {
                        return (tarjeta.Estado === "A" &&
                          <tr key={tarjeta && tarjeta.Codigo}>
                            <td>{tarjeta && tarjeta.Codigo}</td>
                            <td>{tarjeta && tarjeta.CodigoEmisor}</td>
                            <td>{tarjeta && tarjeta.Numero}</td>
                            <td>{tarjeta && tarjeta.FechaEmision}</td>
                            <td>{tarjeta && tarjeta.FechaVencimiento}</td>
                            <td>{tarjeta && tarjeta.Estado === "A" ? "Activo" : "Inactivo"}</td>
                            <td>
                              <button className="btn btn-primary" onClick={() => {setTarjeta(tarjeta); setModalUpdate(!modalUpdate)}}>Editar</button>
                            </td>
                            <td>
                              <button className="btn btn-danger" onClick={() => handleDeleteTarjeta(tarjeta)}>Eliminar</button>
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
            <h3>Insertar Tarjeta</h3>
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
            <label>Numero de Tarjeta:</label>
            <input
              className="form-control"
              placeholder="Numero de Tarjeta"
              name="Numero"
              type="text"
              maxLength="50"
              size="50"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Emision:</label>
            <input
              className="form-control"
              placeholder="Fecha de Emision"
              name="FechaEmision"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Vencimiento:</label>
            <input
              className="form-control"
              placeholder="Fecha de Vencimiento"
              name="FechaVencimiento"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={tarjeta && tarjeta.Estado}
              name="Estado"
              type="text"
              onChange={handleChange}
            >
                <option value="">Seleccione un Estado</option>
                <option value="I">Inactivo</option>
                <option value="A">Activo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePostTarjeta()}>
            Insertar
          </Button>
          <Button color="danger" onClick={() => {setModalInsert(!modalInsert); clearTarjeta()}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Tarjeta</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={tarjeta && tarjeta.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo de Emisor:</label>
            <input
              className="form-control"
              placeholder="Codigo de Emisor"
              name="CodigoEmisor"
              type="number"
              value={tarjeta && tarjeta.CodigoEmisor}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Numero de Tarjeta:</label>
            <input
              className="form-control"
              placeholder="Numero de Tarjeta"
              name="Numero"
              type="text"
              maxLength="50"
              size="50"
              value={tarjeta && tarjeta.Numero}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Emision:</label>
            <input
              className="form-control"
              placeholder="Fecha de Emision"
              name="FechaEmision"
              type="date"
              value={tarjeta && tarjeta.FechaEmision}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Vencimiento:</label>
            <input
              className="form-control"
              placeholder="Fecha de Vencimiento"
              name="FechaVencimiento"
              type="date"
              value={tarjeta && tarjeta.FechaVencimiento}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={tarjeta && tarjeta.Estado}
              name="Estado"
              type="text"
              onChange={handleChange}
            >
                <option value="">Seleccione un Estado</option>
                <option value="I">Inactivo</option>
                <option value="A">Activo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutTarjeta()}>
            Editar
          </Button>
          <Button color="danger" onClick={() => {setModalUpdate(!modalUpdate); clearTarjeta()}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Tarjeta;