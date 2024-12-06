"use server";

import { handleAxiosError } from "@/services/error";
import FinancialService from "@/services/models/financial";

export async function fetchCustomerBudgetExpenses(
  id: string,
  token: string,
): Promise<ICustomerBudgetExpensesResponse> {
  try {
    const { fetchBudgetExpenseBalanceByCustomer } = await FinancialService();
    const { data } = await fetchBudgetExpenseBalanceByCustomer(id, token);
    // console.log(response);
    return {
      isError: false,
      budget: data,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}

export async function fetchBudgetExpensesByCustomer(
  customerId: string,
  token: string,
): Promise<IGetCustomerExpensesResponse> {
  try {
    const { fetchCustomerExpenses } = await FinancialService();
    const result = await fetchCustomerExpenses(customerId, token);
    console.log(result.data);
    return {
      isError: false,
      expenses: result.data,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}
