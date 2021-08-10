export const baseUrl = 'http://localhost:49220/api/';

<<<<<<< Updated upstream
export const getToken = () => localStorage.getItem("token");

export const getConfig = (token) => {
  return {headers: {Authorization: "Bearer " + token}}
}
=======
export const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
};
>>>>>>> Stashed changes
