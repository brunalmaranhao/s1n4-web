"use server";

import { handleAxiosError } from "@/services/error";
import SessionService from "@/services/models/session";

export async function createSession(data: ILogin): Promise<ISession> {
  try {
    const { create } = await SessionService();
    const response = await create(data);
    return {
      isError: false,
      access_token: response.access_token,
    };
  } catch (error) {
    console.log(error);
    const customError = handleAxiosError(error);
    return { isError: true, error: customError.message };
  }
}
