"use server";

import { handleAxiosError } from "@/services/error";
import CustomerService from "@/services/models/customer";
import ProjectUpdatesService from "@/services/models/project-updates";
import UserService from "@/services/models/user";

export async function fetchCustomerUser(id: string, token?: string) {
  try {
    const { fetchCustomerUser } = await UserService();
    const { user } = await fetchCustomerUser(id, token);

    return {
      isError: false,
      customerUser: user,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}

export async function userFetchCustomerById(customerId: string, token: string) {
  try {
    const { getCustomerById } = await CustomerService();
    const { customer } = await getCustomerById(customerId, token);
    return {
      isError: false,
      customer,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}

export async function fetchCustomerProjectUpdates(
  token: string,
  customerId: string,
) {
  try {
    const { fetchCustomerProjectUpdates } = await ProjectUpdatesService();
    const { updates } = await fetchCustomerProjectUpdates(token, customerId);
    return {
      isError: false,
      updates,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}

export async function fetchCustomerReports(token: string, customerId: string) {
  try {
    const { fetchCustomerReports } = await CustomerService();
    const { reports } = await fetchCustomerReports(token, customerId);

    // console.log(reports);

    return {
      isError: false,
      reports,
    };
  } catch (error) {
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}
