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
  status: "ACTIVE" | "INACTIVE";
}

declare interface IBudgetExpenseBalance {
  budget: number;
  totalBudgetExpense: number;
  amountBudgetExpense: number;
  balance: number;
}

declare interface ICustomerBudgetExpensesResponse {
  isError: boolean;
  error?: string;
  budget?: IBudgetExpenseBalance;
}

declare interface IGetCustomerExpensesResponse {
  isError: boolean;
  error?: string;
  expenses?: IBudgetExpense[];
}

declare interface IExpensesRow {
  key: string;
  expenseTitle: string;
  description: string;
  project: string;
  expenseValue: string;
}
