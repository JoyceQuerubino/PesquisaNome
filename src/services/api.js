import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.nationalize.io/',
})

export default api;
