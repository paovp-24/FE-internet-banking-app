import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API/APIRest";

const url = baseUrl + "Marchamo/";

export const useMarchamo = () => {
  const [marchamos, setMarchamos] = useState([]);

  const getMarchamos = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setMarchamos(data);
    });
  };

  // eslint-disable-next-line
  const getMarchamoById = async (marchamo) => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url + marchamo.Codigo, config).then((response) => {
      const { data } = response;
      return data;
    });
  };

  useEffect(() => {
    getMarchamos();
  }, []);

  const postMarchamo = async (marchamo) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, marchamo, config)
      .then((response) => {
        const { data } = response;
        setMarchamos(marchamos.concat(data));
      })
      .then(() => getMarchamos());
  };

  const putMarchamo = async (marchamo) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + marchamo.Codigo, marchamo, config)
      .then((res) => {
        const newData = marchamos;
        newData.map((item) => {
          if (marchamo.Codigo === item.Codigo) {
            item.CodigoUsuario = marchamo.CodigoUsuario;
            item.Placa = marchamo.Placa;
            item.Monto = marchamo.Monto;
            item.FechaLimite = marchamo.FechaLimite;
            item.Estado = marchamo.Estado;
          }
          return newData;
        });
        setMarchamos(newData);
      })
      .then(() => getMarchamos());
  };

  const deleteMarchamo = async (marchamo) => {
    const token = getToken();
    const config = getConfig(token);
    if (marchamo.Codigo) {
      await axios.delete(url + marchamo.Codigo, config).then((res) => {
        const newData = marchamos.filter(
          (item) => item.Codigo !== marchamo.Codigo
        );
        setMarchamos(newData);
      });
    }
  };

  return { marchamos, postMarchamo, putMarchamo, deleteMarchamo };
};
