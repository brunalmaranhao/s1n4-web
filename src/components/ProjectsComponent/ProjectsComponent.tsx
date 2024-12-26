import { useProjectContext } from "@/context/ProjectContext";
import { DragEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ListProjectsService from "@/services/models/list-projects";
import CardListProject from "./CardListProject/CardListProject";
import { handleAxiosError } from "@/services/error";
import FilterProjectsByCustomer from "../FilterProjectsByCustomer/FilterProjectsByCustomer";
import { Button } from "@nextui-org/react";
import { GrAdd } from "react-icons/gr";


export default function ProjectsComponent() {
  const {
    listProjects,
    selectedCustomerFilter,
    fetchListProjectByCustomer,
    onOpenModalCreateListProject,
  } = useProjectContext();

  const [orderedListProjects, setOrderedListProjects] = useState(listProjects);
  const [draggedProject, setDraggedProject] = useState<IProject | null>(null);
  const [highlightedColumn, setHighlightedColumn] = useState<string | null>(
    null,
  );
  const [draggedListIndex, setDraggedListIndex] = useState<number | null>(null);
  const [highlightedListIndex, setHighlightedListIndex] = useState<
    number | null
  >(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOrderedListProjects(listProjects);
  }, [listProjects]);

  async function handleChangeProjectListProject(
    projectId: string,
    listProjectId: string,
  ) {
    try {
      const { addProjectToList } = await ListProjectsService();
      await addProjectToList(listProjectId, projectId);
      if (selectedCustomerFilter) {
        fetchListProjectByCustomer(selectedCustomerFilter);
        return;
      }
    } catch (error) {
      toast.error("Não foi possível atualizar o status do projeto.");
    }
  }

  function handleProjectDragStart(project: IProject) {
    setDraggedProject(project);
  }

  function handleProjectDrop(listProjectId: string) {
    if (draggedProject) {
      handleChangeProjectListProject(draggedProject.id, listProjectId);
      setDraggedProject(null);
      setHighlightedColumn(null);
    }
  }

  function handleListDragStart(index: number, event: DragEvent) {
    if (draggedProject) return; // Previne conflito com drag de projetos
    setDraggedListIndex(index);
    event.stopPropagation();
  }

  async function handleListDrop(targetIndex: number) {
    if (draggedProject) return;
    if (draggedListIndex !== null && draggedListIndex !== targetIndex) {
      const reorderedLists = [...orderedListProjects];
      const [removed] = reorderedLists.splice(draggedListIndex, 1);
      reorderedLists.splice(targetIndex, 0, removed);

      setOrderedListProjects(reorderedLists);

      const orderData = reorderedLists.map((list, index) => ({
        id: list.id,
        order: index + 1,
      }));

      try {
        const { updateOrder } = await ListProjectsService();
        await updateOrder(orderData);
        if (selectedCustomerFilter) {
          fetchListProjectByCustomer(selectedCustomerFilter);
          return;
        }
      } catch (error) {
        const customError = handleAxiosError(error);
        toast.error(customError.message);
      }

      setDraggedListIndex(null);
      setHighlightedListIndex(null);
      setHighlightedColumn(null);
    }
  }

  function allowDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDragEnter(
    event: DragEvent<HTMLDivElement>,
    listProjectId: string,
  ) {
    const relatedTarget = event.relatedTarget as Node | null;
    const currentTarget = event.currentTarget as Node;

    if (relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }
    setHighlightedColumn(listProjectId);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    const relatedTarget = event.relatedTarget as Node | null;
    const currentTarget = event.currentTarget as Node;

    if (relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }
    setHighlightedColumn(null);
  }

  function handleListDragEnter(targetIndex: number) {
    setHighlightedListIndex(targetIndex);
  }

  function handleListDragLeave() {
    setHighlightedListIndex(null);
  }

  const autoScroll = (event: DragEvent) => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const { clientY, clientX } = event;
      const { top, bottom, left, right, height, width } =
        scrollContainer.getBoundingClientRect();
      const offset = 20; // distância do cursor para o limite da área visível para iniciar o scroll

      if (clientX < left + offset) {
        scrollContainer.scrollLeft -= 10;
      } else if (clientX > right - offset) {
        scrollContainer.scrollLeft += 10;
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-2">
      <div
        className="flex md:flex-row flex-col gap-3 p-3 w-full max-w-[1200px] overflow-x-auto [&::-webkit-scrollbar]:h-3
[&::-webkit-scrollbar-track]:bg-gray-100
[&::-webkit-scrollbar-thumb]:bg-gray-300
dark:[&::-webkit-scrollbar-track]:bg-neutral-700
dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        ref={scrollRef}
        onDragOver={autoScroll}
      >
        {selectedCustomerFilter ? (
          <>
            {orderedListProjects.length > 0 ? (
              <>
                {orderedListProjects.map((listProject, index) => (
                  <div
                    key={listProject.id}
                    className={`w-[360px] flex-shrink-0 cursor-grab`}
                    draggable={!draggedProject} // Evita conflito com drag de projetos
                    onDragStart={(e) => handleListDragStart(index, e)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleListDrop(index)}
                    onDragEnter={() => handleListDragEnter(index)}
                    onDragLeave={handleListDragLeave}
                  >
                    <CardListProject
                      allowDrop={allowDrop}
                      handleDragStart={handleProjectDragStart}
                      handleDrop={handleProjectDrop}
                      projects={listProject.projects}
                      name={listProject.name}
                      isDone={listProject.isDone}
                      listProjectId={listProject.id}
                      highlightedColumn={highlightedColumn}
                      handleDragEnter={(event) =>
                        handleDragEnter(event, listProject.id)
                      }
                      handleDragLeave={handleDragLeave}
                    />
                  </div>
                ))}
              </>
            ) : (
              <Button
                color="primary"
                startContent={<GrAdd />}
                className="pr-5 bg-transparent text-[#F57B00] border border-[#F57B00]"
                onPress={() => onOpenModalCreateListProject()}
              >
                Adicionar lista de projetos
              </Button>
            )}
          </>
        ) : (
          <div className="flex items-center gap-4">
            <p className="text-black dark:text-white">Selecione um cliente</p>
            <FilterProjectsByCustomer />
          </div>
        )}
      </div>
    </div>
  );
}
