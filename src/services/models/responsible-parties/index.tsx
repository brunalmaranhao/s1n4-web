import { post } from "@/services/methods/post";
import { get } from "../../methods/get";

export default async function ResponsiblePartiesService() {
  async function fetchBirthdaysOfTheMonth(): Promise<IResponsibleBirthdaysOfTheMonthResponse> {
    return await get<IResponsibleBirthdaysOfTheMonthResponse>(
      `responsible-parties/birthdays-of-the-month`
    );
  }

  async function fetchAll(): Promise<{responsibles: IResponsibles[]}> {
    return await get<{responsibles: IResponsibles[]}>(
      `responsible-parties/all`
    );
  }

  async function createResponsibleParties(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    customerId: string,
    birthdate: Date,
    role: RoleReponsibleEnum
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
      payload
    );
    return response.responsibleId;
  }

  return {
    fetchBirthdaysOfTheMonth,
    createResponsibleParties,
    fetchAll
  };
}
