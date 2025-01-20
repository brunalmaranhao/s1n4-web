import { fetchAllProjectUpdates } from "@/app/admin/actions";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import ProjectUpdateCard from "../ProjectUpdateCard/ProjectUpdateCard";
import { Spinner } from "@nextui-org/react";
import { Roboto } from "next/font/google";

const robotoBold = Roboto({
  weight: "700",
  subsets: ["latin"],
});

interface UserInfoprops {
  email: string;
  role: string;
}

export default function ProjectUpdatesAdmin({ email, role }: UserInfoprops) {
  const [projectUpdatesState, setProjectUpdatesState] = useState<
    IProjectUpdatesState[] | []
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { "sina:x-token": sessionKey } = parseCookies();

  const handleProjectUpdates = async (token: string) => {
    const result = await fetchAllProjectUpdates(token);
    return result.updates;
  };

  useEffect(() => {
    setIsLoading(true);
    handleProjectUpdates(sessionKey)
      .then((data) => {
        setProjectUpdatesState(data || []);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      className="bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] p-4 rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] h-[275px] overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <h1
        className={`${robotoBold.className} text-[18px] font-bold text-[#21272A] dark:text-white mb-4`}
      >
        Feed de atualizações (caixa de entrada)
      </h1>
      {isLoading ? (
        <Spinner />
      ) : (
        projectUpdatesState.map((projectUpdate, index) => (
          <ProjectUpdateCard
            email={email}
            role={role}
            projectUpdate={projectUpdate}
            key={index}
            isLast={index === projectUpdatesState.length - 1}
          />
        ))
      )}
    </div>
  );
}
