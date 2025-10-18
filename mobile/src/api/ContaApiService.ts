import apiClient from '../services/apiClient';
import { IConta, ICadastroDTO, ITransferenciaDTO } from '../types/Conta';

export class ContaApiService {
  static async getAllContas(): Promise<IConta[]> {
    const res = await apiClient.get<IConta[]>('/contas');
    return res.data;
  }

  static async cadastrarConta(dto: ICadastroDTO): Promise<IConta> {
    const res = await apiClient.post<IConta>('/contas', dto);
    return res.data;
  }

  static async sacar(numero: string, valor: number): Promise<void> {
    await apiClient.patch(`/contas/${encodeURIComponent(numero)}/saque`, { valor });
  }

  static async depositar(numero: string, valor: number): Promise<void> {
    await apiClient.patch(`/contas/${encodeURIComponent(numero)}/deposito`, { valor });
  }

  static async transferir(dto: ITransferenciaDTO): Promise<void> {
    await apiClient.patch(`/contas/transferencia`, dto);
  }

  static async reajustar(numero: string, taxa?: number): Promise<void> {
    await apiClient.patch(`/contas/${encodeURIComponent(numero)}/reajuste`, { taxa });
  }
}

export default ContaApiService;
