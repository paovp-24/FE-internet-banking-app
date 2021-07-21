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

const url = Apiurl + 'Propiedad/';

const Propiedad = () => {
  const emptyPropiedad = {
    Codigo: '',
    CodigoUsuario: '',
    Ubicacion: '',
    Dimension: '',
    Descripcion: '',
    Estado: '',
    PrecioFiscal: ''
  };

  const [propiedades, setPropiedades] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [propiedad, setPropiedad] = useState(emptyPropiedad);

  const clearPropiedad = () => {
    setPropiedad({ ...emptyPropiedad });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropiedad((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  const getPropiedades = async () => {
    await axios.get(url, config).then((res) => {
      const data = res.data;
      setPropiedades(data);
    });
  };

  // eslint-disable-next-line
  const getPropiedadById = async() => {
    await axios.get(url+propiedad.Codigo, config).then(res=>{
      const data = res.data;
      setPropiedad(data);
    })
  }

  const postPropiedad = async () => {
    await axios.post(url, propiedad, config).then((res) => {
      const data = res.data;
      setPropiedades(propiedades.concat(data));
      clearPropiedad();
      getPropiedades();
      setModalInsert(!modalInsert);
    })
  };

  const handlePostPropiedad = () => {
    if (!propiedad.CodigoUsuario) {
      Swal.fire(
        'Error de ingreso de propiedad',
        'El campo de codigo de usuario esta vacio',
        'error'
      );
    } else if (!propiedad.Ubicacion) {
      Swal.fire(
        'Error de ingreso de propiedad',
        'El campo de ubicacion esta vacio',
        'error'
      );
    } else if (!propiedad.Dimension) {
      Swal.fire(
        'Error de ingreso de propiedad',
        'El campo de dimension esta vacio',
        'error'
      );
    } else if (!propiedad.Descripcion) {
        Swal.fire(
          'Error de ingreso de propiedad',
          'El campo de descripcion esta vacio',
          'error'
        );
      } else if (!propiedad.Estado) {
        Swal.fire(
          'Error de ingreso de propiedad',
          'El campo de estado esta vacio',
          'error'
        );
      } else if (!propiedad.PrecioFiscal) {
        Swal.fire(
          'Error de ingreso de propiedad',
          'El campo de precio fiscal esta vacio',
          'error'
        );
      } else {
      postPropiedad();
    }
  };

  const putPropiedad = async () => {
    await axios.put(url + propiedad.Codigo, propiedad, config).then((res) => {
      const newData = propiedades;
      newData.map((item) => {
        if (propiedad.Codigo === item.Codigo) {
          item.CodigoUsuario = propiedad.CodigoUsuario;
          item.Ubicacion = propiedad.Ubicacion;
          item.Dimension = propiedad.Dimension;
          item.Descripcion = propiedad.Descripcion;
          item.Estado = propiedad.Estado;
          item.PrecioFiscal = propiedad.PrecioFiscal;
        }
        return newData;
      });
      setPropiedades(newData);
      clearPropiedad();
      getPropiedades();
      setModalUpdate(!modalUpdate);
    });
  };

  const handlePutPropiedad = () => {
    if (!propiedad.CodigoUsuario) {
      Swal.fire(
        'Error de ingreso de propiedad',
        'El campo de codigo de usuario esta vacio',
        'error'
      );
    } else if (!propiedad.Ubicacion) {
      Swal.fire(
        'Error de ingreso de propiedad',
        'El campo de ubicacion esta vacio',
        'error'
      );
    } else if (!propiedad.Dimension) {
      Swal.fire(
        'Error de ingreso de propiedad',
        'El campo de dimension esta vacio',
        'error'
      );
    } else if (!propiedad.Descripcion) {
        Swal.fire(
          'Error de ingreso de propiedad',
          'El campo de descripcion esta vacio',
          'error'
        );
      } else if (!propiedad.Estado) {
        Swal.fire(
          'Error de ingreso de propiedad',
          'El campo de estado esta vacio',
          'error'
        );
      } else if (!propiedad.PrecioFiscal) {
        Swal.fire(
          'Error de ingreso de propiedad',
          'El campo de precio fiscal esta vacio',
          'error'
        );
      } else {
        putPropiedad();
    }
  };

  const deletePropiedad = async (propiedad) => { 
    if (propiedad.Codigo) {
      await axios.delete(url + propiedad.Codigo, config).then((res) => {
        setPropiedades(propiedades.filter((item) => item.Codigo !== propiedad.Codigo));
        clearPropiedad();
      });
    }
  };

  const handleDeletePropiedad = (propiedad) => {
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
        deletePropiedad(propiedad);
        Swal.fire(
          'Transacción Completa',
          'La propiedad se ha eliminado',
          'success'
        );
      }
    });
  }

  useEffect(() => {
    getPropiedades();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mantenimiento Propiedad</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Codigo de Usuario</th>
                      <th>Ubicacion</th>
                      <th>Dimension</th>
                      <th>Descripcion</th>
                      <th>Estado</th>
                      <th>Precio Fiscal</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propiedades && propiedades.map((propiedad) => {
                        return (propiedad.Estado === "A" &&
                          <tr key={propiedad && propiedad.Codigo}>
                            <td>{propiedad && propiedad.Codigo}</td>
                            <td>{propiedad && propiedad.CodigoUsuario}</td>
                            <td>{propiedad && propiedad.Ubicacion}</td>
                            <td>{propiedad && propiedad.Dimension}</td>
                            <td>{propiedad && propiedad.Descripcion}</td>
                            <td>{propiedad && propiedad.Estado === "A" ? "Activo" : "Inactivo"}</td>
                            <td>{propiedad && propiedad.PrecioFiscal}</td>
                            <td>
                              <button className="btn btn-primary" onClick={() => {setPropiedad(propiedad); setModalUpdate(!modalUpdate)}}>Editar</button>
                            </td>
                            <td>
                              <button className="btn btn-danger" onClick={() => handleDeletePropiedad(propiedad)}>Eliminar</button>
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
            <h3>Insertar Propiedad</h3>
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
            <label>Dimension:</label>
            <input
              className="form-control"
              placeholder="Dimension"
              name="Dimension"
              type="text"
              maxLength="50"
              size="50"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>
            <input
              className="form-control"
              placeholder="Descripcion"
              name="Descripcion"
              type="text"
              maxLength="100"
              size="100"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={propiedad && propiedad.Estado}
              name="Estado"
              type="text"
              onChange={handleChange}
            >
                <option value="">Seleccione un Estado</option>
                <option value="I">Inactivo</option>
                <option value="A">Activo</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Precio Fiscal:</label>
            <input
              className="form-control"
              placeholder="Precio Fiscal"
              name="PrecioFiscal"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePostPropiedad()}>
            Insertar
          </Button>
          <Button color="danger" onClick={() => {setModalInsert(!modalInsert); clearPropiedad()}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Propiedad</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={propiedad && propiedad.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo de Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo de Usuario"
              name="CodigoUsuario"
              type="number"
              value={propiedad && propiedad.CodigoUsuario}
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
              value={propiedad && propiedad.Ubicacion}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Dimension:</label>
            <input
              className="form-control"
              placeholder="Dimension"
              name="Dimension"
              type="text"
              maxLength="50"
              size="50"
              value={propiedad && propiedad.Dimension}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>
            <input
              className="form-control"
              placeholder="Descripcion"
              name="Descripcion"
              type="text"
              maxLength="100"
              size="100"
              value={propiedad && propiedad.Descripcion}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={propiedad && propiedad.Estado}
              name="Estado"
              type="text"
              onChange={handleChange}
            >
                <option value="">Seleccione un Estado</option>
                <option value="I">Inactivo</option>
                <option value="A">Activo</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Precio Fiscal:</label>
            <input
              className="form-control"
              placeholder="Precio Fiscal"
              name="PrecioFiscal"
              type="number"
              step="0.01"
              value={propiedad && propiedad.PrecioFiscal}
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutPropiedad()}>
            Editar
          </Button>
          <Button color="danger" onClick={() => {setModalUpdate(!modalUpdate); clearPropiedad()}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Propiedad;