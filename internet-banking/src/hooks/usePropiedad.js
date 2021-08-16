import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API/APIRest";

const url = baseUrl + "Propiedad/";

export const usePropiedad = () => {
  const [propiedades, setPropiedades] = useState([]);

  const getPropiedades = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setPropiedades(data);
    });
  };

  // eslint-disable-next-line
  const getPropiedadById = async (propiedad) => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url + propiedad.Codigo, config).then((response) => {
      const { data } = response;
      return data;
    });
  };

  useEffect(() => {
    getPropiedades();
  }, []);

  const postPropiedad = async (propiedad) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, propiedad, config)
      .then((response) => {
        const { data } = response;
        setPropiedades(propiedades.concat(data));
      })
      .then(() => getPropiedades());
  };

  const putPropiedad = async (propiedad) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + propiedad.Codigo, propiedad, config)
      .then((res) => {
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
      })
      .then(() => getPropiedades());
  };

  const deletePropiedad = async (propiedad) => {
    const token = getToken();
    const config = getConfig(token);
    if (propiedad.Codigo) {
      await axios.delete(url + propiedad.Codigo, config).then((res) => {
        const newData = propiedades.filter(
          (item) => item.Codigo !== propiedad.Codigo
        );
        setPropiedades(newData);
      });
    }
  };

  return { propiedades, postPropiedad, putPropiedad, deletePropiedad };
};
