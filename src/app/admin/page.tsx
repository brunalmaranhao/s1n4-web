"use client";

import { useAuthContext } from "@/context/AuthContext";
import { Button, CircularProgress, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { fetchBirthdaysOfTheMonth, getUserById } from "./actions";
import { parseCookies } from "nookies";
import { decodeToken } from "@/services/jwt-decode/decode";
import ProjectsOverview from "@/components/ProjectsOverview/ProjectsOverview";

import ProjectUpdatesAdmin from "@/components/ProjectUpdatesAdmin/ProjectUpdatesAdmin";

export default function AdminHome() {
  const [responsiblesState, setResponsiblesState] = useState<
    IResponsibles[] | []
  >([]);
  const [userState, setUserState] = useState<IGetUserState | null>(null);
  const [userIsLoading, setUserIsLoading] = useState<boolean>(false);

  const [responsiblesBrithdayIsLoading, setResponsiblesBirthdayIsLoading] =
    useState<boolean>(false);

  const { "sina:x-token": sessionKey } = parseCookies();

  const decoded = decodeToken(sessionKey);
  const userId = decoded?.sub;

  const handleUser = async (id: string, token: string) => {
    const result = await getUserById(id, token);
    return result.user;
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
    if (userId !== undefined) {
      setUserIsLoading(true);
      handleUser(userId, sessionKey).then((data) => {
        if (data?.user) {
          setUserState(data?.user);
        }
        setUserIsLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    setResponsiblesBirthdayIsLoading(true);
    handleResponsibleBirthdaysOfTheMonth(sessionKey).then((data) => {
      setResponsiblesState(data?.responsiblesBirthdayOfTheMonth || []);
    });
    setResponsiblesBirthdayIsLoading(false);
  }, []);

  return (
    <main className="flex min-h-screen items-center bg-[#F2F4F8] text-black">
      <div className="flex flex-col w-full min-h-screen gap-5 px-8">
        <h1 className="text-[#21272A] text-[42px] font-bold">Olá!</h1>
        {userIsLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col bg-white p-4 border-solid border-[1px] border-[#DDE1E6]">
            <h2 className="text-black text-[28px] font-bold">
              {userState?.firstName} {userState?.lastName}
            </h2>
            <h2 className="text-[#697077] text-[16px] font-normal">
              {roleTranslations[userState?.role || ""]}
            </h2>
          </div>
        )}

        <div className="flex justify-center items-center gap-4">
          <ProjectsOverview />
          <div className="flex flex-col w-full h-56 bg-white border-solid border-[1px] border-[#DDE1E6] p-4 overflow-scroll space-y-4">
            <p className="text-[#21272A] text-[18px] font-bold">
              Próximos aniversariantes:
            </p>
            {responsiblesBrithdayIsLoading ? (
              <Spinner />
            ) : (
              responsiblesState.map((responsible, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <h1 className="text-[16px] font-normal">
                    {responsible.firstName} {responsible.lastName}
                  </h1>
                  <h1>{responsible.birthdate.toLocaleString("pt-BR")}</h1>
                </div>
              ))
            )}
          </div>
        </div>

        <ProjectUpdatesAdmin
          email={userState?.email || ""}
          role={userState?.role || ""}
        />
      </div>
    </main>
  );
}
