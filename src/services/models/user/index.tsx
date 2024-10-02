import { post } from "@/services/methods/post";
import { get } from "../../methods/get";

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

  return {
    getUserById,
    createUserCustomer,
    fetchActiveUsers,
    fetchCustomerUser,
  };
}
