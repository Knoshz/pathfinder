import axios from "axios";

export const getCep = async (cep) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_VIA_CEP_API}/${cep}/json/`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCoordinates = async (address) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_GEOCODE_API}${encodeURIComponent(address)}&key=${process.env.REACT_APP_API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// export const getCurrentPosition = async () => {
//     try {
//         const response = await axios.post(`${process.env.REACT_APP_GEOLOCATION_API}${process.env.REACT_APP_API_KEY}`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// };