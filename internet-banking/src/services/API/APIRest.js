export const baseUrl = 'https://api-internet-banking.azurewebsites.net/api/';

export const getToken = () => localStorage.getItem("token");

export const getConfig = (token) => {
  return {headers: {Authorization: "Bearer " + token}}
}
