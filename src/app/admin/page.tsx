"use client";

import React, { useEffect, useState } from "react";
import ProjectsOverview from "@/components/ProjectsOverview/ProjectsOverview";
import ProjectUpdatesAdmin from "@/components/ProjectUpdatesAdmin/ProjectUpdatesAdmin";
import Notification from "@/components/Notification/Notification";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/switch";
import { SunIcon } from "@/components/SunIcon/SunIcon";
import { MoonIcon } from "@/components/MoonIcon/MoonIcon";
import SkeletonHome from "@/components/SkeletonHome/SkeletonHome";
import UserService from "@/services/models/user";
import { handleAxiosError } from "@/services/error";
import ResponsiblePartiesService from "@/services/models/responsible-parties";
import CustomerService from "@/services/models/customer";
import { Button, Divider } from "@nextui-org/react";
import { MdChevronRight } from "react-icons/md";
import ResponsilbeParties from "@/components/ResponsilbeParties/ResponsilbeParties";
import BirthdayOfTheMonth from "@/components/BirthdayOfTheMonth/BirthdayOfTheMonth";
import ReportsTable from "@/components/ReportsTable/ReportsTable";
import BalanceBudgetExpenses from "@/components/BalanceBudgetExpenses/BalanceBugdetExpenses";

export default function AdminHome() {
  const [userState, setUserState] = useState<IGetUserResponse | null>(null);
  const [userIsLoading, setUserIsLoading] = useState<boolean>(true);
  const [countCustomersAndUsers, setCountCustomersAndUusers] = useState<
    { totalUsers: number; totalCustomers: number } | undefined
  >();
  const [loadingCountCustomersAndUsers, setLoadingCountCustomersAndUsers] =
    useState(false);

  const fetchUser = async () => {
    try {
      setUserIsLoading(true);
      const { fetchLoggedUser } = await UserService();
      const response = await fetchLoggedUser();
      setUserState(response);
    } catch (error) {
      const customError = handleAxiosError(error);
      return { isError: true, error: customError.message };
    } finally {
      setUserIsLoading(false);
    }
  };

  const fetchCountCustomersAndUsers = async () => {
    try {
      setLoadingCountCustomersAndUsers(true);
      const { countCustomersAndUsers } = await CustomerService();
      const response = await countCustomersAndUsers();
      setCountCustomersAndUusers(response);
    } catch (error) {
      const customError = handleAxiosError(error);
      return { isError: true, error: customError.message };
    } finally {
      setLoadingCountCustomersAndUsers(false);
    }
  };

  const roleTranslations: { [key: string]: string } = {
    INTERNAL_MANAGEMENT: "Gestão Interna",
    INTERNAL_PARTNERS: "Parceiros Internos",
    INTERNAL_FINANCIAL_LEGAL: "Financeiro/Jurídico",
  };

  useEffect(() => {
    fetchUser();
    fetchCountCustomersAndUsers();
  }, []);

  const { theme, setTheme } = useTheme();

  return (
    <main className="flex items-center text-black w-full pb-10">
      <div className="flex flex-col w-full min-h-screen gap-5 px-8">
        <div className="flex justify-between mt-4">
          <h1 className="text-[#21272A] dark:text-white text-[42px] font-bold">
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
        {userIsLoading ? (
          <SkeletonHome />
        ) : (
          <>
            <div className="flex flex-col bg-white dark:bg-[#1E1E1E] p-4 border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)]">
              <h2 className="text-black dark:text-white text-[28px] font-bold">
                {userState?.user.firstName} {userState?.user.lastName}
              </h2>
              <h2 className="text-[#69707785] dark:text-white text-[16px] font-normal">
                {roleTranslations[userState?.user.role || ""]}
              </h2>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col w-[345px] gap-6 h-full">
                <div className="h-[275px]">
                  <ProjectsOverview />
                </div>
                {/* Qtd Usuário */}
                <div className=" flex text-black dark:text-white flex-col p-4 w-full  bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E]  rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)]">
                  <h3 className="text-[18px] font-bold">Clientes e Usuários</h3>
                  <div className="flex w-full mt-4 ">
                    <div className="flex w-full items-center">
                      <div className="w-[60%] flex">
                        <p className="w-[50px] h-[50px] text-[18px] rounded-full bg-[#F57B00] flex items-center justify-center">
                          {countCustomersAndUsers?.totalCustomers}
                        </p>
                      </div>

                      <div className="flex flex-wrap w-full">
                        <h4 className="text-[16px]">Total de Clientes</h4>
                      </div>
                    </div>
                    <div>
                      <Divider />
                    </div>
                    <div className="flex w-full items-center">
                      <div className="w-[60%] flex">
                        <p className="w-[50px] h-[50px] text-[18px] rounded-full bg-[#F57B00] flex items-center justify-center">
                          {countCustomersAndUsers?.totalUsers}
                        </p>
                      </div>

                      <div  className="flex flex-wrap w-full">
                        <h4 className="text-[16px]">Total de Usuários</h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Partes Responsáveis */}
                <ResponsilbeParties />
                {/* Aniversariantes do mes */}
                <BirthdayOfTheMonth />
              </div>
              <div className="flex flex-col w-full gap-6">
                <div className="rounded-xl">
                  <ProjectUpdatesAdmin
                    email={userState?.user.email || ""}
                    role={userState?.user.role || ""}
                  />
                </div>
                <ReportsTable />
                <BalanceBudgetExpenses />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
