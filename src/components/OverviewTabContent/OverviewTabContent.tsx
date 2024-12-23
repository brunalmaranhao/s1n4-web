import {
  fetchActiveUsers,
  findAllCustomers,
  fetchCustomersWithUsers,
} from "@/app/admin/dashboard/actions";
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

  // console.log(selectedClient);

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

  useEffect(() => {
    const fetchData = async () => {
      const customersLength = await handleFindAllCustomersLength(sessionKey);
      setActiveCustomersLength(customersLength || 0);
      const users = await handleFetchActiveUsers(sessionKey);
      setActiveUsersLength(users?.length || 0);
      const customers = await handleFetchCustomersWithUsers(sessionKey);
      const sortedCustomers =
        customers?.sort(
          (a, b) => (b.users?.length || 0) - (a.users?.length || 0),
        ) || [];
      setCustomersState(sortedCustomers || []);
    };
    setIsLoading(true);
    fetchData().then(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex space-x-4">
          <div className="p-4 flex flex-col bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] w-full">
            <h1 className="text-base font-thin text-[#697077] dark:text-white">
              Total de usuários
            </h1>
            <h1 className="text-2xl font-bold text-[#21272A] dark:text-white">
              {selectedClient === undefined
                ? activeUsersLength
                : (selectedClient?.users?.length ?? 0)}
            </h1>
          </div>

          {selectedClient === undefined && (
            <div className="p-4 flex flex-col bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] w-full">
              <h1 className="text-base font-thin text-[#697077] dark:text-white">
                Total de clientes
              </h1>
              <h1 className="text-2xl font-bold text-[#21272A] dark:text-white">
                {activeCustomerLength}
              </h1>
            </div>
          )}
        </div>
      )}

      {selectedClient === undefined && (
        <div className="bg-white dark:bg-[#1E1E1E] p-4 border-solid border-[1px] dark:border-[#1E1E1E] border-[#F2F4F8] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)]">
          <div className="flex justify-between font-bold text-lg mb-2">
            <span className="text-black dark:text-white">Clientes</span>
            <span className="text-black dark:text-white">Usuários</span>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            customersState.map((customer, index) => (
              <div
                key={index}
                className="flex space-x-4 justify-between border-b border-[#878D9633] last:border-none py-3"
              >
                <h1 className="text-black dark:text-white">
                  {customer.corporateName}
                </h1>
                <h1 className="text-black dark:text-white">
                  {customer.users?.length ?? 0}
                </h1>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
