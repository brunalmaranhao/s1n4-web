import { useProjectUpdateContext } from "@/context/ProjectUpdateContext";
import { useTagContext } from "@/context/TagContext";
import { handleAxiosError } from "@/services/error";
import CommentService from "@/services/models/comments";
import { defaultErrorMessage } from "@/util/default-error-message";
import { Button, Divider, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";

type ModalRemoveCommentProps = {
  fetchProjectUpdates: () => void;
};

export default function ModalRemoveComment({
  fetchProjectUpdates,
}: ModalRemoveCommentProps) {
  const { selectedComment, handleSetVisibleModal } = useProjectUpdateContext();
  const [loading, setLoading] = useState(false);

  async function handleRemoveComment() {
    if (selectedComment?.id) {
      setLoading(true);
      try {
        const { remove } = await CommentService();
        await remove(selectedComment.id);
        fetchProjectUpdates();
        handleSetVisibleModal(undefined);
        toast.success("Comentário excluído.");
      } catch (error) {
        const customError = handleAxiosError(error);
        console.log(customError.message);
        toast.error(defaultErrorMessage("excluir", "comentário"));
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="w-full p-3 flex flex-col gap-3 dark:text-white text-black">
      <div className="flex items-center">
        <div className="flex gap-2 items-center">
          <p className="text-[24px] font-bold">Excluir Comentário</p>
        </div>
      </div>
      <form className="mt-3 flex flex-col gap-3">
        <p>A exclusão de um comentário é permanente.</p>
        <p>Não é possível desfazer.</p>
        <Button
          className="text-white bg-[#DA1E28] w-full"
          onClick={() => handleRemoveComment()}
        >
          {!loading ? "Excluir" : <Spinner size={"sm"} color={"white"} />}
        </Button>
      </form>
    </div>
  );
}
