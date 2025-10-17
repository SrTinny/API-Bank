import create from 'zustand';
import { Conta } from '../types/bank';

type ContaState = {
  contas: Conta[];
  setContas: (contas: Conta[]) => void;
  addConta: (conta: Conta) => void;
};

export const useContaStore = create<ContaState>((set) => ({
  contas: [],
  setContas: (contas: Conta[]) => set({ contas }),
  addConta: (conta: Conta) => set((state) => ({ contas: [...state.contas, conta] })),
}));

export default useContaStore;
