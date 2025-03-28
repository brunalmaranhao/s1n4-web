import { useEffect, useState } from "react";
import ProjectUpdateCard from "../ProjectUpdateCard/ProjectUpdateCard";
import { Spinner, useDisclosure } from "@nextui-org/react";
import { Roboto } from "next/font/google";
import ProjectUpdatesService from "@/services/models/project-updates";
import { handleAxiosError } from "@/services/error";
import ModalProjectDetailView from "../ModalProjectDetailView/ModalProjectDetailView";

const robotoBold = Roboto({
  weight: "700",
  subsets: ["latin"],
});

interface UserInfoprops {
  email: string;
  role: string;
}

export default function ProjectUpdatesAdmin({ email, role }: UserInfoprops) {
  const [projectUpdatesState, setProjectUpdatesState] = useState<
    IProjectUpdates[] | []
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [projectUpdateSelected, setProjectUpdateSelected] =
    useState<IProjectUpdates>();

  const handleProjectUpdates = async () => {
    try {
      const { fetchAllProjectUpdates } = await ProjectUpdatesService();
      const response = await fetchAllProjectUpdates();
      setProjectUpdatesState(response.updates);
    } catch (error) {
      const customError = handleAxiosError(error);
      return { isError: true, error: customError.message };
    }
  };

  useEffect(() => {
    handleProjectUpdates();
  }, []);
  const roleTranslations: { [key: string]: string } = {
    INTERNAL_MANAGEMENT: "Gestão Interna",
    INTERNAL_PARTNERS: "Parceiros Internos",
    INTERNAL_FINANCIAL_LEGAL: "Financeiro/Jurídico",
  };

  function getRoleName(value: string) {
    console.log(value);
    return roleTranslations[value];
  }

  function handleOpenModal(item: IProjectUpdates) {
    setProjectUpdateSelected(item);
    onOpen();
  }

  return (
    <div
      className="bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] p-4 rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] h-[275px] overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <h1
        className={`${robotoBold.className} text-[18px] font-bold text-[#21272A] dark:text-white mb-4`}
      >
        Feed de atualizações (caixa de entrada)
      </h1>
      {isLoading ? (
        <Spinner />
      ) : (
        projectUpdatesState.map((projectUpdate, index) => (
          <div
            key={index}
            onClick={() => handleOpenModal(projectUpdate)}
            className="cursor-pointer"
          >
            <ProjectUpdateCard
              email={projectUpdate.user.email}
              role={getRoleName(projectUpdate.user.role)}
              projectUpdate={projectUpdate}
              key={index}
              isLast={index === projectUpdatesState.length - 1}
            />
          </div>
        ))
      )}
      {projectUpdateSelected && (
        <ModalProjectDetailView
          isOpen={isOpen}
          onClose={onOpenChange}
          origin="table"
          projectUpdates={projectUpdateSelected}
        />
      )}
    </div>
  );
}
