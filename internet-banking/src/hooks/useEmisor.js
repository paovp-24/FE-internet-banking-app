import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API/APIRest";

const url = baseUrl + "Emisor/";

export const useEmisor = () => {
  const [emisores, setEmisores] = useState([]);

  const getEmisores = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setEmisores(data);
    });
  };

  // eslint-disable-next-line
  const getEmisoresById = async (emisor) => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url + emisor.Codigo, config).then((response) => {
      const { data } = response;
      return data;
    });
  };

  useEffect(() => {
    getEmisores();
  }, []);

  const postEmisor = async (emisor) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, emisor, config)
      .then((response) => {
        const { data } = response;
        setEmisores(emisores.concat(data));
      })
      .then(() => getEmisores());
  };

  const putEmisor = async (emisor) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + emisor.Codigo, emisor, config)
      .then((response) => {
        const newData = emisores;
        newData.map((item) => {
          if (emisor.Codigo === item.Codigo) {
            item.Descripcion = emisor.Descripcion;
            item.Prefijo = emisor.Prefijo;
            item.NumeroDigitos = emisor.NumeroDigitos;
          }
          return newData;
        });
        setEmisores(newData);
      })
      .then(() => getEmisores());
  };

  const deleteEmisor = async (emisor) => {
    const token = getToken();
    const config = getConfig(token);
    if (emisor.Codigo) {
      await axios.delete(url + emisor.Codigo, config).then((res) => {
        const newData = emisores.filter(
          (item) => item.Codigo !== emisor.Codigo
        );
        setEmisores(newData);
      });
    }
  };

  return { emisores, postEmisor, putEmisor, deleteEmisor };
};
