import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API/APIRest";

const url = baseUrl + "Sucursal/";

export const useSucursal = () => {
  const [sucursales, setSucursales] = useState([]);

  const getSucursales = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setSucursales(data);
    });
  };

  // eslint-disable-next-line
  const getSucursalesById = async (sucursal) => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url + sucursal.Codigo, config).then((response) => {
      const { data } = response;
      return data;
    });
  };

  useEffect(() => {
    getSucursales();
  }, []);

  const postSucursal = async (sucursal) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, sucursal, config)
      .then((response) => {
        const { data } = response;
        setSucursales(sucursales.concat(data));
      })
      .then(() => getSucursales());
  };

  const putSucursal = async (sucursal) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + sucursal.Codigo, sucursal, config)
      .then((res) => {
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
      })
      .then(() => getSucursales());
  };

  const deleteSucursal = async (sucursal) => {
    const token = getToken();
    const config = getConfig(token);
    if (sucursal.Codigo) {
      await axios.delete(url + sucursal.Codigo, config).then((res) => {
        const newData = sucursales.filter(
          (item) => item.Codigo !== sucursal.Codigo
        );
        setSucursales(newData);
      });
    }
  };

  return { sucursales, postSucursal, putSucursal, deleteSucursal };
};
