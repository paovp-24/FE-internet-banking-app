import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API/APIRest";

const url = baseUrl + "Estadistica/";

export const useEstadistica = () => {
    const [estadisticas, setEstadisticas] = useState([]);

    const getEstadisticas = async (token) => {
        try {
            const config = getConfig(token);
            await axios.get(url, config).then((response) => {
                const { data } = response;
                setEstadisticas(data);
            });
        }
        catch (ex) {
            console.log(ex)
        }
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            getEstadisticas(token);
        }
    }, []);

    const postEstadistica = async(estadistica) => {
        const token = getToken();
        const config = getConfig(token);
        await axios.post(url, estadistica, config).then((response) => {
            const { data } = response;
            setEstadisticas(estadisticas.concat(data));
        });
    };

    return { estadisticas, postEstadistica }
}