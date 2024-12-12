"use server";

import { handleAxiosError } from "@/services/error";
import CustomerService from "@/services/models/customer";

export async function fetchActiveCustomers(
  token: string,
): Promise<{ isError: boolean; error?: string; customers?: ICustomer[] }> {
  try {
    const { findAllActiveCustomers } = await CustomerService();
    const response = await findAllActiveCustomers(token);
    return {
      isError: false,
      customers: response.customers,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}
