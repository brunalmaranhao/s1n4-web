"use client";

import ModalCreateProjectUpdate from "@/components/ProjectsComponent/ModaCreateProjectUpdate/ModaCreateProjectUpdate";
import ModalCreateProject from "@/components/ProjectsComponent/ModalCreateProject/ModalCreateProject";
import ModalEditProject from "@/components/ProjectsComponent/ModalEdit/ModalEditProject";
import ModalRemoveProject from "@/components/ProjectsComponent/ModalRemove/ModalRemoveProject";
import ProjectsComponent from "@/components/ProjectsComponent/ProjectsComponent";

export default function Projects() {
  

  return (
    <div className="min-h-screen w-full">
      <ProjectsComponent />

      <ModalCreateProject />
      <ModalEditProject />
      <ModalRemoveProject />
      <ModalCreateProjectUpdate />
      
    </div>
  );
}
