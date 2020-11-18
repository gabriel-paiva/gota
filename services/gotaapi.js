import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gota-api.herokuapp.com/',
});

export default api;