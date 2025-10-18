export type TipoConta = 'COMUM' | 'POUPANCA' | 'ESPECIAL';

export interface IConta {
  id: number;
  numero: string;
  titular: string;
  saldo: number;
  tipo_conta: TipoConta;
}

export interface IContaEspecial extends IConta {
  limiteChequeEspecial: number;
}

export interface ICadastroDTO {
  tipo: TipoConta;
  numero: string;
  titular: string;
  limiteChequeEspecial?: number;
}

export interface IOperacaoDTO {
  valor: number;
  taxaReajuste?: number;
}

export interface ITransferenciaDTO {
  contaOrigem: string;
  contaDestino: string;
  valor: number;
}
