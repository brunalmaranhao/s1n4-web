import { post } from "@/services/methods/post";
import { get } from "../../methods/get";
import { put } from "@/services/methods/put";
import { del } from "@/services/methods/delete";

export default async function ProjectsService() {
  async function fetchAllProjects(
    token: string,
    page: number,
    size: number,
  ): Promise<IFetchAllProjectsResponse> {
    return await get<IFetchAllProjectsResponse>(
      `/project?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async function fetchProjects(
    page: number,
    size: number,
  ): Promise<IProject[]> {
    const response = await get<{ projects: IProject[] }>(
      `/project?page=${page}&size=${size}`,
    );
    return response.projects;
  }

  async function fetchProjectsForStatistics(): Promise<IProjectsForStatistics> {
    const response = await get<IProjectsForStatistics>(
      `/projects/statistics`,
    );
    return response;
  }

  async function fetchProjectsCustomerForStatistics(customer: string): Promise<IProjectsForStatistics> {
    const response = await get<IProjectsForStatistics>(
      `/projects/${customer}/statistics`,
    );
    return response;
  }


  async function fetchProjectsByUser(): Promise<IProject[]> {
    const response = await get<{ projects: IProject[] }>(`/projects/customer`);
    return response.projects;
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

  async function createProject(
    name: string,
    customerId: string,
    budget: number,
    listProjectsId: string,
    shouldShowInformationsToCustomerUser: boolean,
    description: string,
    deadline?: Date,
  ): Promise<string> {
    const projectData = {
      name,
      deadline,
      customerId,
      budget,
      listProjectsId,
      shouldShowInformationsToCustomerUser,
      description
    };
    const payload = JSON.stringify(
      Object.fromEntries(
        Object.entries(projectData).filter(([_, value]) => value),
      ),
    );
    const response = await post<{ projectId: string }, string>(
      `/project`,
      payload,
    );
    return response.projectId;
  }

  async function updateStatus(
    id: string,
    statusProject: StatusProject,
  ): Promise<void> {
    const payload = JSON.stringify({ statusProject });
    await put<{ projectId: string }, string>(`/project/update/${id}`, payload);
  }

  async function update(
    id: string,
    name: string,
    budget: number,
    shouldShowInformationsToCustomerUser: boolean,
    deadline?: Date,
  ): Promise<void> {
    const payload = JSON.stringify({
      name,
      deadline,
      budget,
      shouldShowInformationsToCustomerUser,
    });
    await put<{ projectId: string }, string>(`/project/update/${id}`, payload);
  }

  async function remove(id: string): Promise<void> {
    await del<void>(`/project/${id}`);
  }
  async function fetchProjectsByCustomer(
    customerId: string,
  ): Promise<IProject[]> {
    const response = await get<{ projects: IProject[] }>(
      `/customer/${customerId}/projects`,
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
    fetchProjectsByUser,
    fetchProjectsForStatistics,
    fetchProjectsCustomerForStatistics
  };
}
