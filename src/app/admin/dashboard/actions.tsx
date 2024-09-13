"use server";

import { handleAxiosError } from "@/services/error";
import CustomerService from "@/services/models/customer";
import UserService from "@/services/models/user";

export async function fetchActiveUsers(token: string): Promise<IActiveUsers> {
  try {
    const { fetchActiveUsers } = await UserService();
    const response = await fetchActiveUsers(token);
    return {
      isError: false,
      users: response.users,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}

export async function findAllCustomers(
  token: string,
): Promise<IActiveCustomersResponse> {
  try {
    const { getAllCustomers } = await CustomerService();
    const { customers, total } = await getAllCustomers(token);

    return {
      isError: false,
      customersLength: total,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}

export async function fetchCustomersWithUsers(
  token: string,
): Promise<ICustomersWithUsersResponse> {
  try {
    const { fetchCustomersWithUsers } = await CustomerService();
    const { customersWithUsers } = await fetchCustomersWithUsers(token);

    return {
      isError: false,
      customersWithUsers,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}
