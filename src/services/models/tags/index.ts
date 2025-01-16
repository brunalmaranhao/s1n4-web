import { post } from "@/services/methods/post";
import { get } from "../../methods/get";
import { put } from "@/services/methods/put";
import { del } from "@/services/methods/delete";

export default async function TagsService() {
  async function fetchTagsByCustomer(customerId: string): Promise<ITag[]> {
    const response = await get<{ tags: ITag[] }>(
      `/tags/customer/${customerId}`,
    );
    return response.tags;
  }

  async function createTag(
    name: string,
    customerId: string,
    color: string,
  ): Promise<string> {
    const projectData = {
      name,
      customerId,
      color,
    };
    const payload = JSON.stringify(
      Object.fromEntries(
        Object.entries(projectData).filter(([_, value]) => value),
      ),
    );
    const response = await post<{ tagId: string }, string>(`/tag`, payload);
    return response.tagId;
  }

  async function addTagToProject(
    projectId: string,
    tagId: string,
  ): Promise<void> {
    const projectData = {
      projectId,
      tagId,
    };
    const payload = JSON.stringify(
      Object.fromEntries(
        Object.entries(projectData).filter(([_, value]) => value),
      ),
    );
    const response = await post(`/project/tag/add`, payload);
  }

  async function removeTagToProject(
    projectId: string,
    tagId: string,
  ): Promise<void> {
    const projectData = {
      projectId,
      tagId,
    };
    const payload = JSON.stringify(
      Object.fromEntries(
        Object.entries(projectData).filter(([_, value]) => value),
      ),
    );
    const response = await post(`/project/tag/remove`, payload);
  }

  async function searchTag(customerId: string, name: string): Promise<ITag[]> {
    const response = await get<{ tags: ITag[] }>(
      `/tags/search/customer/${customerId}/name/${name}`,
    );
    return response.tags;
  }

  async function update(
    id: string,
    name: string,
    color: string,
  ): Promise<void> {
    const payload = JSON.stringify({
      name,
      color,
    });
    await put(`/tag/update/${id}`, payload);
  }

  async function remove(id: string): Promise<void> {
    await del<void>(`/tag/${id}`);
  }

  return {
    update,
    remove,
    createTag,
    fetchTagsByCustomer,
    addTagToProject,
    removeTagToProject,
    searchTag,
  };
}
