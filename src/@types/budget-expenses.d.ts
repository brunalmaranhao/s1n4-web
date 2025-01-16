declare interface IUpdateBudgetExpense {
  projectId: string;
  title: string;
  description: string;
  amount: number;
}

declare interface ICustomerBudgetBalance {
  budget: number;
  totalBudgetExpense: number;
  amountBudgetExpense: number;
  balance: number;
}

declare interface ICustomerExpensesResponse {
  data: ICustomerExpenses;
}
