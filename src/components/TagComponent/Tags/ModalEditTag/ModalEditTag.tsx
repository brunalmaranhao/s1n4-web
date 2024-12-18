import { useTagContext } from "@/context/TagContext";
import { schemaCreateTag } from "@/schemas/tag";
import { handleAxiosError } from "@/services/error";
import TagsService from "@/services/models/tags";
import { colors } from "@/util/tag-colors";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Input, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdArrowBackIos } from "react-icons/md";

export default function ModalEditTag() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<{ title: string }>({
    resolver: yupResolver(schemaCreateTag),
    mode: "onSubmit",
    shouldFocusError: false,
  });
  const {
    handleSelectedVisibleModal,
    handleSelectedTag,
    selectedTag,
    handleUpdateTag,
  } = useTagContext();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTag) {
      setSelectedColor(selectedTag.color);
      setValue("title", selectedTag.name)
    }
  }, [selectedTag]);

  function back() {
    handleSelectedVisibleModal("tags");
    handleSelectedTag(undefined);
  }

  async function handleEdit(data: { title: string }) {
    setLoading(true);
    try {
      if (selectedTag && selectedColor) {
        const { update } = await TagsService();
        await update(selectedTag.id, data.title, selectedColor);
        handleUpdateTag({
          id: selectedTag.id,
          name: data.title,
          color: selectedColor,
        });
        handleSelectedVisibleModal("tags")
        toast.success("Etiqueta atualizada com sucesso.");
      }
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full p-3 flex flex-col gap-3 dark:text-white text-black">
      <div className="flex items-center">
        <div className="flex gap-2 items-center">
          <MdArrowBackIos onClick={() => back()} className="cursor-pointer" />
          <p className="text-[24px] font-bold">Editar Etiqueta</p>
        </div>
      </div>
      <form
        className="mt-3 flex flex-col gap-3"
        onSubmit={handleSubmit(handleEdit)}
      >
        <Input
          label="Título"
          labelPlacement={"outside"}
          placeholder="Nova etiqueta"
          type="text"
          {...register("title")}
        />
        <label>Selecionar uma cor</label>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <div
              style={{ backgroundColor: color }}
              className={`w-[49px] h-[46px] rounded-lg cursor-pointer ${
                color === selectedColor &&
                "border-2 border-black dark:border-white"
              }`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <Divider />
        <div className="flex gap-2">
          <Button type="submit" className="text-white bg-[#F57B00] w-full">
            {!loading ? "Salvar" : <Spinner size={"sm"} color={"white"} />}
          </Button>
          <Button
            type="button"
            className="text-white bg-[#DA1E28] w-full"
            onClick={() => handleSelectedVisibleModal("remove")}
          >
            Excluir
          </Button>
        </div>
      </form>
    </div>
  );
}
