import { get } from "../../methods/get";

export default async function ProjectUpdatesService() {
  async function fetchAllProjectUpdates(
    token: string,
  ): Promise<IFetchAllProjectUpdatesResponse> {
    return await get<IFetchAllProjectUpdatesResponse>(`/project-updates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return {
    fetchAllProjectUpdates,
  };
}
