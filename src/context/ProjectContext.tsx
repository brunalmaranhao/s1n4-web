"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useDisclosure } from "@nextui-org/react";
import ProjectsService from "@/services/models/projects";
import CustomerService from "@/services/models/customer";
import toast from "react-hot-toast";
import ListProjectsService from "@/services/models/list-projects";

type ProjectContextType = {
  isOpenModalCreateProject: boolean;
  onClose: () => void;
  onOpen: () => void;
  isOpenModalProjectDetails: boolean;
  onCloseModalProjectDetails: () => void;
  onOpenModalProjectDetails: () => void;
  isOpenModalCreateListProject: boolean;
  onCloseModalCreateListProject: () => void;
  onOpenModalCreateListProject: () => void;
  isOpenModalEdit: boolean;
  onOpenChangeModalEdit: () => void;
  onOpenModalEdit: () => void;
  isOpenModalRemove: boolean;
  onOpenChangeModalRemove: () => void;
  onOpenModalRemove: () => void;

  isOpenModalRemoveListProject: boolean;
  onOpenChangeModalRemoveListProject: () => void;
  onOpenModalRemoveListProject: () => void;
  isOpenModalCreateProjectUpdate: boolean;
  onOpenChangeModalCreateProjectUpdate: () => void;
  onOpenModalCreateProjectUpdate: () => void;
  projects: IProject[];
  projectsUser: IProject[];
  // fetchAllProjects: () => void;
  fetchProjectsByUser: () => void;
  customers: ICustomer[];
  fetchCustomer: () => void;
  fetchProjectsByCustomer: (customerId: string) => void;
  selectedProjectEdit?: IProject;
  setSelectedProjectEdit: React.Dispatch<
    React.SetStateAction<IProject | undefined>
  >;
  selectedProjectRemove?: IProject;
  setSelectedProjectRemove: React.Dispatch<
    React.SetStateAction<IProject | undefined>
  >;
  selectedListProjectRemove?: { id: string; name: string };
  setSelectedListProjectRemove: React.Dispatch<
    React.SetStateAction<{ id: string; name: string } | undefined>
  >;
  selectedProjectCreateProjectUpdate?: IProject;
  setSelectedProjectCreateProjectUpdate: React.Dispatch<
    React.SetStateAction<IProject | undefined>
  >;
  selectedCustomerFilter?: string;
  setSelectedCustomerFilter: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  loadingProjects: boolean;

  fetchListProjectByCustomer: (customerId: string) => void;
  fetchListProjectByUser: () => Promise<void>;
  listProjects: IListProject[];
  setListProjects: React.Dispatch<React.SetStateAction<IListProject[]>>;
  listProjectName?: string
  setListProjectName: React.Dispatch<
  React.SetStateAction<string | undefined>
>;
  selectedListProjectAddProject?: string;
  setSelectedListProjectAddProject: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenModalCreateListProject,
    onOpen: onOpenModalCreateListProject,
    onOpenChange: onCloseModalCreateListProject,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onOpenChange: onOpenChangeModalEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenModalRemove,
    onOpen: onOpenModalRemove,
    onOpenChange: onOpenChangeModalRemove,
  } = useDisclosure();
  const {
    isOpen: isOpenModalProjectDetails,
    onOpen: onOpenModalProjectDetails,
    onOpenChange: onCloseModalProjectDetails,
  } = useDisclosure();

  const {
    isOpen: isOpenModalRemoveListProject,
    onOpen: onOpenModalRemoveListProject,
    onOpenChange: onOpenChangeModalRemoveListProject,
  } = useDisclosure();

  const {
    isOpen: isOpenModalCreateProjectUpdate,
    onOpen: onOpenModalCreateProjectUpdate,
    onOpenChange: onOpenChangeModalCreateProjectUpdate,
  } = useDisclosure();

  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState<
    string | undefined
  >();
  const [selectedListProjectAddProject, setSelectedListProjectAddProject] =
    useState<string>();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [listProjects, setListProjects] = useState<IListProject[]>([]);
  const [projectsUser, setProjectsUser] = useState<IProject[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [selectedProjectEdit, setSelectedProjectEdit] = useState<
    IProject | undefined
  >();
  const [selectedProjectRemove, setSelectedProjectRemove] = useState<
    IProject | undefined
  >();

  const [selectedListProjectRemove, setSelectedListProjectRemove] = useState<
    { id: string; name: string } | undefined
  >();

  const [loadingProjects, setLoadingProjects] = useState(false);

  const [
    selectedProjectCreateProjectUpdate,
    setSelectedProjectCreateProjectUpdate,
  ] = useState<IProject | undefined>();

  const [listProjectName, setListProjectName] = useState<string>()

  // async function fetchAllProjects() {
  //   try {
  //     const { fetchProjects } = await ProjectsService();
  //     const response = await fetchProjects(1, 100);
  //     setProjects(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    if (selectedCustomerFilter) {
      fetchListProjectByCustomer(selectedCustomerFilter);
    }
  }, [selectedCustomerFilter]);

  async function fetchListProjectByCustomer(customerId: string) {
    try {
      const { fetchListProjectByCustomer } = await ListProjectsService();
      const response = await fetchListProjectByCustomer(customerId);
      setListProjects(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchListProjectByUser() {
    try {
      const { fetchListProjectByUser } = await ListProjectsService();
      const response = await fetchListProjectByUser();
      setListProjects(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchProjectsByUser() {
    try {
      const { fetchProjectsByUser } = await ProjectsService();
      const response = await fetchProjectsByUser();
      setProjectsUser(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchProjectsByCustomer(customerId: string) {
    setLoadingProjects(true);
    try {
      const { fetchProjectsByCustomer } = await ProjectsService();
      const response = await fetchProjectsByCustomer(customerId);
      setProjects(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProjects(false);
    }
  }

  async function fetchCustomer() {
    try {
      const { findAllActives } = await CustomerService();
      const response = await findAllActives();
      setCustomers(response.customers);
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar clientes.");
    }
  }

  const contextValue: ProjectContextType = {
    isOpenModalCreateProject: isOpen,
    onClose: onOpenChange,
    onOpen,
    projects,
    // fetchAllProjects,
    customers,
    fetchCustomer,
    fetchProjectsByCustomer,
    isOpenModalEdit,
    onOpenChangeModalEdit,
    onOpenModalEdit,
    selectedProjectEdit,
    setSelectedProjectEdit,
    selectedProjectRemove,
    setSelectedProjectRemove,
    isOpenModalRemove,
    onOpenModalRemove,
    onOpenChangeModalRemove,
    isOpenModalCreateProjectUpdate,
    onOpenChangeModalCreateProjectUpdate,
    onOpenModalCreateProjectUpdate,
    selectedProjectCreateProjectUpdate,
    setSelectedProjectCreateProjectUpdate,
    fetchProjectsByUser,
    projectsUser,
    setSelectedCustomerFilter,
    selectedCustomerFilter,
    loadingProjects,
    listProjects,
    setListProjects,
    fetchListProjectByCustomer,
    fetchListProjectByUser,
    isOpenModalCreateListProject,
    onOpenModalCreateListProject,
    onCloseModalCreateListProject,
    setSelectedListProjectAddProject,
    selectedListProjectAddProject,
    selectedListProjectRemove,
    setSelectedListProjectRemove,
    isOpenModalRemoveListProject,
    onOpenModalRemoveListProject,
    onOpenChangeModalRemoveListProject,
   isOpenModalProjectDetails,
   onCloseModalProjectDetails,
   onOpenModalProjectDetails,
   listProjectName,
   setListProjectName

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
      "useProjectContext deve ser usado dentro de um ProjectProvider",
    );
  }
  return context;
};
