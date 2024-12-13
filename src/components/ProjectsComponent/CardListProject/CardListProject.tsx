import { DragEvent, useEffect, useState } from "react";
import CardProject from "../CardProject/CardProject";
import debounce from "lodash.debounce";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { MdAdd, MdMoreHoriz } from "react-icons/md";
import { useProjectContext } from "@/context/ProjectContext";
import ListProjectsService from "@/services/models/list-projects";
import { handleAxiosError } from "@/services/error";
import toast from "react-hot-toast";
import { VerticalDotsIcon } from "@/assets/verticalDotIcon";
import { DeleteDocumentIcon } from "@/assets/DeleteDocumentIcon";

type CardListProjectProps = {
  handleDrop: (listProjectId: string) => void;
  allowDrop: (event: DragEvent<HTMLDivElement>) => void;
  projects?: IProject[];
  handleDragStart: (project: IProject) => void;
  name: string;
  listProjectId: string;
  handleDragEnter: (
    event: DragEvent<HTMLDivElement>,
    listProjectId: string,
  ) => void;
  handleDragLeave: (event: DragEvent<HTMLDivElement>) => void;
  highlightedColumn: string | null;
};

export default function CardListProject({
  handleDrop,
  allowDrop,
  projects,
  name,
  listProjectId,
  handleDragStart,
  handleDragEnter,
  handleDragLeave,
  highlightedColumn,
}: CardListProjectProps) {
  const {
    onOpen,
    setSelectedListProjectAddProject,
    onOpenModalRemoveListProject,
    setSelectedListProjectRemove,
  } = useProjectContext();
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const [currentName, setCurrentName] = useState(name);

  async function handleEditName(updatedName: string) {
    if (!updatedName.trim()) {
      return;
    }
    try {
      const { updateName } = await ListProjectsService();
      await updateName(listProjectId, updatedName);
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    }
  }

  useEffect(() => {
    if (currentName !== name) {
      debouncedUpdateName(currentName);
    }
    return () => {
      debouncedUpdateName.cancel();
    };
  }, [currentName]);

  const debouncedUpdateName = debounce(handleEditName, 300);

  return (
    <div
      className={`bg-[#F57B00]   text-black px-4 pt-4 w-full rounded-md min-h-[100px] ${
        highlightedColumn === listProjectId ? "border-2 border-white" : ""
      } flex flex-col justify-between`}
      onDrop={() => handleDrop(listProjectId)}
      onDragOver={allowDrop}
      onDragEnter={(e) => handleDragEnter(e, listProjectId)}
      onDragLeave={handleDragLeave}
    >
      <div>
        <div className="flex justify-between">
          <input
            className="text-white bg-transparent outline-none w-full"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
          />
          <div className="flex items-center gap-1">
            <small className="text-tiny bg-white text-[#F57B00] flex items-center justify-center rounded-full w-6 h-6 p-2">
              {projects?.length}
            </small>
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <MdMoreHoriz className="text-white" size={24} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="text-black dark:text-white">
                <DropdownItem
                  startContent={<DeleteDocumentIcon className={iconClasses} />}
                  onClick={() => {
                    onOpenModalRemoveListProject();
                    setSelectedListProjectRemove({ id: listProjectId, name });
                  }}
                >
                  Desativar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {projects?.map((project, index) => (
            <CardProject
              key={index}
              handleDragStart={handleDragStart}
              project={project}
            />
          ))}
        </div>
      </div>
      <Button
        className="bg-transparent text-white hover:border-1 mb-2"
        onPress={() => {
          onOpen();
          setSelectedListProjectAddProject(listProjectId);
        }}
      >
        {" "}
        <MdAdd /> Adicionar Projeto
      </Button>
    </div>
  );
}
