import { post } from "@/services/methods/post";
import { get } from "../../methods/get";
import { del } from "@/services/methods/delete";
import { patch } from "@/services/methods/patch";

export default async function CommentService() {
  async function createComment(
    projectUpdateId: string,
    content: string
  ): Promise<void> {
    const payload = JSON.stringify({ projectUpdateId, content });
    await post(`/comment`, payload);
  }


  async function remove(id: string): Promise<void> {
    await del<void>(`/comment/${id}`);
  }

  async function update(id: string, content: string): Promise<void> {
    const payload = JSON.stringify({
      content,
    });
    await patch(`/comment/update/${id}`, payload);
  }

  return {
    createComment,
    remove,
    update,
  };
}
