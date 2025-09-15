import axios from "axios";
const VIA_CEP_API = 'https://viacep.com.br/ws';
const OPEN_CAGE_API = 'https://api.opencagedata.com/geocode/v1/json?q=';
const API_KEY = "b15d967264ec4dc1ac01b72613f31746";

export const getCep = async (cep) => {
    try {
        const response = await axios.get(`${VIA_CEP_API}/${cep}/json/`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCoordinates = async (address) => {
    try {
        const response = await axios.get(`${OPEN_CAGE_API}${encodeURIComponent(address)}&key=${API_KEY}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};