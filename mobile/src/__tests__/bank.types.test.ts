import { Conta, ContaEspecial, OperacaoDTO, TransferenciaDTO } from '../types/bank';

describe('bank types', () => {
  test('should allow a Conta object shape', () => {
    const c: Conta = {
      id: 1,
      numero: '1234',
      titular: 'João',
      saldo: 100.5,
      tipo_conta: 'COMUM'
    };
    expect(c.titular).toBe('João');
  });

  test('should allow ContaEspecial with limite', () => {
    const ce: ContaEspecial = {
      id: 'a1',
      numero: '5678',
      titular: 'Maria',
      saldo: 50,
      tipo_conta: 'ESPECIAL',
      limiteChequeEspecial: 500
    };
    expect(ce.limiteChequeEspecial).toBeGreaterThan(0);
  });

  test('operation DTO shapes', () => {
    const op: OperacaoDTO = { contaId: 1, valor: 20 };
    const tr: TransferenciaDTO = { origemContaId: 1, destinoContaId: 2, valor: 10 };
    expect(op.valor).toBe(20);
    expect(tr.destinoContaId).toBe(2);
  });
});
