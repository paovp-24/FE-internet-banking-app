import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API/APIRest";

const url = baseUrl + "Inversion/";

export const useInversion = () => {
  const [inversiones, setInversiones] = useState([]);

  const getInversiones = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setInversiones(data);
    });
  };

  // eslint-disable-next-line
  const getInversionById = async (inversion) => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url + inversion.Codigo, config).then((response) => {
      const { data } = response;
      return data;
    });
  };

  useEffect(() => {
    getInversiones();
  }, []);

  const postInversion = async (inversion) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, inversion, config)
      .then((response) => {
        const { data } = response;
        setInversiones(inversiones.concat(data));
      })
      .then(() => getInversiones());
  };

  const putInversion = async (inversion) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + inversion.Codigo, inversion, config)
      .then(() => {
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
      })
      .then(() => getInversiones());
  };

  const deleteInversion = async (inversion) => {
    const token = getToken();
    const config = getConfig(token);
    if (inversion.Codigo) {
      await axios.delete(url + inversion.Codigo, config).then((res) => {
        const newData = inversiones.filter(
          (item) => item.Codigo !== inversion.Codigo
        );
        setInversiones(newData);
      });
    }
  };

  return { inversiones, postInversion, putInversion, deleteInversion };
};
