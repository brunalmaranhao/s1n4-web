"use client";
import { Spinner } from "@nextui-org/react";
import { parseCookies } from "nookies";
import { fetchCustomerUser, userFetchCustomerById } from "./actions";
import { useEffect, useState } from "react";
import { decodeToken } from "@/services/jwt-decode/decode";
import CustomerProjectsOverview from "@/components/CustomerProjectsOverview/CustomerProjectsOverview";
import ProjectUpdatesCustomer from "@/components/ProjectUpdatesCustomer/ProjectUpdatesCustomer";
import CustomerReportsTable from "@/components/CustomerReportsTable/CustomerReportsTable";

export default function UserHome() {
  const { "sina:x-token": sessionKey } = parseCookies();

  const decoded = decodeToken(sessionKey);
  const customerUserId = decoded?.sub;

  const [customerUserState, setCustomerUserState] = useState<
    ICustomerUser | undefined
  >(undefined);
  const [customerState, setCustomerState] = useState<ICustomer | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCustomerUser = async (token: string, id: string) => {
    const { customerUser } = await fetchCustomerUser(token, id);
    return customerUser;
  };

  const handleCustomerById = async (customerId: string, token: string) => {
    const { customer } = await userFetchCustomerById(customerId, token);
    return customer;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (customerUserId !== undefined) {
        const customerUser = await handleCustomerUser(
          sessionKey,
          customerUserId,
        );
        setCustomerUserState(customerUser);

        if (customerUser?.customerId !== undefined) {
          const customer = await handleCustomerById(
            customerUser.customerId,
            sessionKey,
          );

          setCustomerState(customer);
        }
      }
    };
    setIsLoading(true);
    fetchData().finally(() => setIsLoading(false));
  }, []);

  const roleTranslations: { [key: string]: string } = {
    CLIENT_RESPONSIBLE: "Responsável",
    CLIENT_OWNER: "Cliente",
    CLIENT_USER: "Usuário",
  };

  return (
    <main className="flex min-h-screen flex-col justify-start w-full">
      <div className="">
        <h1 className="text-[42px] font-bold text-[#21272A] mx-6 my-4">Olá!</h1>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="mx-6 flex flex-col gap-6">
            <div className="flex flex-col p-4 bg-white ">
              <h1 className="text-[24px] font-bold text-[#21272A]">
                {customerUserState?.firstName} {customerUserState?.lastName}
              </h1>
              <h1 className="text-[16px] font-normal text-[#697077]">
                {roleTranslations[customerUserState?.role || ""]}
              </h1>
            </div>
            <div className="flex gap-6">
              <CustomerProjectsOverview
                projects={customerState?.projects || []}
              />

              <ProjectUpdatesCustomer
                email={customerUserState?.email || ""}
                role={customerUserState?.role || ""}
                customerId={customerUserState?.customerId || ""}
              />
            </div>

            <CustomerReportsTable
              customerId={customerUserState?.customerId || ""}
            />
          </div>
        )}
      </div>
    </main>
  );
}
