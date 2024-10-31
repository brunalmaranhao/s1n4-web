import { post } from "@/services/methods/post";
import { get } from "../../methods/get";

export default async function FinancialService() {
  async function createBudgetExpense(
    title: string,
    amount: number,
    projectId: string,
    description?: string
  ): Promise<string> {
    const payload = JSON.stringify({
      title,
      amount,
      projectId,
      description,
    });
    const response = await post<{ budgetExpenseId: string }, string>(
      `/budget-expense`,
      payload
    );
    return response.budgetExpenseId;
  }

  async function fetchBudgetExpense(
    page: number,
    size: number
  ): Promise<{data: IBudgetExpense[], total: number}> {
    const response = await get<{ data: IBudgetExpense[], total: number }>(
      `/budget-expense?${(page = page)}&size=${size}`
    );
    return response;
  }

  async function fetchBudgetExpenseByProject(
    projectId: string
  ): Promise<IBudgetExpense[]> {
    const response = await get<{ data: IBudgetExpense[] }>(
      `/budget-expense/project/${projectId}`
    );
    return response.data;
  }

  return {
    createBudgetExpense,
    fetchBudgetExpense,
    fetchBudgetExpenseByProject,
  };
}
