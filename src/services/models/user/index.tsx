import { post } from "@/services/methods/post";
import { get } from "../../methods/get";
import { put } from "@/services/methods/put";

export default async function UserService() {
  async function getUserById(
    id: string,
    token: string,
  ): Promise<IGetUserResponse> {
    const payload = JSON.stringify(id);
    return await get<IGetUserResponse>(`/user/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function fetchLoggedUser(): Promise<IGetUserResponse> {
    return await get<IGetUserResponse>(`/user`);
  }

  async function createUserCustomer(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    customerId: string,
    role: RoleEnum,
  ): Promise<string> {
    const payload = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      customerId,
      role,
    });
    const response = await post<{ userId: string }, string>(`/user`, payload);
    return response.userId;
  }

  async function fetchActiveUsers(
    token: string,
  ): Promise<IGetActiveUsersResponse> {
    return await get<IGetActiveUsersResponse>(`/user/active`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function fetchCustomerUser(
    token: string,
    id: string,
  ): Promise<ICustomerUserByIdResponse> {
    return await get<ICustomerUserByIdResponse>(`/user/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function forgotPassword(email: string): Promise<void> {
    const payload = JSON.stringify({
      email,
    });
    await post(`/user/forgot-password`, payload);
  }

  async function updatePasswordPublic(
    email: string,
    password: string,
    token: string,
  ): Promise<void> {
    const payload = JSON.stringify({
      email,
      password,
      token,
    });
    await put(`/user/update-password`, payload);
  }

  async function updatePasswordPrivate(password: string): Promise<void> {
    const payload = JSON.stringify({
      password,
    });
    await put(`/user/update-password-private`, payload);
  }

  return {
    getUserById,
    createUserCustomer,
    fetchActiveUsers,
    fetchCustomerUser,
    fetchLoggedUser,
    forgotPassword,
    updatePasswordPublic,
    updatePasswordPrivate,
  };
}
