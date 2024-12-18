"use client";

import React, { useEffect, useState } from "react";
import { fetchBirthdaysOfTheMonth, getUserById } from "./actions";
import { parseCookies } from "nookies";
import { decodeToken } from "@/services/jwt-decode/decode";
import ProjectsOverview from "@/components/ProjectsOverview/ProjectsOverview";
import ProjectUpdatesAdmin from "@/components/ProjectUpdatesAdmin/ProjectUpdatesAdmin";
import { format } from "date-fns";
import Notification from "@/components/Notification/Notification";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/switch";
import { SunIcon } from "@/components/SunIcon/SunIcon";
import { MoonIcon } from "@/components/MoonIcon/MoonIcon";
import SkeletonHome from "@/components/SkeletonHome/SkeletonHome";
import UserService from "@/services/models/user";
import { handleAxiosError } from "@/services/error";

export default function AdminHome() {
  const [responsiblesState, setResponsiblesState] = useState<
    IResponsibles[] | []
  >([]);
  const [userState, setUserState] = useState<IGetUserState | null>(null);
  const [userIsLoading, setUserIsLoading] = useState<boolean>(true);

  const [responsiblesBrithdayIsLoading, setResponsiblesBirthdayIsLoading] =
    useState<boolean>(true);

  const { "sina:x-token": sessionKey } = parseCookies();

  const decoded = decodeToken(sessionKey);
  const userId = decoded?.sub;

  // const handleUser = async (id: string, token: string) => {
  //   const result = await getUserById(id, token);
  //   return result.user;
  // };

  const handleUser = async (id: string) => {
    try {
      const { getUserById } = await UserService();
      const response = await getUserById(id);
      return response.user;
    } catch (error) {
      const customError = handleAxiosError(error);
      return { isError: true, error: customError.message };
    }
  };

  const handleResponsibleBirthdaysOfTheMonth = async (token: string) => {
    const result = await fetchBirthdaysOfTheMonth(token);
    return result.responsibles;
  };

  const roleTranslations: { [key: string]: string } = {
    INTERNAL_MANAGEMENT: "Gestão Interna",
    INTERNAL_PARTNERS: "Parceiros Internos",
    INTERNAL_FINANCIAL_LEGAL: "Financeiro/Jurídico",
  };

  useEffect(() => {
    // if (userId !== undefined) {
    //   setUserIsLoading(true);
    //   handleUser(userId).then((data) => {
    //     if (data?.user) {
    //       setUserState(data?.user as IGetUserState);
    //     }
    //     setUserIsLoading(false);
    //   });
    // }
    setUserIsLoading(true);
    handleUser(userId || "")
      .then((data) => {
        console.log(data);
        setUserState(data as IGetUserState);
      })
      .finally(() => {
        setUserIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setResponsiblesBirthdayIsLoading(true);
    handleResponsibleBirthdaysOfTheMonth(sessionKey).then((data) => {
      setResponsiblesState(data?.responsiblesBirthdayOfTheMonth || []);
    });
    setResponsiblesBirthdayIsLoading(false);
  }, []);

  const { theme, setTheme } = useTheme();

  return (
    <main className="flex items-center text-black w-full">
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
        {userIsLoading || responsiblesBrithdayIsLoading ? (
          <SkeletonHome />
        ) : (
          <>
            <div className="flex flex-col bg-white dark:bg-[#1E1E1E] p-4 border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)]">
              <h2 className="text-black dark:text-white text-[28px] font-bold">
                {userState?.firstName} {userState?.lastName}
              </h2>
              <h2 className="text-[#69707785] dark:text-white text-[16px] font-normal">
                {roleTranslations[userState?.role || ""]}
              </h2>
            </div>
            <div className="flex justify-center items-center gap-4">
              <ProjectsOverview />
              <div className="flex flex-col w-full h-56 bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] p-4 space-y-4 rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] overflow-y-scroll">
                <p className="text-[#21272A] dark:text-white text-[18px] font-bold">
                  Próximos aniversariantes:
                </p>
                {responsiblesState.length === 0 ? (
                  <h1 className="text-black dark:text-white">
                    Não existem aniversariantes este mês.
                  </h1>
                ) : (
                  responsiblesState.map((responsible, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                      <h1 className="text-[16px] text-black dark:text-white font-normal">
                        {responsible.firstName} {responsible.lastName}
                      </h1>
                      <h1 className="text-black dark:text-white pb-2">
                        {format(responsible.birthdate, "dd/MM")}
                      </h1>
                      {index < responsiblesState.length - 1 && (
                        <hr className="border-[#878D9633]" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
            <ProjectUpdatesAdmin
              email={userState?.email || ""}
              role={userState?.role || ""}
            />
          </>
        )}
      </div>
    </main>
  );
}
