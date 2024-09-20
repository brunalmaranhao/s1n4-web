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
          <div className="p-4 flex flex-col bg-white border-solid border-[1px] border-[#DDE1E6]">
            <h1 className="text-base font-thin text-[#697077]">
              Total de usuários
            </h1>
            <h1 className="text-2xl font-bold text-[#21272A]">
              {selectedClient === undefined
                ? activeUsersLength
                : (selectedClient?.users?.length ?? 0)}
            </h1>
          </div>

          {selectedClient === undefined && (
            <div className="p-4 flex flex-col bg-white border-solid border-[1px] border-[#DDE1E6]">
              <h1 className="text-base font-thin text-[#697077]">
                Total de clientes
              </h1>
              <h1 className="text-2xl font-bold text-[#21272A]">
                {activeCustomerLength}
              </h1>
            </div>
          )}
        </div>
      )}

      {selectedClient === undefined && (
        <div className="bg-white p-4 border-solid border-[1px] border-[#DDE1E6]">
          <div className="flex justify-between font-bold text-lg mb-2">
            <span>Clientes</span>
            <span>Usuários</span>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            customersState.map((customer, index) => (
              <div
                key={index}
                className="flex space-x-4 justify-between py-2 border-b last:border-none"
              >
                <h1>{customer.corporateName}</h1>
                <h1>{customer.users?.length ?? 0}</h1>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
