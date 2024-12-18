import { useTagContext } from "@/context/TagContext";
import { handleAxiosError } from "@/services/error";
import TagsService from "@/services/models/tags";
import { colors } from "@/util/tag-colors";
import { Button, Divider, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdArrowBackIos } from "react-icons/md";

export default function ModalRemoveTag() {
  const {
    handleSelectedVisibleModal,
    handleSelectedTag,
    selectedTag,
    handleSetTags,
    tags,
  } = useTagContext();
  const [loading, setLoading] = useState(false);

  async function handleRemoveProject() {
    if (selectedTag?.id) {
      setLoading(true);
      try {
        const { remove } = await TagsService();
        await remove(selectedTag.id);
        const filteredTags = tags.filter((tag) => tag.id !== selectedTag.id);
        handleSetTags(filteredTags);
        back();
      } catch (error) {
        const customError = handleAxiosError(error);
        toast.error(customError.message);
      } finally {
        setLoading(false);
      }
    }
  }

  function back() {
    handleSelectedVisibleModal("tags");
    handleSelectedTag(undefined);
  }
  return (
    <div className="w-full p-3 flex flex-col gap-3 dark:text-white text-black">
      <div className="flex items-center">
        <div className="flex gap-2 items-center">
          <MdArrowBackIos onClick={() => back()} className="cursor-pointer" />
          <p className="text-[24px] font-bold">Excluir Etiqueta</p>
        </div>
      </div>
      <form className="mt-3 flex flex-col gap-3">
        <p>
          Isso removerá a etiqueta <b>{selectedTag?.name}</b> de todos os
          cartões. 
        </p>
        <p>Não é possível desfazer.</p>
        <Button
          className="text-white bg-[#DA1E28] w-full"
          onClick={() => handleRemoveProject()}
        >
         {!loading ? "Excluir" : <Spinner size={"sm"} color={"white"} />}
        </Button>
      </form>
    </div>
  );
}
