import { useProjectContext } from "@/context/ProjectContext";
import ListProjectsService from "@/services/models/list-projects";
import { Button, Select, SelectItem, Selection } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";

type MoveProjectProps = {
  listProject: IListProject;
  projectId: string;
  onClose: () => void;
};

export default function MoveProject({
  listProject,
  projectId,
  onClose,
}: MoveProjectProps) {
  const {
    listProjects,
    selectedCustomerFilter,
    fetchListProjectByCustomer,
    setListProjectName,
  } = useProjectContext();
  const [targetList, setTargetList] = useState<Selection>(
    new Set([listProject.id]),
  );

  async function handleChangeProjectListProject() {
    try {
      const { addProjectToList } = await ListProjectsService();
      await addProjectToList(Array.from(targetList)[0]?.toString(), projectId);

      if (selectedCustomerFilter) {
        fetchListProjectByCustomer(selectedCustomerFilter);
        const newList = listProjects.find(
          (item) => item.id === Array.from(targetList)[0]?.toString(),
        );
        if (newList) setListProjectName(newList?.name);
      }
      onClose();
      toast.success("Projeto Movido com sucesso");
    } catch (error) {
      toast.error("Não foi possível atualizar o status do projeto.");
    }
  }

  return (
    <div className="w-full flex flex-col gap-3 p-3">
      <h3 className="self-center text-black dark:text-white">Mover Projeto</h3>
      <Select
        labelPlacement="outside"
        label="Lista de Projetos"
        variant="bordered"
        selectedKeys={targetList}
        onSelectionChange={setTargetList}
        className="text-[#1E1E1E] dark:text-white"
      >
        {listProjects.map((listProject) => (
          <SelectItem
            key={listProject.id}
            value={listProject.id}
            className="text-black dark:text-white"
          >
            {listProject.name}
          </SelectItem>
        ))}
      </Select>
      <Button
        onClick={() => handleChangeProjectListProject()}
        className="bg-transparent border-1 border-[#F57B00] text-[#F57B00]"
      >
        Mover
      </Button>
    </div>
  );
}
