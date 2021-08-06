import axios from "axios";
import { baseUrl } from "../API/APIRest";

const url = baseUrl + "login/register";

export const register = async(form) => {
    return await axios
        .post(url, form)
        .then((response) => {
            const { status } = response
            return status;
        });
  }