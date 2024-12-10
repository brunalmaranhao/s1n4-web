"use client";

import ModalCreateProjectUpdate from "@/components/ProjectsComponent/ModaCreateProjectUpdate/ModaCreateProjectUpdate";
import ModalCreateListProject from "@/components/ProjectsComponent/ModalCreateListProject/ModalCreateListProject";
import ModalCreateProject from "@/components/ProjectsComponent/ModalCreateProject/ModalCreateProject";
import ModalEditProject from "@/components/ProjectsComponent/ModalEdit/ModalEditProject";
import ModalRemoveProject from "@/components/ProjectsComponent/ModalRemove/ModalRemoveProject";
import ModalRemoveListProject from "@/components/ProjectsComponent/ModalRemoveListProject/ModalRemoveListProject";
import ProjectsComponent from "@/components/ProjectsComponent/ProjectsComponent";

export default function Projects() {
  return (
    <div className="min-h-screen w-full">
      <ProjectsComponent />

      <ModalCreateProject />
      <ModalEditProject />
      <ModalRemoveProject />
      <ModalCreateProjectUpdate />
      <ModalCreateListProject />
      <ModalRemoveListProject />
    </div>
  );
}
