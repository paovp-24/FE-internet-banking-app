export const baseUrl = 'http://localhost:49220/api/';

export const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
};