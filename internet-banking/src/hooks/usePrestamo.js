import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, getToken, getConfig } from "../services/API/APIRest";

const url = baseUrl + "Prestamo/";

export const usePrestamo = () => {
  const [prestamos, setPrestamos] = useState([]);

  const getPrestamos = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setPrestamos(data);
    });
  };

  // eslint-disable-next-line
  const getPrestamosById = async (prestamo) => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url + prestamo.Codigo, config).then((response) => {
      const { data } = response;
      return data;
    });
  };

  useEffect(() => {
    getPrestamos();
  }, []);

  const postPrestamo = async (prestamo) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, prestamo, config)
      .then((response) => {
        const { data } = response;
        setPrestamos(prestamos.concat(data));
      })
      .then(() => getPrestamos());
  };

  const putPrestamo = async (prestamo) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + prestamo.Codigo, prestamo, config)
      .then((res) => {
        const newData = prestamos;
        newData.map((item) => {
          if (prestamo.Codigo === item.Codigo) {
            item.CodigoUsuario = prestamo.CodigoUsuario;
            item.CodigoMoneda = prestamo.CodigoMoneda;
            item.Monto = prestamo.Monto;
            item.SaldoPendiente = prestamo.SaldoPendiente;
            item.TasaInteres = prestamo.TasaInteres;
            item.FechaEmision = prestamo.FechaEmision;
            item.FechaVencimiento = prestamo.FechaVencimiento;
            item.Estado = prestamo.Estado;
          }
          return newData;
        });
        setPrestamos(newData);
      })
      .then(() => getPrestamos());
  };

  const deletePrestamo = async (prestamo) => {
    const token = getToken();
    const config = getConfig(token);
    if (prestamo.Codigo) {
      await axios.delete(url + prestamo.Codigo, config).then((res) => {
        setPrestamos(
          prestamos.filter((item) => item.Codigo !== prestamo.Codigo)
        );
      });
    }
  };

  return { prestamos, postPrestamo, putPrestamo, deletePrestamo };
};
