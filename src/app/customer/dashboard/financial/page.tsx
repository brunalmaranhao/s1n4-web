"use client";

import { getUserById } from "@/app/admin/actions";

import { decodeToken } from "@/services/jwt-decode/decode";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { fetchCustomerBudgetExpenses } from "./actions";
import { Spinner } from "@nextui-org/react";
import CustomerExpensesTable from "@/components/CustomerExpensesTable/CustomerExpensesTable";
import { formatCurrency } from "@/util/formatter";

export default function CustomerFinancial() {
  const { "sina:x-token": sessionKey } = parseCookies();

  const decoded = decodeToken(sessionKey);
  const userId = decoded?.sub;

  const [customerBudget, setCustomerBudget] = useState<number>(0);
  const [customerBalance, setCustomerBalance] = useState<number>(0);
  const [customerExpenses, setCustomerExpenses] = useState<number>(0);
  const [availablePercentage, setAvailablePercentage] = useState<number>(0);
  const [customerIdState, setCustomerIdState] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCustomerBudgetExpenses = async (id: string, token: string) => {
    const result = await fetchCustomerBudgetExpenses(id, token);
    return result;
  };

  const handleUserById = async (id: string, token: string) => {
    const result = await getUserById(id, token);
    return result.user;
  };

  useEffect(() => {
    setIsLoading(true);
    handleUserById(userId || "", sessionKey).then((data) => {
      setCustomerIdState(data?.user.customerId || "");
      handleCustomerBudgetExpenses(data?.user.customerId || "", sessionKey)
        .then((result) => {
          setCustomerBudget(result.budget?.budget || 0);
          setCustomerBalance(result.budget?.balance || 0);
          setCustomerExpenses(result.budget?.amountBudgetExpense || 0);
          const totalBalance =
            (result.budget?.balance || 0) +
            (result.budget?.amountBudgetExpense || 0);
          const availableBalance =
            totalBalance - (result.budget?.amountBudgetExpense || 0);
          const availablePercentage = (availableBalance / totalBalance) * 100;
          setAvailablePercentage(Number(availablePercentage.toFixed(2)));
        })
        .finally(() => setIsLoading(false));
    });
  }, []);

  return (
    <div className="flex flex-col">
      {!isLoading &&
      customerBudget !== 0 &&
      customerBalance !== 0 &&
      customerExpenses &&
      availablePercentage !== 0 ? (
        <div className="flex space-x-6">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] p-4 w-[266px]">
            <h1 className="text-[#697077] dark:text-white text-[16px] font-normal">
              Budget
            </h1>
            <span className="text-[#1E1E1E] dark:text-white text-[24px] font-bold">
              {formatCurrency(customerBudget)}
            </span>
          </div>
          <div className="bg-white dark:bg-[#1E1E1E] shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] rounded-lg p-4 w-[266px]">
            <h1 className="text-[#697077] dark:text-white text-[16px] font-normal">
              Saldo disponível
            </h1>
            <span className="text-[#1E1E1E] dark:text-white text-[24px] font-bold">
              {formatCurrency(customerBalance)}
            </span>
          </div>
          <div className="bg-white dark:bg-[#1E1E1E] shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] p-4 w-[266px] rounded-lg">
            <h1 className="text-[#697077] dark:text-white text-[16px] font-normal">
              Saldo gasto
            </h1>
            <span className="text-[#1E1E1E] dark:text-white text-[24px] font-bold">
              {formatCurrency(customerExpenses)}
            </span>
          </div>
          <div className="bg-white dark:bg-[#1E1E1E] shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] rounded-lg p-4 w-[266px]">
            <h1 className="text-[#697077] dark:text-white text-[16px] font-normal">
              Percentual disponível
            </h1>
            <span className="text-[#1E1E1E] dark:text-white text-[24px] font-bold">{`${availablePercentage}%`}</span>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
      <CustomerExpensesTable />
    </div>
  );
}
