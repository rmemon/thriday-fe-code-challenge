import { create } from 'zustand'

interface Transaction {
  transactionId: string;
  transactionTitle: string;
  transactiondate: string;
  logoUrl: string;
  suburb?: string;
  shortCategory?: string;
  cashflow: 'inflow' | 'outflow';
  amount: string;
}

export interface TransactionState {
  transactions: Transaction[];
  cashflow: null | 'inflow' | 'outflow';
  setCashflow: (cashflow: null | 'inflow' | 'outflow') => void;
  setTransactions: (transactions: Transaction[]) => void;
}


// TODO: Add a transaction list to store

const transactionStore = create<TransactionState>()((set) => ({
  transactions: [],
  cashflow: null,
  setCashflow: (cashflow) => set({ cashflow }),
  setTransactions: (transactions) => set({ transactions })
}))

export default transactionStore;