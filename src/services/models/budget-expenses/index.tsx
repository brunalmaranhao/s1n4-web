import { put } from "../../methods/put";
import { del } from "../../methods/delete";

export default async function BudgetExpenseService() {
  async function updateBudgetExpense(
    expenseId: string,
    payload: IUpdateBudgetExpense,
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

  return {
    updateBudgetExpense,
    removeBudgetExpense,
  };
}
