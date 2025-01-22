import { put } from "../../methods/put";
import { del } from "../../methods/delete";
import { get } from "@/services/methods/get";

export default async function BudgetExpenseService() {
  async function updateBudgetExpense(
    expenseId: string,
    payload: IUpdateBudgetExpense
  ): Promise<void> {
    const data = JSON.stringify({
      projectId: payload.projectId,
      title: payload.title,
      description: payload.description,
      value: payload.amount,
    });
    await put<void, string>(`/budget-expenses/update/${expenseId}`, data);
  }

  async function removeBudgetExpense(id: string): Promise<void> {
    await del<void>(`/budget-expenses/${id}`);
  }

  async function fetchCustomerExpenses(
    customerId: string
  ): Promise<ICustomerBudgetBalance> {
    const response = await get<ICustomerExpensesResponse>(
      `/budget-expense/balance/customer/${customerId}`
    );
    return response.data;
  }

  async function fetchBalanceAllCustomers(): Promise<{
    dataBalanceAllCustomers: ICustomerBudgetBalance[];
    dataLastBudgetExpenses: LastBudgetExpenses[];
  }> {
    const response = await get<{
      dataBalanceAllCustomers: ICustomerBudgetBalance[];
      dataLastBudgetExpenses: LastBudgetExpenses[];
    }>(`/budget-expense/balance/all-customers`);
    return response;
  }

  return {
    updateBudgetExpense,
    removeBudgetExpense,
    fetchCustomerExpenses,
    fetchBalanceAllCustomers
  };
}
