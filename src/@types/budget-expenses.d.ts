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
  customer?: string;
}
declare interface LastBudgetExpenses {
  project: string;
  customer: string;
  value: number;
  title: string;
  date: Date;
}

declare interface ICustomerExpensesResponse {
  data: ICustomerExpenses;
}
