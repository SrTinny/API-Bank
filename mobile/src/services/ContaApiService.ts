import apiClient from './apiClient';
import { Conta, TipoConta } from '../types/bank';

export class ContaApiService {
  static async getAllContas(): Promise<Conta[]> {
    const res = await apiClient.get<Conta[]>('/contas');
    return res.data;
  }

  static async cadastrarConta(payload: Partial<Conta>): Promise<Conta> {
    const res = await apiClient.post<Conta>('/contas', payload);
    return res.data;
  }

  static async sacar(numero: string, valor: number) {
    const res = await apiClient.post(`/contas/${numero}/saque`, { valor });
    return res.data;
  }

  static async depositar(numero: string, valor: number) {
    const res = await apiClient.post(`/contas/${numero}/deposito`, { valor });
    return res.data;
  }

  static async transferir(dto: { origemContaId: string | number; destinoContaId: string | number; valor: number; }) {
    const res = await apiClient.post(`/contas/transferencia`, dto);
    return res.data;
  }

  static async reajustar(numero: string, taxa: number) {
    const res = await apiClient.post(`/contas/${numero}/reajuste`, { taxa });
    return res.data;
  }
}
