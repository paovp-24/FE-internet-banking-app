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

import { baseUrl } from '../../services/apirest';

const url = baseUrl + 'Inversion/';

const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
};

const Inversion = () => {
  const emptyInversion = {
    Codigo: '',
    CodigoUsuario: '',
    CodigoMoneda: '',
    Monto: '',
    Interes: '',
    Liquidez: ''
  };

  const [inversiones, setInversiones] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [inversion, setInversion] = useState(emptyInversion);

  const clearInversion = () => {
    setInversion({ ...emptyInversion });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInversion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getInversiones = async () => {
    await axios.get(url, config).then((res) => {
      const data = res.data;
      setInversiones(data);
    });
  };

  // eslint-disable-next-line
  const getInversionById = async() => {
    await axios.get(url+inversion.Codigo, config).then(res=>{
      const data = res.data;
      setInversion(data);
    })
  }

  const postInversion = async () => {
    await axios.post(url, inversion, config).then((res) => {
      const data = res.data;
      setInversiones(inversiones.concat(data));
      clearInversion();
      getInversiones();
      setModalInsert(!modalInsert);
    })
  };

  const handlePostInversion = () => {
    if (!inversion.CodigoUsuario) {
      Swal.fire(
        'Error de ingreso de inversion',
        'El campo de codigo de usuario esta vacio',
        'error'
      );
    } else if (!inversion.CodigoMoneda) {
      Swal.fire(
        'Error de ingreso de inversion',
        'El campo de codigo de moneda esta vacio',
        'error'
      );
    } else if (!inversion.Monto) {
      Swal.fire(
        'Error de ingreso de inversion',
        'El campo de monto esta vacio',
        'error'
      );
    } else if (!inversion.Interes) {
        Swal.fire(
          'Error de ingreso de inversion',
          'El campo de interes esta vacio',
          'error'
        );
      } else if (!inversion.Liquidez) {
        Swal.fire(
          'Error de ingreso de inversion',
          'El campo de liquidez esta vacio',
          'error'
        );
      } else {
      postInversion();
    }
  };

  const putInversion = async () => {
    await axios.put(url + inversion.Codigo, inversion, config).then((res) => {
      const newData = inversiones;
      newData.map((item) => {
        if (inversion.Codigo === item.Codigo) {
          item.CodigoUsuario = inversion.CodigoUsuario;
          item.CodigoMoneda = inversion.CodigoMoneda;
          item.Monto = inversion.Monto;
          item.Interes = inversion.Interes;
          item.Liquidez = inversion.Liquidez;
        }
        return newData;
      });
      setInversiones(newData);
      clearInversion();
      getInversiones();
      setModalUpdate(!modalUpdate);
    });
  };

  const handlePutInversion = () => {
    if (!inversion.CodigoUsuario) {
      Swal.fire(
        'Error de ingreso de inversion',
        'El campo de codigo de usuario esta vacio',
        'error'
      );
    } else if (!inversion.CodigoMoneda) {
      Swal.fire(
        'Error de ingreso de inversion',
        'El campo de codigo de moneda esta vacio',
        'error'
      );
    } else if (!inversion.Monto) {
      Swal.fire(
        'Error de ingreso de inversion',
        'El campo de monto esta vacio',
        'error'
      );
    } else if (!inversion.Interes) {
        Swal.fire(
          'Error de ingreso de inversion',
          'El campo de interes esta vacio',
          'error'
        );
      } else if (!inversion.Liquidez) {
        Swal.fire(
          'Error de ingreso de inversion',
          'El campo de liquidez esta vacio',
          'error'
        );
      } else {
        putInversion();
    }
  };

  const deleteInversion = async (inversion) => { 
    if (inversion.Codigo) {
      await axios.delete(url + inversion.Codigo, config).then((res) => {
        setInversiones(inversiones.filter((item) => item.Codigo !== inversion.Codigo));
        clearInversion();
      });
    }
  };

  const handleDeleteInversion = (inversion) => {
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
        deleteInversion(inversion);
        Swal.fire(
          'Transacción Completa',
          'La inversion se ha eliminado',
          'success'
        );
      }
    });
  }

  useEffect(() => {
    getInversiones();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mantenimiento Inversion</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Codigo de Usuario</th>
                      <th>Codigo de Moneda</th>
                      <th>Monto</th>
                      <th>Interes</th>
                      <th>Liquidez</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inversiones && inversiones.map((inversion) => {
                        return (
                          <tr key={inversion && inversion.Codigo}>
                            <td>{inversion && inversion.Codigo}</td>
                            <td>{inversion && inversion.CodigoUsuario}</td>
                            <td>{inversion && inversion.CodigoMoneda}</td>
                            <td>{inversion && inversion.Monto}</td>
                            <td>{inversion && inversion.Interes + "%"}</td>
                            <td>{inversion && inversion.Liquidez}</td>
                            <td>
                              <button className="btn btn-primary" onClick={() => {setInversion(inversion); setModalUpdate(!modalUpdate)}}>Editar</button>
                            </td>
                            <td>
                              <button className="btn btn-danger" onClick={() => handleDeleteInversion(inversion)}>Eliminar</button>
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
            <h3>Insertar Inversion</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo de Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo de Usuario"
              name="CodigoUsuario"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo de Moneda:</label>
            <input
              className="form-control"
              placeholder="Codigo de Moneda"
              name="CodigoMoneda"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Monto:</label>
            <input
              className="form-control"
              placeholder="Monto"
              name="Monto"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Interes:</label>
            <input
              className="form-control"
              placeholder="Interes"
              name="Interes"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Liquidez:</label>
            <input
              className="form-control"
              placeholder="Liquidez"
              name="Liquidez"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePostInversion()}>
            Insertar
          </Button>
          <Button color="danger" onClick={() => {setModalInsert(!modalInsert); clearInversion()}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Inversion</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={inversion && inversion.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo de Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo de Usuario"
              name="CodigoUsuario"
              type="number"
              value={inversion && inversion.CodigoUsuario}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo de Moneda:</label>
            <input
              className="form-control"
              placeholder="Codigo de Moneda"
              name="CodigoMoneda"
              type="number"
              value={inversion && inversion.CodigoMoneda}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Monto:</label>
            <input
              className="form-control"
              placeholder="Monto"
              name="Monto"
              type="number"
              step="0.01"
              value={inversion && inversion.Monto}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Interes:</label>
            <input
              className="form-control"
              placeholder="Interes"
              name="Interes"
              type="number"
              value={inversion && inversion.Interes}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Liquidez:</label>
            <input
              className="form-control"
              placeholder="Liquidez"
              name="Liquidez"
              type="number"
              step="0.01"
              value={inversion && inversion.liquidez}
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutInversion()}>
            Editar
          </Button>
          <Button color="danger" onClick={() => {setModalUpdate(!modalUpdate); clearInversion()}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Inversion;