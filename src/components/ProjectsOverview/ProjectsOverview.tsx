import { usePathname } from "next/navigation";
import ProjectsService from "@/services/models/projects";
import {
  Button,
  CircularProgress,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdChevronRight } from "react-icons/md";
import { useCustomerContext } from "@/context/CustomerContext";
import { handleAxiosError } from "@/services/error";
import toast from "react-hot-toast";

interface ProjectsOverviewProps {
  selectedClient?: ICustomer | undefined;
}

export default function ProjectsOverview({
  selectedClient,
}: ProjectsOverviewProps) {
  const { push } = useRouter();
  const [allProjectsDone, setAllProjectsDone] = useState<IProject[]>([]);
  const [projectsPercentage, setProjectsPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isClientFilterActive } = useCustomerContext();

  const pathname = usePathname();

  useEffect(() => {
    if (isClientFilterActive && selectedClient) {
      fetchProjectsCustomer(selectedClient.id);
    } else {
      fetchProjects();
    }
  }, [selectedClient, isClientFilterActive]);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { fetchProjectsForStatistics } = await ProjectsService();
      const response = await fetchProjectsForStatistics();
      setAllProjectsDone(response.projectsDone);
      calculateProjectsPercentage(
        response.projectInProgress.length + response.projectsDone.length,
        response.projectsDone.length
      );
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjectsCustomer = async (customer: string) => {
    setIsLoading(true);
    try {
      const { fetchProjectsCustomerForStatistics } = await ProjectsService();
      const response = await fetchProjectsCustomerForStatistics(customer);
      setAllProjectsDone(response.projectsDone);
      console.log(response)
      calculateProjectsPercentage(
        response.projectInProgress.length + response.projectsDone.length,
        response.projectsDone.length
      );
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProjectsPercentage = (
    allProjectsLength: number,
    doneProjects: number
  ) => {
    if (allProjectsLength === 0) {
      setProjectsPercentage(0);
    } else {
      const percentage = (doneProjects / allProjectsLength) * 100;
      setProjectsPercentage(percentage);
    }
  };

  return (
    <div
      className={`flex h-[275px] ${
        pathname === "/admin/dashboard" ? "w-full" : "w-full"
      }`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="p-4 w-full flex justify-between   bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E]  rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)]">
          <div className="flex flex-col w-[180px]">
            <div className="flex justify-between items-center">
              <h1 className="text-[18px] text-black dark:text-white font-bold">
                Concluídos
              </h1>
              <Popover
                shadow="lg"
                offset={10}
                placement="bottom"
                shouldBlockScroll={false}
              >
                <PopoverTrigger>
                  <Button className="bg-transparent text-[#F57B00] p-0 h-6 text-[12px]">
                    {"Ver todos"} <MdChevronRight className="ml-[-3px]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="max-h-[300px] p-4  overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                >
                  {(titleProps) => (
                    <div className="flex flex-col gap-1 p-3">
                      {allProjectsDone.map((item) => (
                        <div
                          key={item.id}
                          className="text-black dark:text-white flex flex-col  "
                        >
                          <p className="text-[14px] truncate max-w-[150px]">
                            {item.name}
                          </p>
                          <small className="text-[10px] truncate max-w-[120px]">
                            {item.customer?.name}
                          </small>
                        </div>
                      ))}
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
            {allProjectsDone.length > 0 ? (
              <div
                className="mr-3 flex flex-col gap-2 mt-3 h-[200px] overflow-y-auto  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 "
              >
                {allProjectsDone.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="text-black dark:text-white flex flex-col  "
                  >
                    <p className="text-[14px] truncate max-w-[120px]">
                      {item.name}
                    </p>
                    <small className="text-[10px] truncate max-w-[120px]">
                      {item.customer?.name}
                    </small>
                  </div>
                ))}
              </div>
            ) : (
              <small className="text-black dark:text-white mt-5">
                Não existem projetos concluídos.
              </small>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Divider className="" orientation="vertical" />
          </div>

          <div className="flex flex-col gap-3 px-2 w-[140px]">
            <div className="flex justify-between items-center">
              <h1 className="text-[18px] text-black dark:text-white font-bold">
                Progresso
              </h1>
            </div>
            <div className="flex flex-col">
              <CircularProgress
                aria-label=""
                size="lg"
                value={projectsPercentage}
                color="success"
                showValueLabel={true}
                strokeWidth={4}
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-[#F57B00]",
                  track: "stroke-[#DDE1E6] dark:stroke-white",
                  value:
                    "text-3xl font-semibold text-[#697077] dark:text-white",
                }}
              />
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2 items-center">
                  <div className="w-[13px] h-[13px] bg-[#F57B00] rounded-full" />
                  <h1 className="text-black dark:text-white text-[14px]">
                    Concluídos
                  </h1>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="w-[13px] h-[13px] bg-[#DDE1E6] rounded-full" />
                  <h1 className="text-black dark:text-white text-[14px]">
                    Em andamento{" "}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
