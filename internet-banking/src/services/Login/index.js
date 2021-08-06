import axios from "axios";
import { baseUrl } from "../API/APIRest";

const url = baseUrl + "login/authenticate";

export const logIn = async (form) => {
    return await axios
        .post(url, form)
        .then((response) => {
          return response;
        })
  }