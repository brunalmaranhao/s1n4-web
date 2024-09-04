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

  return {
    getUserById,
  };
}
