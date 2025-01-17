import { Spinner } from "@nextui-org/react";
import { Roboto } from "next/font/google";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import CustomerProjectUpdatesCard from "../CustomerProjectUpdatesCard/CustomerProjectUpdatesCard";
import { fetchCustomerProjectUpdates } from "@/app/customer/actions";

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

  const handleCustomerProjectUpdates = async (
    token: string,
    customerId: string,
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
    <div className="bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] p-4 w-full rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)]">
      <h1
        className={`${robotoBold.className} text-[18px] font-bold text-[#21272A] dark:text-white mb-4`}
      >
        Feed de atualizações (caixa de entrada)
      </h1>
      {isLoading ? (
        <Spinner />
      ) : (
        projectUpdatesState?.map((projectUpdate, index) => (
          <CustomerProjectUpdatesCard
            projectUpdate={projectUpdate}
            key={index}
            email={email}
            role={role}
          />
        ))
      )}
    </div>
  );
}
