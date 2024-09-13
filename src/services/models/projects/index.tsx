import { post } from "@/services/methods/post";
import { get } from "../../methods/get";
import { put } from "@/services/methods/put";
import { del } from "@/services/methods/delete";

export default async function ProjectsService() {
  async function fetchAllProjects(
    token: string
  ): Promise<IFetchAllProjectsResponse> {
    return await get<IFetchAllProjectsResponse>(`/project`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function fetchProjects(
    page: number,
    size: number
  ): Promise<IProject[]> {
    const response = await get<{ projects: IProject[] }>(
      `/project?page=${page}&size=${size}`
    );
    return response.projects;
  }

  async function getProjectById(
    id: string,
    token: string
  ): Promise<IGetProjectByIdResponse> {
    return await get<IGetProjectByIdResponse>(`project/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function createProject(
    name: string,
    customerId: string,
    deadline?: Date
  ): Promise<string> {
    const projectData = {
      name,
      deadline,
      customerId,
    };
    const payload = JSON.stringify(
      Object.fromEntries(
        Object.entries(projectData).filter(([_, value]) => value)
      )
    );
    const response = await post<{ projectId: string }, string>(
      `/project`,
      payload
    );
    return response.projectId;
  }

  async function updateStatus(
    id: string,
    statusProject: StatusProject
  ): Promise<void> {
    const payload = JSON.stringify({ statusProject });
    await put<{ projectId: string }, string>(`/project/update/${id}`, payload);
  }

  async function update(
    id: string,
    name: string,
    customerId: string,
    deadline?: Date
  ): Promise<void> {
    const payload = JSON.stringify({ name, deadline, customerId });
    await put<{ projectId: string }, string>(`/project/update/${id}`, payload);
  }

  async function remove(id: string): Promise<void> {
    await del<void>(`/project/${id}`);
  }
  async function fetchProjectsByCustomer(
    customerId: string
  ): Promise<IProject[]> {
    const response = await get<{ projects: IProject[] }>(
      `/customer/${customerId}/projects`
    );
    return response.projects;
  }

  return {
    fetchAllProjects,
    getProjectById,
    fetchProjects,
    createProject,
    updateStatus,
    fetchProjectsByCustomer,
    update,
    remove,
  };
}
