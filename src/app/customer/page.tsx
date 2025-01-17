"use client";
import { Spinner, Switch } from "@nextui-org/react";
import { parseCookies } from "nookies";
import { fetchCustomerUser, userFetchCustomerById } from "./actions";
import { useEffect, useState } from "react";
import { decodeToken } from "@/services/jwt-decode/decode";
import CustomerProjectsOverview from "@/components/CustomerProjectsOverview/CustomerProjectsOverview";
import ProjectUpdatesCustomer from "@/components/ProjectUpdatesCustomer/ProjectUpdatesCustomer";
import CustomerReportsTable from "@/components/CustomerReportsTable/CustomerReportsTable";
import Notification from "@/components/Notification/Notification";
import { SunIcon } from "@/components/SunIcon/SunIcon";
import { MoonIcon } from "@/components/MoonIcon/MoonIcon";
import { useTheme } from "next-themes";
import SkeletonHome from "@/components/SkeletonHome/SkeletonHome";

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

  const { theme, setTheme } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleCustomerUser = async (id: string, token?: string) => {
    const { customerUser } = await fetchCustomerUser(id, token);

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
          customerUserId,
          sessionKey,
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
    <main className="flex min-h-screen flex-col justify-start w-full text-black pb-10">
      <div className="">
        <div className="w-full flex justify-between px-6">
          <h1 className="text-[#21272A] dark:text-white text-[42px] font-bold my-4">
            Olá!
          </h1>
          <div className="flex items-center gap-4">
            <Switch
              defaultSelected
              size="lg"
              // color="warning"
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
              onChange={() => setTheme(theme === "light" ? "dark" : "light")}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-[#F57B00]",
              }}
            ></Switch>
            <Notification />
          </div>
        </div>
        {isLoading ? (
          <SkeletonHome />
        ) : (
          <div className="mx-6 flex flex-col gap-6">
            <div className="flex flex-col p-4 bg-white dark:bg-[#1E1E1E] border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)]">
              <h1 className="text-[24px] font-bold text-black dark:text-white">
                {customerUserState?.firstName} {customerUserState?.lastName}
              </h1>
              <h1 className="text-[16px] font-normal text-[#69707785] dark:text-white">
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
