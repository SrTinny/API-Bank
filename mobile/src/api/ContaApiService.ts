import apiClient from '../services/apiClient';
import { IConta, ICadastroDTO, ITransferenciaDTO } from '../types/Conta';

export class ContaApiService {
  static async getAllContas(): Promise<IConta[]> {
    const res = await apiClient.get<IConta[]>('/api/contas');
    return res.data;
  }

  static async cadastrarConta(dto: ICadastroDTO): Promise<IConta> {
    const res = await apiClient.post<IConta>('/api/contas', dto);
    return res.data;
  }

  static async sacar(numero: string, valor: number): Promise<void> {
    await apiClient.patch(`/api/contas/${encodeURIComponent(numero)}/saque`, { valor });
  }

  static async depositar(numero: string, valor: number): Promise<void> {
    await apiClient.patch(`/api/contas/${encodeURIComponent(numero)}/deposito`, { valor });
  }

  static async transferir(dto: ITransferenciaDTO): Promise<void> {
    await apiClient.patch(`/api/contas/transferencia`, dto);
  }

  static async reajustar(numero: string, taxa?: number): Promise<void> {
    // backend espera um DTO com o campo taxaReajuste (OperacaoDTO)
    await apiClient.patch(`/api/contas/${encodeURIComponent(numero)}/reajuste`, { taxaReajuste: taxa });
  }
}

export default ContaApiService;
