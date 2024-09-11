"use client";

import ModalCreateProject from "@/components/ProjectsComponent/ModalCreateProject/ModalCreateProject";
import ModalEditProject from "@/components/ProjectsComponent/ModalEdit/ModalEditProject";
import ProjectsComponent from "@/components/ProjectsComponent/ProjectsComponent";
import { useProjectContext } from "@/context/ProjectContext";

export default function Projects() {
  const { isOpenModalCreateProject, onClose } = useProjectContext();

  return (
    <div className="min-h-screen w-full">
        <ProjectsComponent />

      <ModalCreateProject isOpen={isOpenModalCreateProject} onClose={onClose} />
      <ModalEditProject />
    </div>
  );
}
