import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API/APIRest";

const url = baseUrl + "Promocion/";

export const usePromocion = () => {
  const [promociones, setPromociones] = useState([]);

  const getPromociones = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setPromociones(data);
    });
  };

  // eslint-disable-next-line
  const getPromocionById = async (promocion) => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url + promocion.Codigo, config).then((response) => {
      const { data } = response;
      return data;
    });
  };

  useEffect(() => {
    getPromociones();
  }, []);

  const postPromocion = async (promocion) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, promocion, config)
      .then((response) => {
        const { data } = response;
        setPromociones(promociones.concat(data));
      })
      .then(() => getPromociones());
  };

  const putPromocion = async (promocion) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + promocion.Codigo, promocion, config)
      .then((res) => {
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
      })
      .then(() => getPromociones());
  };

  const deletePromocion = async (promocion) => {
    const token = getToken();
    const config = getConfig(token);
    if (promocion.Codigo) {
      await axios.delete(url + promocion.Codigo, config).then((res) => {
        const newData = promociones.filter(
          (item) => item.Codigo !== promocion.Codigo
        );
        setPromociones(newData);
      });
    }
  };

  return { promociones, postPromocion, putPromocion, deletePromocion };
};
