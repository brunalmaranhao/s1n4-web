import { fetchAllProjects } from "@/app/admin/actions";
import { CircularProgress, Spinner } from "@nextui-org/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function ProjectsOverview() {
  const { "sina:x-token": sessionKey } = parseCookies();

  const [allProjectsState, setAllProjectsState] = useState<
    IFetchAllProjectsState[] | []
  >([]);
  const [projectsPercentage, setProjectsPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchAllProjects = async (token: string) => {
    const result = await fetchAllProjects(token);
    return result.projects;
  };

  useEffect(() => {
    setIsLoading(true);
    handleFetchAllProjects(sessionKey)
      .then((data) => {
        setAllProjectsState(data || []);
        const allProjectsLength = data?.length || 0;
        const doneProjects =
          data?.filter((project) => project.status === "DONE") || [];
        handleProjectsPercentage(allProjectsLength, doneProjects.length);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleProjectsPercentage = (
    allProjectsLength: number,
    doneProjects: number,
  ) => {
    if (allProjectsLength === 0) {
      setProjectsPercentage(0);
    } else {
      const percentage = (doneProjects / allProjectsLength) * 100;
      setProjectsPercentage(percentage);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-center justify-center space-x-4">
          <CircularProgress
            label=""
            aria-label=""
            size="lg"
            value={projectsPercentage}
            color="success"
            showValueLabel={true}
            strokeWidth={4}
            classNames={{
              svg: "w-36 h-36 drop-shadow-md",
              indicator: "stroke-[#697077]",
              track: "stroke-[#DDE1E6]",
              value: "text-3xl font-semibold text-[#697077]",
            }}
          />
          <div className="flex flex-col">
            <div className="flex space-x-2">
              <div className="w-5 h-5 bg-[#697077] rounded-full" />
              <h1>Concluídos</h1>
            </div>
            <div className="flex space-x-2">
              <div className="w-5 h-5 bg-[#DDE1E6] rounded-full" />
              <h1>Em andamento </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
