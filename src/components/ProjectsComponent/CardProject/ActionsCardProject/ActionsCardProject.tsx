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
  
  const {onOpenModalEdit, setSelectedProjectEdit} = useProjectContext() 

  function handleEdit(){
    setSelectedProjectEdit(project)
    onOpenModalEdit()
  }

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <button>
          <MdMoreVert />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="single"
        variant="light"
        aria-label="Static Actions"
      >
        <DropdownItem key={"edit"} className="text-black" onPress={() => handleEdit()}>
          Editar
        </DropdownItem>
        <DropdownItem key={"delete"} className="text-black">
          Remover
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
