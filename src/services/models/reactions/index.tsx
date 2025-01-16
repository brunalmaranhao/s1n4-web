import { del } from "@/services/methods/delete";
import { post } from "@/services/methods/post";

export default async function ReactionService() {

  async function createReactionComment(
    commentId: string,
    unified: string
  ): Promise<void> {
    const payload = JSON.stringify({ commentId, unified });
    await post(`/reaction/comment`, payload);
  }

  async function createReactionProjectUpdate(
    projectUpdateId: string,
    unified: string
  ): Promise<void> {
    const payload = JSON.stringify({ projectUpdateId, unified });
    await post(`/reaction/project-update`, payload);
  }

  async function removeReactionComment(id: string): Promise<void> {
    await del<void>(`/reaction/comment/${id}`);
  }
  async function removeReactionProjectUpdate(id: string): Promise<void> {
    await del<void>(`/reaction/project-update/${id}`);
  }



  return {
    createReactionComment,
    createReactionProjectUpdate,
    removeReactionComment,
    removeReactionProjectUpdate
  };
}
