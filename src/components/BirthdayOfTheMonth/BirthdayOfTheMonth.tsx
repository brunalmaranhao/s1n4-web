import { handleAxiosError } from "@/services/error";
import ResponsiblePartiesService from "@/services/models/responsible-parties";
import {
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function BirthdayOfTheMonth() {
  const [responsiblesBrithdayIsLoading, setResponsiblesBirthdayIsLoading] =
    useState<boolean>(true);
  const [responsiblesState, setResponsiblesState] = useState<
    IResponsibles[] | []
  >([]);
  useEffect(() => {
    fetchBirthdaysOfTheMonth();
  }, []);

  const fetchBirthdaysOfTheMonth = async () => {
    try {
      setResponsiblesBirthdayIsLoading(true);
      const { fetchBirthdaysOfTheMonth } = await ResponsiblePartiesService();
      const response = await fetchBirthdaysOfTheMonth();
      setResponsiblesState(response.responsiblesBirthdayOfTheMonth);
      return {
        isError: false,
        responsibles: response,
      };
    } catch (error) {
      const customError = handleAxiosError(error);
      return { isError: true, error: customError.message };
    } finally {
      setResponsiblesBirthdayIsLoading(false);
    }
  };
  return (
    <div className=" flex text-black dark:text-white flex-col p-4 w-full  bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E]  rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)]">
      <div className="flex justify-between items-center">
        <h3 className="text-[18px] font-bold">Próximos aniversários</h3>
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
            className="max-h-[300px] p-4 overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            {(titleProps) => (
              <div className="flex flex-col mt-2 px-2">
                {responsiblesState?.map((responsible, index) => (
                  <div key={responsible.id}>
                    <div className="">
                      <Divider className={`${index === 0 && "hidden"} my-2`} />

                      <p className="text-[16px]">
                        {responsible.firstName +
                          " " +
                          responsible.lastName}{" "}
                      </p>
                      <p className="text-[#697077] text-[14px]">
                        {format(responsible.birthdate, "dd/MM - EEEE", {
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      {!responsiblesBrithdayIsLoading && responsiblesState.length === 0 ? (
        <p className="text-[16px]">Não existem aniversariantes este mês.</p>
      ) : (
        <div className="flex flex-col mt-2">
          {responsiblesState?.slice(0, 2).map((responsible, index) => (
            <div key={responsible.id}>
              <div className="">
                <Divider className={`${index === 0 && "hidden"} my-2`} />

                <p className="text-[16px]">
                  {responsible.firstName + " " + responsible.lastName}{" "}
                </p>
                <p className="text-[#697077] text-[14px]">
                  {format(responsible.birthdate, "dd/MM - EEEE", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
