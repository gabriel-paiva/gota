import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gota-back.herokuapp.com/',
});

export default api;