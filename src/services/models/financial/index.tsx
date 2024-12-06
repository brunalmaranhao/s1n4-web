import { post } from "@/services/methods/post";
import { get } from "../../methods/get";

export default async function FinancialService() {
  async function createBudgetExpense(
    title: string,
    amount: number,
    projectId: string,
    description?: string,
  ): Promise<string> {
    const payload = JSON.stringify({
      title,
      amount,
      projectId,
      description,
    });
    const response = await post<{ budgetExpenseId: string }, string>(
      `/budget-expense`,
      payload,
    );
    return response.budgetExpenseId;
  }

  async function fetchBudgetExpense(
    page: number,
    size: number,
  ): Promise<{ data: IBudgetExpense[]; total: number }> {
    const response = await get<{ data: IBudgetExpense[]; total: number }>(
      `/budget-expense?${(page = page)}&size=${size}`,
    );
    return response;
  }

  async function fetchBudgetExpenseByProject(
    projectId: string,
  ): Promise<{ data: IBudgetExpense[] }> {
    const response = await get<{ data: IBudgetExpense[] }>(
      `/budget-expense/project/${projectId}`,
    );
    return response;
  }

  async function fetchBudgetExpenseBalanceByProject(
    projectId: string,
  ): Promise<{ data: IBudgetExpenseBalance }> {
    const response = await get<{ data: IBudgetExpenseBalance }>(
      `/budget-expense/balance/project/${projectId}`,
    );
    return response;
  }

  async function fetchBudgetExpenseBalanceByCustomer(
    customerId: string,
  ): Promise<{ data: IBudgetExpenseBalance }> {
    const response = await get<{ data: IBudgetExpenseBalance }>(
      `/budget-expense/balance/customer/${customerId}`,
    );
    return response;
  }

  async function fetchBalanceAndExpensesByCustomer(
    customerId: string,
    token: string,
  ): Promise<{ data: IBudgetExpenseBalance }> {
    const response = await get<{ data: IBudgetExpenseBalance }>(
      `/budget-expense/balance/customer/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }

  async function fetchAllBudgetExpenseBalance(): Promise<{
    data: IBudgetExpenseBalance;
  }> {
    const response = await get<{ data: IBudgetExpenseBalance }>(
      `/budget-expense/balance`,
    );
    return response;
  }

  async function fetchBudgetExpenseByCustomer(
    customerId: string,
  ): Promise<{ data: IBudgetExpense[] }> {
    const response = await get<{ data: IBudgetExpense[] }>(
      `/budget-expense/customer/${customerId}`,
    );
    return response;
  }

  async function fetchCustomerExpenses(
    customerId: string,
    token: string,
  ): Promise<{ data: IBudgetExpense[] }> {
    const response = await get<{ data: IBudgetExpense[] }>(
      `/budget-expense/customer/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  }

  return {
    createBudgetExpense,
    fetchBudgetExpense,
    fetchBudgetExpenseByProject,
    fetchBudgetExpenseByCustomer,
    fetchBudgetExpenseBalanceByProject,
    fetchAllBudgetExpenseBalance,
    fetchBudgetExpenseBalanceByCustomer,
    fetchCustomerExpenses,
    fetchBalanceAndExpensesByCustomer,
  };
}
