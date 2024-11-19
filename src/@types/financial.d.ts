declare interface INewBudgetExpense {
  title: string;
  description?: string;
  amount: number;
  projectId: string;
  customerId: string;
}

declare interface IBudgetExpense {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  amount: number;
  project: {
    id: string;
    name: string;
    budget: number;
  };
  customer: {
    id: string;
    name: string;
  };
  actions?: string | null;
  budget?: string | null;
}

declare interface IBudgetExpenseBalance {
  budget: number;
  totalBudgetExpense: number;
  amountBudgetExpense: number;
  balance: number;
}
