import axios from "axios";
import { baseUrl } from "../../services/apirest";

const url = baseUrl + "login/authenticate";

export const logIn = async (form) => {
    return await axios
        .post(url, form)
        .then((response) => {
          return response;
        })
  }