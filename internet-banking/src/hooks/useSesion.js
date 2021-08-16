import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API/APIRest";

const url = baseUrl + "Sesion/";

export const useSesion = () => {
  const [sesiones, setSesiones] = useState([]);

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

  const postSesion = async (sesion) => {
    const token = getToken();
    const config = getConfig(token);
    await axios.post(url, sesion, config).then((response) => {
      const { data } = response;
      setSesiones(sesiones.concat(data));
    });
  };

  return { sesiones, postSesion };
};
