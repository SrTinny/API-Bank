import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://10.0.2.2:8080', // emulador Android -> localhost do host
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default apiClient;
