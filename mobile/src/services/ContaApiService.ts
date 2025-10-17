import apiClient from './apiClient';
import { Conta, OperacaoDTO, TransferenciaDTO } from '../types/bank';

export default class ContaApiService {
  static async getAllContas(): Promise<Conta[]> {
    const res = await apiClient.get<Conta[]>('/contas');
    return res.data;
  }

  static async cadastrarConta(dto: Partial<Conta>): Promise<Conta> {
    const res = await apiClient.post<Conta>('/contas', dto);
    return res.data;
  }

  static async sacar(numero: string, valor: number): Promise<{ success: boolean; message?: string }> {
    const res = await apiClient.post('/contas/' + encodeURIComponent(numero) + '/saque', { valor });
    return res.data;
  }

  static async depositar(numero: string, valor: number): Promise<{ success: boolean; message?: string }> {
    const res = await apiClient.post('/contas/' + encodeURIComponent(numero) + '/deposito', { valor });
    return res.data;
  }

  static async transferir(dto: TransferenciaDTO): Promise<{ success: boolean; message?: string }> {
    const res = await apiClient.post('/contas/transferencia', dto);
    return res.data;
  }

  static async reajustar(numero: string, taxa?: number): Promise<{ success: boolean; message?: string }> {
    const body: any = {};
    if (typeof taxa === 'number') body.taxa = taxa;
    const res = await apiClient.post('/contas/' + encodeURIComponent(numero) + '/reajustar', body);
    return res.data;
  }
}
