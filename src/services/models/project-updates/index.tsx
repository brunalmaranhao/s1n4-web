import { post } from "@/services/methods/post";
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

  async function createProjectUpdate(
    description: string,
    projectId: string,
  ): Promise<void> {
    const payload = JSON.stringify({ description, projectId });
    await post(`/project-updates`, payload);
  }

  return {
    fetchAllProjectUpdates,
    createProjectUpdate,
  };
}
