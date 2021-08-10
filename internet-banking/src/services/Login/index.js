import axios from 'axios';
import { baseUrl, config } from '../API/APIRest';

const url = baseUrl + 'login/authenticate';

export const logIn = async (form) => {
  return await axios.post(url, form).then((response) => {
    return response;
  });
};

// Estadistica
const urlStat = baseUrl + 'Estadistica/';

export const postEstadistica = async (estadistica) => {
  return await axios.post(urlStat, estadistica, config).then((response) => {
    return response;
  });
};
