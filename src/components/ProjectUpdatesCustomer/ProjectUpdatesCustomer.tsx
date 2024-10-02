import { fetchCustomerProjectUpdates } from "@/app/user/actions";
import { Spinner } from "@nextui-org/react";
import { Roboto } from "next/font/google";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import CustomerProjectUpdatesCard from "../CustomerProjectUpdatesCard/CustomerProjectUpdatesCard";

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

      setProjectUpdatesState(result);
    };
    fetchData().finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="bg-white border-solid border-[1px] border-[#DDE1E6] p-4 w-full">
      <h1
        className={`${robotoBold.className} text-[18px] font-bold text-[#21272A] mb-4`}
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
