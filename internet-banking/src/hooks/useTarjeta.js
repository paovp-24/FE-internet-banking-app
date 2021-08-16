import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API/APIRest";

const url = baseUrl + "Tarjeta/";

export const useTarjeta = () => {
  const [tarjetas, setTarjetas] = useState([]);

  const getTarjetas = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setTarjetas(data);
    });
  };

  // eslint-disable-next-line
  const getTarjetaById = async (tarjeta) => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url + tarjeta.Codigo, config).then((response) => {
      const { data } = response;
      return data;
    });
  };

  useEffect(() => {
    getTarjetas();
  }, []);

  const postTarjeta = async (tarjeta) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, tarjeta, config)
      .then((response) => {
        const { data } = response;
        setTarjetas(tarjetas.concat(data));
      })
      .then(() => getTarjetas());
  };

  const putTarjeta = async (tarjeta) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + tarjeta.Codigo, tarjeta, config)
      .then((res) => {
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
      })
      .then(() => getTarjetas());
  };

  const deleteTarjeta = async (tarjeta) => {
    const token = getToken();
    const config = getConfig(token);
    if (tarjeta.Codigo) {
      await axios.delete(url + tarjeta.Codigo, config).then((res) => {
        const newData = tarjetas.filter(
          (item) => item.Codigo !== tarjeta.Codigo
        );
        setTarjetas(newData);
      });
    }
  };

  return { tarjetas, postTarjeta, putTarjeta, deleteTarjeta };
};
