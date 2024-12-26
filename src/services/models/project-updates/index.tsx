import { post } from "@/services/methods/post";
import { get } from "../../methods/get";
import { del } from "@/services/methods/delete";
import { patch } from "@/services/methods/patch";

export default async function ProjectUpdatesService() {
  async function fetchAllProjectUpdates(
    token: string
  ): Promise<IFetchAllProjectUpdatesResponse> {
    return await get<IFetchAllProjectUpdatesResponse>(`/project-updates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function createProjectUpdate(
    description: string,
    projectId: string
  ): Promise<void> {
    const payload = JSON.stringify({ description, projectId });
    await post(`/project-updates`, payload);
  }

  async function fetchCustomerProjectUpdates(
    token: string,
    customerId: string
  ): Promise<ICustomerProjectUpdatesResponse> {
    return await get<ICustomerProjectUpdatesResponse>(
      `/project-updates/customer/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async function fetchProjectProjectUpdates(
    projectId: string
  ): Promise<ICustomerProjectUpdatesResponse> {
    return await get<ICustomerProjectUpdatesResponse>(
      `/project-updates/project/${projectId}`
    );
  }

  async function remove(id: string): Promise<void> {
    await del<void>(`/project-updates/${id}`);
  }

  async function update(
    id: string,
    description: string,
  ): Promise<void> {
    const payload = JSON.stringify({
      description,
    });
    await patch(`/project-updates/update/${id}`, payload);
  }


  return {
    fetchAllProjectUpdates,
    createProjectUpdate,
    fetchCustomerProjectUpdates,
    remove,
    fetchProjectProjectUpdates,
    update
  };
}
