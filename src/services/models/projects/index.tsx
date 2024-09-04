import { get } from "../../methods/get";

export default async function ProjectsService() {
  async function fetchAllProjects(
    token: string,
  ): Promise<IFetchAllProjectsResponse> {
    return await get<IFetchAllProjectsResponse>(`/project`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function getProjectById(
    id: string,
    token: string,
  ): Promise<IGetProjectByIdResponse> {
    return await get<IGetProjectByIdResponse>(`project/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return {
    fetchAllProjects,
    getProjectById,
  };
}
