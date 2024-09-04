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

  return {
    fetchBirthdaysOfTheMonth,
  };
}
