import { fetchAllProjectUpdates } from "@/app/admin/actions";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import ProjectUpdateCard from "../ProjectUpdateCard/ProjectUpdateCard";
import { Spinner } from "@nextui-org/react";

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
    <div>
      <h1>Feed de atualizações (caixa de entrada)</h1>
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
