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

  const { handleSignOut } = useAuthContext();
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#F2F4F8] text-black">
      <div>Admin Home</div>
      <h1>Olá!</h1>
      {userIsLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col">
          <h2 className="text-black text-[28px] font-bold">
            {userState?.firstName} {userState?.lastName}
          </h2>
          <h2>{userState?.role}</h2>
        </div>
      )}

      <div className="flex justify-center items-center space-x-12">
        <ProjectsOverview />
        <div className="flex flex-col">
          <p>Próximos aniversariantes:</p>
          {responsiblesBrithdayIsLoading ? (
            <Spinner />
          ) : (
            responsiblesState.map((responsible, index) => (
              <div key={index}>
                <h1>
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
      <Button onPress={handleSignOut}>Sair</Button>
    </main>
  );
}
