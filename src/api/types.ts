export type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
};

export type ExpensePayload = {
  description: string;
  amount: number;
  category: string;
};

export type Category = {
  id: number;
  name: string;
};
