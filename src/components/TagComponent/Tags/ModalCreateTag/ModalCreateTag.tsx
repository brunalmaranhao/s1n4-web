import { useProjectContext } from "@/context/ProjectContext";
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

export default function ModalCreateTag() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>({
    resolver: yupResolver(schemaCreateTag),
    mode: "onSubmit",
    shouldFocusError: false,
  });
  const { handleSelectedVisibleModal, handleSetTagsCreated } = useTagContext();
  const {
    selectedProjectEdit,
    fetchListProjectByCustomer,
    selectedCustomerFilter,
  } = useProjectContext();

  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [hasSend, setHasSend] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  function back() {
    setHasSend(false);
    handleSelectedVisibleModal("tags");
  }

  async function handleCreate(data: { title: string }) {
    setHasSend(true);
    setLoading(true);
    try {
      if (selectedColor && selectedProjectEdit) {
        const { createTag, addTagToProject } = await TagsService();
        const response = await createTag(
          data.title,
          selectedProjectEdit?.customerId,
          selectedColor,
        );
        await addTagToProject(selectedProjectEdit.id, response);
        handleSelectedVisibleModal("tags");
        handleSetTagsCreated({
          id: response,
          name: data.title,
          color: selectedColor,
          customerId: selectedProjectEdit.customerId,
          createdAt: new Date(),
          status: "ACTIVE",
        });
        if (selectedCustomerFilter)
          fetchListProjectByCustomer(selectedCustomerFilter);

        toast.success("Etiqueta adicionada com sucesso.");
      }
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
      setHasSend(false);
    }
  }

  return (
    <div className="w-full p-3 flex flex-col gap-3 dark:text-white text-black">
      <div className="flex items-center">
        <div className="flex gap-2 items-center">
          <MdArrowBackIos onClick={() => back()} className="cursor-pointer" />
          <p className="text-[24px] font-bold">Criar Etiqueta</p>
        </div>
      </div>
      <form
        className="mt-3 flex flex-col gap-3"
        onSubmit={handleSubmit(handleCreate)}
      >
        <Input
          label="Título"
          labelPlacement={"outside"}
          placeholder="Nova etiqueta"
          type="text"
          isInvalid={!!errors.title?.message}
          errorMessage={errors.title?.message}
          {...register("title")}
        />
        <label className={`${!selectedColor && hasSend && "text-[#f31260]"}`}>
          Selecionar uma cor
        </label>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color, index) => (
            <div
              key={color}
              style={{ backgroundColor: color }}
              className={`w-[49px] h-[46px] rounded-lg cursor-pointer ${
                color === selectedColor &&
                "border-2 border-black dark:border-white"
              }`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        {!selectedColor && hasSend && (
          <p className="text-[#f31260] text-[0.75rem]">
            Campo Selecionar uma cor é obrigatório.
          </p>
        )}

        <Divider />
        <Button type="submit" className="text-white bg-[#F57B00] w-full">
          {!loading ? "Criar" : <Spinner size={"sm"} color={"white"} />}
        </Button>
      </form>
    </div>
  );
}
