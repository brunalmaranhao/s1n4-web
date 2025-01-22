import { Spinner } from "@nextui-org/react";
import { Roboto } from "next/font/google";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import CustomerProjectUpdatesCard from "../CustomerProjectUpdatesCard/CustomerProjectUpdatesCard";
import { fetchCustomerProjectUpdates } from "@/app/customer/actions";
import ProjectUpdateCard from "../ProjectUpdateCard/ProjectUpdateCard";

const robotoBold = Roboto({
  weight: "700",
  subsets: ["latin"],
});

interface ProjectUpdatesCustomerProps {
  customerId: string;
  email: string;
  role: string;
}

export default function ProjectUpdatesCustomer({
  customerId,
  email,
  role,
}: ProjectUpdatesCustomerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projectUpdatesState, setProjectUpdatesState] = useState<
    IProjectUpdates[] | undefined
  >([]);

  const { "sina:x-token": sessionKey } = parseCookies();

  const roleTranslations: { [key: string]: string } = {
    INTERNAL_MANAGEMENT: "Gestão Interna",
    INTERNAL_PARTNERS: "Parceiros Internos",
    INTERNAL_FINANCIAL_LEGAL: "Financeiro/Jurídico",
  };

  function getRoleName(value: string){
    console.log(value)
    return roleTranslations[value]
  }


  const handleCustomerProjectUpdates = async (
    token: string,
    customerId: string
  ) => {
    const { updates } = await fetchCustomerProjectUpdates(token, customerId);
    return updates;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await handleCustomerProjectUpdates(sessionKey, customerId);
      console.log(result);
      setProjectUpdatesState(result);
    };
    fetchData().finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      className="bg-white w-full dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] p-4 rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] h-[220px] overflow-auto [&::-webkit-scrollbar]:w-2
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
        projectUpdatesState?.map((projectUpdate, index) => (
          // <CustomerProjectUpdatesCard
          //   projectUpdate={projectUpdate}
          //   key={index}
          //   email={email}
          //   role={role}
          // />
          <ProjectUpdateCard
            email={projectUpdate.user.email}
            role={getRoleName(projectUpdate.user.role)}
            projectUpdate={projectUpdate}
            key={index}
            isLast={index === projectUpdatesState.length - 1}
          />
        ))
      )}
    </div>
  );
}
