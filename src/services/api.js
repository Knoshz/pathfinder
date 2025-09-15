import axios from "axios";
const VIA_CEP_API = 'https://viacep.com.br/ws';
const API_KEY = "AIzaSyAD-j4eMhq1cFllYNUBtZPkN6VLlo38igQ";
const GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const GEOLOCATION_API = 'https://www.googleapis.com/geolocation/v1/geolocate?key=';
const GEO_API_KEY = 'AIzaSyB90mKL29K2EadX7Z0dN44BnHgzdLztT7M'

export const getCep = async (cep) => {
    try {
        const response = await axios.get(`${VIA_CEP_API}/${cep}/json/`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCoordinates = async (address) => {
    try {
        const response = await axios.get(`${GEOCODE_API}${encodeURIComponent(address)}&key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCurrentPosition = async () => {
    try {
        const response = await axios.post(`${GEOLOCATION_API}${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};