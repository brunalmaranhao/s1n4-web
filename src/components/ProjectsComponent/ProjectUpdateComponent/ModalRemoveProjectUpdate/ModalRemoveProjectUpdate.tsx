import { useProjectUpdateContext } from "@/context/ProjectUpdateContext";
import { handleAxiosError } from "@/services/error";
import ProjectUpdatesService from "@/services/models/project-updates";
import { defaultErrorMessage } from "@/util/default-error-message";
import { Button, Divider, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";

type ModalRemoveProjectUpdatesProps = {
  fetchProjectUpdates: () => void;
};

export default function ModalRemoveProjectUpdates({
  fetchProjectUpdates,
}: ModalRemoveProjectUpdatesProps) {
  const { selectedProjectUpdate, handleSetVisibleModal } = useProjectUpdateContext();
  const [loading, setLoading] = useState(false);

  async function handleRemoveProjectUpdates() {
    if (selectedProjectUpdate?.id) {
      setLoading(true);
      try {
        const { remove } = await ProjectUpdatesService();
        await remove(selectedProjectUpdate.id);
        fetchProjectUpdates();
        handleSetVisibleModal(undefined);
        toast.success("Atualização excluída.");
      } catch (error) {
        const customError = handleAxiosError(error);
        console.log(customError.message);
        toast.error(defaultErrorMessage("excluir", "atualização do projeto"));
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="w-full p-3 flex flex-col gap-3 dark:text-white text-black">
      <div className="flex items-center">
        <div className="flex gap-2 items-center">
          <p className="text-[24px] font-bold">Excluir Atualização</p>
        </div>
      </div>
      <form className="mt-3 flex flex-col gap-3">
        <p>A exclusão de uma atualização do projeto é permanente.</p>
        <p>Não é possível desfazer.</p>
        <Button
          className="text-white bg-[#DA1E28] w-full"
          onClick={() => handleRemoveProjectUpdates()}
        >
          {!loading ? "Excluir" : <Spinner size={"sm"} color={"white"} />}
        </Button>
      </form>
    </div>
  );
}
