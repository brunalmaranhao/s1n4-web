import { useProjectContext } from "@/context/ProjectContext";
import ProjectsService from "@/services/models/projects";
import { DragEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CardStatus from "./CardStatus/CardStatus";

export default function ProjectsComponent() {
  const {
    // fetchAllProjects,
    projects,
    selectedCustomerFilter,
    fetchProjectsByCustomer,
  } = useProjectContext();
  const [draggedProject, setDraggedProject] = useState<IProject | null>(null);
  const [highlightedColumn, setHighlightedColumn] =
    useState<StatusProject | null>(null);

  async function handleUpdateStatusProject(id: string, status: StatusProject) {
    try {
      const { updateStatus } = await ProjectsService();
      await updateStatus(id, status);
      if (selectedCustomerFilter) {
        fetchProjectsByCustomer(selectedCustomerFilter);
        return;
      }

      // fetchAllProjects();
    } catch (error) {
      toast.error("Não foi possível atualizar o status do projeto.");
    }
  }

  function handleDragStart(project: IProject) {
    setDraggedProject(project);
  }

  function handleDrop(status: StatusProject) {
    if (draggedProject) {
      handleUpdateStatusProject(draggedProject.id, status);
      setDraggedProject(null);
      setHighlightedColumn(null);
    }
  }

  function allowDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDragEnter(
    event: DragEvent<HTMLDivElement>,
    status: StatusProject
  ) {
    const relatedTarget = event.relatedTarget as Node | null;
    const currentTarget = event.currentTarget as Node;

    if (relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }
    setHighlightedColumn(status);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    const relatedTarget = event.relatedTarget as Node | null;
    const currentTarget = event.currentTarget as Node;

    if (relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }
    setHighlightedColumn(null);
  }

  return (
    <div className="w-full flex items-center justify-center mt-2">
      <div className="flex md:flex-row flex-col gap-3 max-w-[1200px] w-full md:justify-between md:items-start items-center">
        <div className="md:max-w-[380px] max-w-[220px] w-full">
          <CardStatus
            allowDrop={allowDrop}
            handleDragStart={handleDragStart}
            status={"WAITING"}
            handleDrop={handleDrop}
            projects={projects?.filter(
              (item) => item.statusProject === "WAITING"
            )}
            highlightedColumn={highlightedColumn}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
          />
        </div>
        <div className="md:max-w-[380px] max-w-[220px] w-full">
          <CardStatus
            allowDrop={allowDrop}
            handleDragStart={handleDragStart}
            status={"IN_PROGRESS"}
            handleDrop={handleDrop}
            projects={projects?.filter(
              (item) => item.statusProject === "IN_PROGRESS"
            )}
            highlightedColumn={highlightedColumn}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
          />
        </div>
        <div className="md:max-w-[380px] max-w-[220px] w-full">
          <CardStatus
            allowDrop={allowDrop}
            handleDragStart={handleDragStart}
            status={"DONE"}
            handleDrop={handleDrop}
            projects={projects?.filter((item) => item.statusProject === "DONE")}
            highlightedColumn={highlightedColumn}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
          />
        </div>
      </div>
    </div>
  );
}
