"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react";
import { useDisclosure } from "@nextui-org/react";
import { fetchAllProjects } from "@/app/admin/actions";
import ProjectsService from "@/services/models/projects";

type ProjectContextType = {
  isOpenModalCreateProject: boolean;
  onClose: () => void;
  onOpen: () => void
  projects?: IProject[]
  fetchAllProjects: () => void
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [projects, setProjects] = useState<IProject[] | undefined>()

  async function fetchAllProjects(){
    try {
      const { fetchProjects } = await ProjectsService();
      const response = await fetchProjects(1, 100);
      setProjects(response);
    } catch (error) {
      console.log(error);
    }
  }
  


  const contextValue: ProjectContextType = {
    isOpenModalCreateProject: isOpen,
    onClose: onOpenChange,
    onOpen,
    projects,
    fetchAllProjects
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      "useProjectContext deve ser usado dentro de um ProjectProvider"
    );
  }
  return context;
};
