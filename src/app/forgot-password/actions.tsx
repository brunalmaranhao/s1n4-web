"use server";

import { handleAxiosError } from "@/services/error";
import { ForgotPasswordProps } from "./page";
import UserService from "@/services/models/user";

export async function forgotPassword(data: ForgotPasswordProps): Promise<{isError: boolean, error?: string}> {
  try {
    const { forgotPassword } = await UserService();
    const response = await forgotPassword(data.email);
    return {
      isError: false,
    };
  } catch (error) {
    console.log(error);
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}
