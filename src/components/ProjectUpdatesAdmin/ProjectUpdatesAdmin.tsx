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
    <div className="bg-white border-solid border-[1px] border-[#DDE1E6] p-4">
      <h1
        className={`${robotoBold.className} text-[18px] font-bold text-[#21272A] mb-4`}
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
            projectId={projectUpdate.project}
            key={index}
            acessToken={sessionKey}
            date={projectUpdate.date.toString()}
            description={projectUpdate.description}
          />
        ))
      )}
    </div>
  );
}
