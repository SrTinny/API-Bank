import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.18.44:8081', // máquina local na rede (use este IP para dispositivo físico via QR). Porta 8081 para evitar conflito com 8080
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default apiClient;
