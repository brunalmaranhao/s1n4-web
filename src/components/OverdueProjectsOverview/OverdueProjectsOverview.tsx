import { usePathname } from "next/navigation";
import ProjectsService from "@/services/models/projects";
import {
  Badge,
  Button,
  Chip,
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
import { format } from "date-fns";

interface OverdueProjectsOverviewProps {
  selectedClient?: ICustomer | undefined;
}

export default function OverdueProjectsOverview({
  selectedClient,
}: OverdueProjectsOverviewProps) {
  const { push } = useRouter();
  const [allOverdueProjects, setAllOverdueProjects] = useState<IProject[]>([]);
  const [projectsPercentage, setProjectsPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isClientFilterActive } = useCustomerContext();

  const pathname = usePathname();

  useEffect(() => {
    fetchOverdueProjects();
  }, [selectedClient, isClientFilterActive]);

  const fetchOverdueProjects = async () => {
    setIsLoading(true);
    try {
      const customerId = isClientFilterActive ? selectedClient?.id : undefined;
      const { fetchOverdueProjects } = await ProjectsService();
      const response = await fetchOverdueProjects(customerId);
      setAllOverdueProjects(response.projects);
      console.log(response.totalProjects);
      calculateProjectsPercentage(
        response.totalProjects,
        response.projects.length,
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
    <div
      className={`flex h-[275px] ${
        pathname === "/admin/dashboard" ? "w-[90%]" : "w-full"
      }`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className=" p-4 w-full flex justify-between flex-col overflow-auto bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E]  rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <div className="flex flex-col w-[100%]">
            <div className="flex justify-between items-center">
              <h1 className="text-[18px] text-black dark:text-white font-bold">
                Atrasados
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
                  className="max-h-[300px] w-[280px] p-4  overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                >
                  {(titleProps) => (
                    <div className="flex flex-col gap-1 p-3 w-full">
                      {allOverdueProjects.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center"
                        >
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
                          {item.deadline && (
                            <Chip color="danger" className="mr-2" size="sm">
                              {format(new Date(item.deadline), "dd/MM/yyy")}
                            </Chip>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
            {allOverdueProjects.length > 0 ? (
              <div
                className="mr-3 flex flex-col gap-2 mt-3 h-auto overflow-y-auto  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 "
              >
                {allOverdueProjects.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
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
                    {item.deadline && (
                      <Chip color="danger" className="mr-2" size="sm">
                        {format(new Date(item.deadline), "dd/MM/yyy")}
                      </Chip>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <small className="text-black dark:text-white mt-5">
                Não existem projetos atrasados.
              </small>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Divider className="" orientation="horizontal" />
          </div>

          <div className="flex justify-evenly">
            <div className="flex justify-between items-center">
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2 items-center">
                  <div className="w-[13px] h-[13px] bg-[#F57B00] rounded-full" />
                  <h1 className="text-black dark:text-white text-[14px]">
                    Atrasados
                  </h1>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="w-[13px] h-[13px] bg-[#DDE1E6] rounded-full" />
                  <h1 className="text-black dark:text-white text-[14px]">
                    No prazo
                  </h1>
                </div>
              </div>
              {/* <h1 className="text-[18px] text-black dark:text-white font-bold">
                Resumo
              </h1> */}
            </div>
            <div className="flex flex-col">
              <CircularProgress
                aria-label=""
                size="sm"
                value={projectsPercentage}
                color="success"
                showValueLabel={true}
                strokeWidth={3}
                classNames={{
                  svg: "w-24 h-24 drop-shadow-md",
                  indicator: "stroke-[#F57B00]",
                  track: "stroke-[#DDE1E6] dark:stroke-white",
                  value: "text-xl font-semibold text-[#697077] dark:text-white",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
