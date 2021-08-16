import { useState, useEffect } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API/APIRest";

const url = baseUrl + "Fiador/";

export const useFiador = () => {
  const [fiadores, setFiadores] = useState([]);

  const getFiadores = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setFiadores(data);
    });
  };

  // eslint-disable-next-line
  const getFiadorById = async (fiador) => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url + fiador.Codigo, config).then((response) => {
      const { data } = response;
      return data;
    });
  };

  useEffect(() => {
    getFiadores();
  }, []);

  const postFiador = async (fiador) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, fiador, config)
      .then((response) => {
        const { data } = response;
        setFiadores(fiadores.concat(data));
      })
      .then(() => getFiadores());
  };

  const putFiador = async (fiador) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + fiador.Codigo, fiador, config)
      .then((res) => {
        const newData = fiadores;
        newData.map((item) => {
          if (fiador.Codigo === item.Codigo) {
            item.CodigoPrestamo = fiador.CodigoPrestamo;
            item.Cedula = fiador.Cedula;
            item.Nombre = fiador.Nombre;
            item.Apellidos = fiador.Apellidos;
            item.Ocupacion = fiador.Ocupacion;
          }
          return newData;
        });
        setFiadores(newData);
      })
      .then(() => getFiadores());
  };

  const deleteFiador = async (fiador) => {
    const token = getToken();
    const config = getConfig(token);
    if (fiador.Codigo) {
      await axios.delete(url + fiador.Codigo, config).then((res) => {
        setFiadores(fiadores.filter((item) => item.Codigo !== fiador.Codigo));
      });
    }
  };

  return { fiadores, postFiador, putFiador, deleteFiador };
};
