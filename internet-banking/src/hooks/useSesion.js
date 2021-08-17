import { useEffect, useState } from "react";
import axios from "axios";

import { useDateTime } from "./useDateTime";

import { baseUrl, getToken, getConfig } from "../services/API/APIRest";

const url = baseUrl + "Sesion/";

export const useSesion = () => {
  const [sesiones, setSesiones] = useState([]);
  const { currentdate, getExpiryDate, getDatetime } = useDateTime();

  const getSesiones = async (token) => {
    const config = getConfig(token);
    await axios
      .get(url, config)
      .then((response) => {
        const { data } = response;
        setSesiones(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      getSesiones(token);
    }
  }, []);

  const postSesion = async (Codigo) => {
    const token = getToken();
    const config = getConfig(token);
    const sesion = {
      CodigoUsuario: Codigo,
      FechaInicio: getDatetime(currentdate),
      FechaExpiracion: getExpiryDate(token),
      Estado: "A"
    }
    await axios.post(url, sesion, config).then((response) => {
      const { data } = response;
      setSesiones(sesiones.concat(data));
    });
  };

  return { sesiones, postSesion };
};
