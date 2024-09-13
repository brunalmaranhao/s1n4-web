import { post } from "@/services/methods/post";
import { get } from "../../methods/get";

export default async function ResponsiblePartiesService() {
  async function fetchBirthdaysOfTheMonth(
    token: string,
  ): Promise<IResponsibleBirthdaysOfTheMonthResponse> {
    return await get<IResponsibleBirthdaysOfTheMonthResponse>(
      `responsible-parties/birthdays-of-the-month`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async function createResponsibleParties(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    customerId: string,
    birthdate: Date,
    role: RoleReponsibleEnum,
  ): Promise<string> {
    const payload = JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      customerId,
      birthdate,
      role,
    });
    const response = await post<{ responsibleId: string }, string>(
      `/responsible-parties`,
      payload,
    );
    return response.responsibleId;
  }

  return {
    fetchBirthdaysOfTheMonth,
    createResponsibleParties,
  };
}
