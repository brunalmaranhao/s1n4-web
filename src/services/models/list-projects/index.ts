import { post } from "@/services/methods/post";
import { get } from "../../methods/get";
import { put } from "@/services/methods/put";
import { del } from "@/services/methods/delete";
import { patch } from "@/services/methods/patch";

export default async function ListProjectsService() {
  async function createListProject(
    name: string,
    customerId: string,
  ): Promise<string> {
    const projectData = {
      name,
      customerId,
    };
    const payload = JSON.stringify(
      Object.fromEntries(
        Object.entries(projectData).filter(([_, value]) => value),
      ),
    );
    const response = await post<{ listProjectId: string }, string>(
      `/list-project`,
      payload,
    );
    return response.listProjectId;
  }

  async function updateName(id: string, name: string): Promise<void> {
    const payload = JSON.stringify({ id, name });
    await patch<{ listProjectId: string }, string>(`/list-project`, payload);
  }

  async function updateOrder(
    order: { id: string; order: number }[],
  ): Promise<void> {
    const payload = { order };
    await patch(`/list-project/update-order`, payload);
  }

  async function addProjectToList(
    listProjectId: string,
    projectId: string,
  ): Promise<void> {
    const payload = JSON.stringify({ listProjectId, projectId });
    await patch<{ projectId: string }, string>(
      `/list-project/add-project`,
      payload,
    );
  }

  async function remove(id: string): Promise<void> {
    await del<void>(`/list-project/${id}`);
  }

  async function fetchListProjectByCustomer(
    customerId: string,
  ): Promise<IListProject[]> {
    const response = await get<{ listProjects: IListProject[] }>(
      `/list-project/customer/${customerId}`,
    );
    return response.listProjects;
  }

  async function fetchListProjectByCustomerAndDate(
    customerId: string,
    startDate: string,
    endDate: string,
  ): Promise<IListProject[]> {
    const response = await get<{ listProjects: IListProject[] }>(
      `/list-project/customer/${customerId}/startDate/${startDate}/endDate/${endDate}`,
    );
    return response.listProjects;
  }

  async function fetchListProjectByUser(): Promise<IListProject[]> {
    const response = await get<{ listProjects: IListProject[] }>(
      `/list-project`,
    );
    return response.listProjects;
  }

  return {
    createListProject,
    updateName,
    fetchListProjectByCustomer,
    addProjectToList,
    remove,
    fetchListProjectByUser,
    updateOrder,
    fetchListProjectByCustomerAndDate,
  };
}
