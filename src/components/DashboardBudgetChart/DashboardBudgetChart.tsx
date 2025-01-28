import { useEffect, useState } from "react";
import { CustomersBudgetDonutChart } from "../CustomersBudgetDonutChart/CustomersBudgetDonutChart";
import FinancialService from "@/services/models/financial";
import { handleAxiosError } from "@/services/error";
import { formatCurrency } from "@/util/formatter";
import { Spinner } from "@nextui-org/react";
import CustomerService from "@/services/models/customer";
import BudgetExpenseService from "@/services/models/budget-expenses";
import toast from "react-hot-toast";
import { useCustomerContext } from "@/context/CustomerContext";

interface DashboardBudgetChartProps {
  customerId: string;
}

export default function DashboardBudgetChart({
  customerId,
}: DashboardBudgetChartProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availableAmountPercentage, setAvailableAmountPercentage] =
    useState<number>(0);
  const [customerExpenses, setCustomerExpenses] = useState<any[]>([]);
  const { customerBudgetBalance, setCustomerBudgetBalance } =
    useCustomerContext();

  const {
    selectedCustomerName,
    firstCustomerNameLoaded,
    setFirstCustomerNameLoaded,
  } = useCustomerContext();

  const handleCustomerExpensesBalance = async (
    id: string
  ): Promise<void | { isError: boolean; error: string }> => {
    const { fetchCustomerExpenses } = await BudgetExpenseService();
    const data = await fetchCustomerExpenses(id);
    setCustomerBudgetBalance(data);
  };

  const handleCustomerExpenses = async (
    customerId: string
  ): Promise<void | { isError: boolean; error: string }> => {
    try {
      const { fetchBudgetExpenseByCustomer } = await FinancialService();
      const { data } = await fetchBudgetExpenseByCustomer(customerId);
      setCustomerExpenses(data);
    } catch (error) {
      const customError = handleAxiosError(error);
      return { isError: true, error: customError.message };
    }
  };

  const calculateAvailablePercentage = (
    availableAmount: number,
    totalBudget: number
  ) => {
    const percentage = (availableAmount / totalBudget) * 100;
    setAvailableAmountPercentage(percentage);
  };

  const getFirstActiveCustomer = async () => {
    try {
      const { findAllActives } = await CustomerService();
      const { customers } = await findAllActives();
      if (customers.length > 0) {
        handleCustomerExpenses(customers[0].id);
        setFirstCustomerNameLoaded(customers[0].name || "");
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  useEffect(() => {
    if (customerId) {
      setIsLoading(true);
      handleCustomerExpensesBalance(customerId);
      handleCustomerExpenses(customerId).finally(() => setIsLoading(false));
    } else {
      setIsLoading(true);
      getFirstActiveCustomer().finally(() => setIsLoading(false));
    }
  }, [customerId]);

  useEffect(() => {
    if (customerBudgetBalance) {
      calculateAvailablePercentage(
        customerBudgetBalance.balance,
        customerBudgetBalance.budget
      );
    }
  }, [customerBudgetBalance]);

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex space-x-4">
            <div className="bg-white flex flex-col p-4 w-full justify-start items-center dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)]">
              <h1 className="text-[#697077] dark:text-white text-[16px] font-normal self-start">
                Budget mensal
              </h1>
              <h1 className="text-[22px] text-[#1E1E1E] dark:text-white font-bold self-start">
                {formatCurrency(customerBudgetBalance?.budget || 0)}
              </h1>
            </div>
            <div className="bg-white flex p-4 w-full justify-between items-center dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)]">
              <div className="flex flex-col">
                <h1 className="text-[#697077] dark:text-white text-[16px] font-normal self-start">
                  Saldo disponível
                </h1>
                <h1 className="text-[22px] text-[#1E1E1E] dark:text-white font-bold self-start">
                  {formatCurrency(customerBudgetBalance?.balance || 0)}
                </h1>
              </div>
              <span className="bg-[#23CF5C] text-[#1E1E1E] rounded-xl px-3 text-[14px] font-normal">{`${availableAmountPercentage.toFixed(
                2
              )}%`}</span>
            </div>
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            customerExpenses.length > 0 && (
              <div className="bg-white flex justify-start items-center dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] h-auto p-4">
                <div className="flex flex-col w-full">
                  <h1 className="text-[#1E1E1E] dark:text-white text-[18px] font-bold self-start">
                    {selectedCustomerName
                      ? selectedCustomerName
                      : firstCustomerNameLoaded}
                  </h1>
                  <CustomersBudgetDonutChart
                    donutChartData={customerExpenses}
                  />
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
