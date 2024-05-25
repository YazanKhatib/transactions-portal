import { Dispatch, SetStateAction } from 'react';

export interface Transaction {
  id: number;
  type: string;
  coin: string;
  amount: number;
  address: string;
}

export interface DialogComponentProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  options: { value: string; label: string }[];
  setTransactions: Dispatch<React.SetStateAction<Transaction[]>>;
}
