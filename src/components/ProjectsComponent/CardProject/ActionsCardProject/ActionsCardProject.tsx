import { useProjectContext } from "@/context/ProjectContext";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { MdMoreVert } from "react-icons/md";

type ActionsCardProjectProps = {
  project: IProject;
};

export default function ActionsCardProject({
  project,
}: ActionsCardProjectProps) {
  const {
    onOpenModalEdit,
    setSelectedProjectEdit,
    onOpenModalRemove,
    setSelectedProjectRemove,
    setSelectedProjectCreateProjectUpdate,
    onOpenModalCreateProjectUpdate,
  } = useProjectContext();

  function handleEdit() {
    setSelectedProjectEdit(project);
    onOpenModalEdit();
  }

  function handleRemove() {
    setSelectedProjectRemove(project);
    onOpenModalRemove();
  }

  function handleCreateProjectUpdate() {
    setSelectedProjectCreateProjectUpdate(project);
    onOpenModalCreateProjectUpdate();
  }

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <button>
          <MdMoreVert className="text-black dark:text-white" />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="single"
        variant="light"
        aria-label="Static Actions"
      >
        <DropdownItem
          key={"projectUpdate"}
          className="text-black dark:text-white"
          onPress={() => handleCreateProjectUpdate()}
        >
          Adicionar Atualização
        </DropdownItem>
        <DropdownItem
          key={"edit"}
          className="text-black dark:text-white"
          onPress={() => handleEdit()}
        >
          Editar
        </DropdownItem>
        <DropdownItem
          key={"delete"}
          className="text-black dark:text-white"
          onPress={() => handleRemove()}
        >
          Desativar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
