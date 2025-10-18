import { create, StateCreator } from 'zustand';
import { IConta } from '../types/Conta';

interface ContaState {
  contas: IConta[];
  loading: boolean;
  setContas: (contas: IConta[]) => void;
  addConta: (conta: IConta) => void;
  updateConta: (conta: IConta) => void;
}

const createStore: StateCreator<ContaState> = (set) => ({
  contas: [] as IConta[],
  loading: false,
  setContas: (contas: IConta[]) => set({ contas }),
  addConta: (conta: IConta) => set((state) => ({ contas: [...state.contas, conta] })),
  updateConta: (conta: IConta) =>
    set((state) => ({ contas: state.contas.map((c) => (c.id === conta.id ? conta : c)) })),
});

export const useContaStore = create<ContaState>(createStore);

export default useContaStore;
