import { useProjectContext } from "@/context/ProjectContext";
import { useTagContext } from "@/context/TagContext";
import { handleAxiosError } from "@/services/error";
import TagsService from "@/services/models/tags";
import { Button, Input, Checkbox, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import debounce from "lodash.debounce";

export default function ModalTags() {
  const [tags, setTags] = useState<ITag[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedProjectEdit } = useProjectContext();
  const [loading, setLoading] = useState(true);
  const {
    handleSelectedVisibleModal,
    handleSelectedTag,
    handleSetTagsCreated,
    handleRemoveTag,
    tags: tagsProject,
  } = useTagContext();

  async function fetchTags(query?: string) {
    if (query && selectedProjectEdit) {
      setLoading(true);
      try {
        const { searchTag } = await TagsService();
        const response = await searchTag(selectedProjectEdit.customerId, query);
        setTags(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else if (selectedProjectEdit) {
      setLoading(true);
      try {
        const { fetchTagsByCustomer } = await TagsService();
        const response = await fetchTagsByCustomer(
          selectedProjectEdit.customerId
        );
        setTags(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchTags();
  }, [selectedProjectEdit]);

  useEffect(() => {
    if (searchTerm) {
      debouncedUpdateName(searchTerm);
    } else {
      fetchTags();
    }
    return () => {
      debouncedUpdateName.cancel();
    };
  }, [searchTerm]);

  const debouncedUpdateName = debounce(fetchTags, 300);

  function checked(tagId: string) {
    const exist = tagsProject.find((tag) => tag.id === tagId);
    return exist ? true : false;
  }

  async function changeValue(tag: ITag, value: boolean) {
    setLoading(true);
    const { addTagToProject, removeTagToProject } = await TagsService();
    if (value) {
      try {
        if (selectedProjectEdit) {
          await addTagToProject(selectedProjectEdit.id, tag.id);
          handleSetTagsCreated({
            id: tag.id,
            name: tag.name,
            color: tag.color,
            customerId: tag.customerId,
            createdAt: tag.createdAt,
            status: "ACTIVE",
          });

          toast.success(
            `Etiqueta ${tag.name} adicionada ao projeto ${selectedProjectEdit.name} com sucesso.`
          );
        }
      } catch (error) {
        const customError = handleAxiosError(error);
        toast.error(customError.message);
      } finally {
        setLoading(false);
        return;
      }
    }
    try {
      if (selectedProjectEdit) {
        await removeTagToProject(selectedProjectEdit.id, tag.id);
        handleRemoveTag(tag);

        toast.success(
          `Etiqueta ${tag.name} removida do projeto ${selectedProjectEdit.name} com sucesso.`
        );
      }
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
      return;
    }
  }

  return (
    <div className="p-3 w-full dark:text-white text-black flex flex-col gap-3">
      <p className="text-[24px] font-bold">Etiquetas</p>
      <Input
        placeholder="Buscar etiquetas..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p className="text-[14px] font-normal">Etiquetas</p>
      {tags.length > 0 ? (
        <div
          className="flex flex-col pr-3 gap-2 h-28 overflow-auto [&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:bg-gray-100
[&::-webkit-scrollbar-thumb]:bg-gray-300
dark:[&::-webkit-scrollbar-track]:bg-neutral-700
dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center gap-2">
              <Checkbox
                color="success"
                defaultSelected={checked(tag.id)}
                onValueChange={(value) => changeValue(tag, value)}
              />
              <div
                className="text-white text-[16px] font-normal pl-5 w-[292px] h-[46px] rounded-lg flex items-center justify-start"
                style={{ backgroundColor: tag.color }}
              >
                <p className="max-w-[180px] truncate">{tag.name}</p>
              </div>
              <Button
                onClick={() => {
                  handleSelectedVisibleModal("edit");
                  handleSelectedTag(tag);
                }}
                className="min-w-0 p-0 text-[24px] bg-transparent text-[#F57B00]"
              >
                <MdEdit />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <>
          {loading ? (
            <Spinner size="sm" color="success" />
          ) : (
            <small>Nenhuma etiqueta criada.</small>
          )}
        </>
      )}

      <Button
        onClick={() => handleSelectedVisibleModal("create")}
        className="bg-transparent border-1 border-[#F57B00] text-[#F57B00]"
      >
        Criar nova etiqueta
      </Button>
    </div>
  );
}
