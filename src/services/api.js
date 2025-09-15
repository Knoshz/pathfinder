import axios from "axios";


export const getCep = async (cep) => {
    try {
        const response = await axios.get(`${process.env.VIA_CEP_API}/${cep}/json/`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCoordinates = async (address) => {
    try {
        const response = await axios.get(`${process.env.GEOCODE_API}${encodeURIComponent(address)}&key=${process.env.API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCurrentPosition = async () => {
    try {
        const response = await axios.post(`${process.env.GEOLOCATION_API}${process.env.API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};