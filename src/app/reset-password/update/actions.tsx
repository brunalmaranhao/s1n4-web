"use server";

import { handleAxiosError } from "@/services/error";
import UserService from "@/services/models/user";

export async function updatePassword(
  email: string,
  password: string,
  token: string
): Promise<{ isError: boolean; error?: string }> {
  try {
    const { updatePasswordPublic } = await UserService();
    const response = await updatePasswordPublic(email, password, token);
    return {
      isError: false,
    };
  } catch (error) {
    console.log(error);
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}
