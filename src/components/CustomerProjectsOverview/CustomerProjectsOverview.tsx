import { CircularProgress, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface CustomerProjectsOverviewProps {
  projects: IProject[];
}

export default function CustomerProjectsOverview({
  projects,
}: CustomerProjectsOverviewProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projectsPercentage, setProjectsPercentage] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const doneProjects = projects?.filter(
      (project) => project.statusProject === "DONE",
    );
    handleProjectsPercentage(projects.length, doneProjects.length);
    setIsLoading(false);
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
        <div className="w-full flex flex-col items-center space-x-4 p-4 bg-white border-solid border-[1px] border-[#DDE1E6] pr-8">
          <h1 className="text-[18px] font-bold mb-4">Projetos</h1>
          <div className="flex justify-start items-center space-x-6">
            <CircularProgress
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
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-4 text-nowrap">
                <div className="w-5 h-5 bg-[#697077] rounded-full" />
                <h1>Concluídos</h1>
              </div>
              <div className="flex space-x-4 text-nowrap">
                <div className="w-5 h-5 bg-[#DDE1E6] rounded-full" />
                <h1>Em andamento </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
