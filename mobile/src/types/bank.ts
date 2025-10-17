// Tipos TypeScript para modelos bancários usados no mobile app

export type TipoConta = 'COMUM' | 'POUPANCA' | 'ESPECIAL';

export interface Conta {
  id: number | string; // id pode ser number ou string dependendo do backend
  numero: string;
  titular: string;
  saldo: number;
  tipo_conta: TipoConta;
}

export interface ContaEspecial extends Conta {
  limiteChequeEspecial: number; // limite disponível do cheque especial
}

export interface OperacaoDTO {
  contaId: number | string;
  valor: number;
}

export interface TransferenciaDTO {
  origemContaId: number | string;
  destinoContaId: number | string;
  valor: number;
}
