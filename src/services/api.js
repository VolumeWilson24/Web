import axios from 'axios';

const api = axios.create({
    baseURL: 'http://treinamar.lymtec.com.br:5000/'
});
export default api;
