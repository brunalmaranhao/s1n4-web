import { fetchCustomerReports } from "@/app/customer/actions";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Image,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PeriodicReportService from "@/services/models/periodic-report";
import { handleAxiosError } from "@/services/error";
import BudgetExpenseService from "@/services/models/budget-expenses";
import { formatter } from "@/util/formatter";
import { MdChevronRight } from "react-icons/md";
import { format } from "date-fns";

export default function BalanceBudgetExpenses() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<{
    dataBalanceAllCustomers: ICustomerBudgetBalance[];
    dataLastBudgetExpenses: LastBudgetExpenses[];
  }>();

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      const { fetchBalanceAllCustomers } = await BudgetExpenseService();
      const response = await fetchBalanceAllCustomers();
      setBalance(response);
    } catch (error) {
      const customError = handleAxiosError(error);
      return { isError: true, error: customError.message };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className="bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] p-4 rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] h-[233px] overflow-auto [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <div className="flex text-[#21272A] dark:text-white">
            <div className="w-[45%]">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-[18px] font-bold text-[#21272A] dark:text-white">
                  Financeiro
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
                    className="max-h-[300px] p-4 overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                  >
                    {(titleProps) => (
                      <div className="flex flex-col gap-2">
                        {balance?.dataBalanceAllCustomers.length === 0 && (
                          <p className="text-[#21272A] dark:text-white">
                            Não existem informações disponíveis.
                          </p>
                        )}
                        {balance?.dataBalanceAllCustomers.map(
                          (dataAllCustomers, index) => (
                            <div key={index} className="flex flex-col gap-1">
                              {index !== 0 && <Divider />}
                              <p className="text-[16p] font-semibold text-[#21272A] dark:text-white">
                                {dataAllCustomers.customer}
                              </p>
                              <div className="flex gap-3 w-full">
                                <div className=" w-[32%]">
                                  <p className="text-[16px] font-normal text-[#21272A] dark:text-white">
                                    {formatter.format(dataAllCustomers.budget)}
                                  </p>
                                  <p className="text-[#697077] text-[14px] font-normal">
                                    Budget
                                  </p>
                                </div>
                                <div className="w-[2%]">
                                  <Divider
                                    orientation="vertical"
                                    className=""
                                  />
                                </div>
                                <div className=" w-[32%]">
                                  <p className="text-[16px] font-normal text-[#21272A] dark:text-white">
                                    {formatter.format(dataAllCustomers.balance)}
                                  </p>
                                  <p className="text-[#697077] text-[14px] font-normal">
                                    Saldo disponível
                                  </p>
                                </div>
                                <div className="w-[2%]">
                                  <Divider
                                    orientation="vertical"
                                    className=""
                                  />
                                </div>
                                <div className=" w-[32%]">
                                  <p className="text-[16px] font-normal text-[#21272A] dark:text-white">
                                    {formatter.format(
                                      dataAllCustomers.amountBudgetExpense,
                                    )}
                                  </p>
                                  <p className="text-[#697077] text-[14px] font-normal">
                                    Saldo gasto
                                  </p>
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col gap-2">
                {balance?.dataBalanceAllCustomers.length === 0 && (
                  <p className="text-[#21272A] dark:text-white">
                    Não existem informações disponíveis.
                  </p>
                )}
                {balance?.dataBalanceAllCustomers
                  .slice(0, 2)
                  .map((dataAllCustomers, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <p className="text-[16p] font-semibold text-[#21272A] dark:text-white">
                        {dataAllCustomers.customer}
                      </p>
                      <div className="flex gap-3 w-full">
                        <div className=" w-[32%]">
                          <p className="text-[16px] font-normal text-[#21272A] dark:text-white">
                            {formatter.format(dataAllCustomers.budget)}
                          </p>
                          <p className="text-[#697077] text-[14px] font-normal">
                            Budget
                          </p>
                        </div>
                        <div className="w-[2%]">
                          <Divider orientation="vertical" className="" />
                        </div>
                        <div className=" w-[32%]">
                          <p className="text-[16px] font-normal text-[#21272A] dark:text-white">
                            {formatter.format(dataAllCustomers.balance)}
                          </p>
                          <p className="text-[#697077] text-[14px] font-normal">
                            Saldo disponível
                          </p>
                        </div>
                        <div className="w-[2%]">
                          <Divider orientation="vertical" className="" />
                        </div>
                        <div className=" w-[32%]">
                          <p className="text-[16px] font-normal text-[#21272A] dark:text-white">
                            {formatter.format(
                              dataAllCustomers.amountBudgetExpense,
                            )}
                          </p>
                          <p className="text-[#697077] text-[14px] font-normal">
                            Saldo gasto
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-[10%] flex items-center justify-center">
              <Divider orientation="vertical" />
            </div>
            <div className="w-[45%]">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-[18px] font-bold text-[#21272A] dark:text-white">
                  Últimos lançamentos
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
                    className="max-h-[300px] p-4 overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                  >
                    {(titleProps) => (
                      <div>
                        {!isLoading &&
                          balance?.dataLastBudgetExpenses.length === 0 && (
                            <p className="flex items-center text-[#697077] text-[14px] font-normal">
                              Não existem lançamentos cadastrados.
                            </p>
                          )}
                        {balance?.dataLastBudgetExpenses.map(
                          (dataLastExpenses, index) => (
                            <div
                              key={index}
                              className="flex flex-col gap-1 mb-2"
                            >
                              {index !== 0 && (
                                <div>
                                  <Divider />
                                </div>
                              )}
                              <div className="flex items-center justify-between text-[16p] font-semibold text-[#21272A] dark:text-white">
                                <p className="max-w-[360px] truncate">
                                  {dataLastExpenses.title}
                                </p>
                                <p>
                                  {" "}
                                  {formatter.format(dataLastExpenses.value)}
                                </p>
                              </div>
                              <div className="flex items-center justify-between text-[#697077] text-[14px] font-normal">
                                <p className="max-w-[350px] truncate">
                                  {dataLastExpenses.customer +
                                    " > " +
                                    dataLastExpenses.project}{" "}
                                </p>
                                <p>
                                  {format(
                                    new Date(dataLastExpenses.date),
                                    "dd/MM/yyyy",
                                  )}
                                </p>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                {!isLoading && balance?.dataLastBudgetExpenses.length === 0 && (
                  <p className="flex items-center text-[#697077] text-[14px] font-normal">
                    Não existem lançamentos cadastrados.
                  </p>
                )}
                {balance?.dataLastBudgetExpenses
                  .slice(0, 3)
                  .map((dataLastExpenses, index) => (
                    <div key={index} className="flex flex-col gap-1 mb-2">
                      {index !== 0 && (
                        <div>
                          <Divider />
                        </div>
                      )}
                      <div className="flex items-center justify-between text-[16p] font-semibold text-[#21272A] dark:text-white">
                        <p className="max-w-[260px] truncate">
                          {dataLastExpenses.title}
                        </p>
                        <p> {formatter.format(dataLastExpenses.value)}</p>
                      </div>
                      <div className="flex items-center justify-between text-[#697077] text-[14px] font-normal">
                        <p>
                          {dataLastExpenses.customer +
                            " > " +
                            dataLastExpenses.project}{" "}
                        </p>
                        <p>
                          {format(
                            new Date(dataLastExpenses.date),
                            "dd/MM/yyyy",
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
