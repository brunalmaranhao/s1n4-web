import {
  fetchActiveUsers,
  findAllCustomers,
  fetchCustomersWithUsers,
} from "@/app/admin/dashboard/actions";
import { useCustomerContext } from "@/context/CustomerContext";
import { Spinner } from "@nextui-org/react";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";

interface OverviewTabProps {
  selectedClient: ICustomer | undefined;
}

export default function OverviewTabContent({
  selectedClient,
}: OverviewTabProps) {
  const { "sina:x-token": sessionKey } = parseCookies();

  const [activeUsersLength, setActiveUsersLength] = useState<number>(0);
  const [activeCustomerLength, setActiveCustomersLength] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customersState, setCustomersState] = useState<ICustomer[]>([]);
  const [customerProjects, setCustomerProjects] = useState<
    { customer: string; amountProjects: number }[]
  >([]);

  const { shouldShowFirstCustomer, isClientSelected, setIsClientSelected } =
    useCustomerContext();

  const handleFetchActiveUsers = async (token: string) => {
    const { users } = await fetchActiveUsers(token);
    return users;
  };

  const handleFindAllCustomersLength = async (token: string) => {
    const { customersLength } = await findAllCustomers(token);
    return customersLength;
  };

  const handleFetchCustomersWithUsers = async (token: string) => {
    const { customersWithUsers } = await fetchCustomersWithUsers(token);
    return customersWithUsers;
  };
  console.log(customersState)

  useEffect(() => {
    const fetchData = async () => {
      const customersLength = await handleFindAllCustomersLength(sessionKey);

      setActiveCustomersLength(customersLength || 0);
      const users = await handleFetchActiveUsers(sessionKey);
      setActiveUsersLength(users?.length || 0);
      const customers = await handleFetchCustomersWithUsers(sessionKey);
      const sortedCustomers =
        customers?.sort(
          (a, b) => (b.users?.length || 0) - (a.users?.length || 0)
        ) || [];

      setCustomersState(sortedCustomers || []);
    };
    setIsLoading(true);
    fetchData().then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedClient) {
      setIsClientSelected(false);
    }
  }, [selectedClient]);

  console.log(selectedClient?.projects)

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex space-x-4 ">
          <div className="p-4 flex flex-col bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] w-full">
            <h1 className="text-base font-thin text-[#697077] dark:text-white">
              Total de usuários
            </h1>
            <h1 className="text-2xl font-bold text-[#21272A] dark:text-white">
              {shouldShowFirstCustomer
                ? selectedClient?.users?.length ?? 0
                : activeUsersLength}
            </h1>
          </div>

          {!isClientSelected && (
            <div className="p-4 flex flex-col bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] w-full">
              <h1 className="text-base font-thin text-[#697077] dark:text-white">
                Total de clientes
              </h1>
              <h1 className="text-2xl font-bold text-[#21272A] dark:text-white">
                {activeCustomerLength}
              </h1>
            </div>
          )}

          {isClientSelected && (
            <>
              <div className="p-4 flex flex-col bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] w-full">
                <h1 className="text-base font-thin text-[#697077] dark:text-white">
                  Total de projetos
                </h1>
                <h1 className="text-2xl font-bold text-[#21272A] dark:text-white">
                  {selectedClient?.projects?.length}
                </h1>
              </div>
              <div className="p-4 flex flex-col bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] w-full">
                <h1 className="text-base font-thin text-[#697077] dark:text-white">
                  Total de relatórios
                </h1>
                <h1 className="text-2xl font-bold text-[#21272A] dark:text-white">
                  {selectedClient?.projects?.reduce((total, project) => {
                    return total + project.periodicReports.length;
                  }, 0) ?? 0}
                </h1>
              </div>
            </>
          )}
        </div>
      )}

      {!isClientSelected && (
        <div className="flex w-full space-x-4">
          <div className="bg-white w-full  dark:bg-[#1E1E1E] p-4 border-solid border-[1px] dark:border-[#1E1E1E] border-[#F2F4F8] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] ">
            <div className="flex justify-between font-bold text-lg mb-2">
              <span className="text-black dark:text-white">Clientes</span>
              <span className="text-black dark:text-white">Usuários</span>
            </div>
            {isLoading ? (
              <Spinner />
            ) : (
              <div
                className="w-full h-[215px] overflow-auto pr-2 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
              >
                {customersState.map((customer, index) => (
                  <div
                    key={index}
                    className="flex space-x-4 justify-between border-b border-[#878D9633] last:border-none py-3"
                  >
                    <h1 className="text-black dark:text-white">
                      {customer.name}
                    </h1>
                    <h1 className="text-black dark:text-white">
                      {customer.users?.length ?? 0}
                    </h1>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white w-full dark:bg-[#1E1E1E] p-4 border-solid border-[1px] dark:border-[#1E1E1E] border-[#F2F4F8] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)]">
            <div className="flex justify-between font-bold text-lg mb-2">
              <span className="text-black dark:text-white">Clientes</span>
              <span className="text-black dark:text-white">Projetos</span>
            </div>
            {isLoading ? (
              <Spinner />
            ) : (
              <div
                className="w-full h-[215px] overflow-auto pr-2 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
              >
                {customersState.map((customer, index) => (
                  <div
                    key={index}
                    className="flex space-x-4 justify-between border-b border-[#878D9633] last:border-none py-3"
                  >
                    <h1 className="text-black dark:text-white">
                      {customer.name}
                    </h1>
                    <h1 className="text-black dark:text-white">
                      {customer.projects?.length ?? 0}
                    </h1>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
