import axios from 'axios';
import { Platform } from 'react-native';

// Configure aqui o IP da sua máquina (endereço LAN) quando testar em dispositivo físico.
// Detectado automaticamente: 192.168.18.44
const MACHINE_IP = '192.168.18.44';

// Emuladores/Simuladores usam hosts diferentes:
// - Android Emulator (AVD): use 10.0.2.2
// - Expo Go / physical device: use MACHINE_IP
// - iOS Simulator: localhost funciona
const emulatorHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

// BaseURL padrão para dispositivos físicos (LAN). Ajuste MACHINE_IP conforme sua rede.
const deviceBase = `http://${MACHINE_IP}:8080`;
const emulatorBase = `http://${emulatorHost}:8080`;

// WORKAROUND: forçar o uso do IP da máquina para dispositivos físicos.
// Isso evita que a falta de 'expo-constants' ou problemas de detecção deixem o app apontando para o host errado.
const baseURL = deviceBase;

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor simples para logar erros do axios no console do Expo (ajuda a debugar 'Network Error')
apiClient.interceptors.response.use(
  response => response,
  error => {
    try {
      console.log('[apiClient] Axios error message:', error.message);
      if (error.response) {
        console.log('[apiClient] Response status:', error.response.status);
        console.log('[apiClient] Response data:', error.response.data);
      } else if (error.request) {
        console.log('[apiClient] No response received, request:', error.request);
      }
    } catch (e) {
      console.log('[apiClient] Error while logging axios error', e);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
