"use client";

import CustomerBudgetChart from "@/components/CustomerBudgetChart/CustomerBudgetChart";
import ProjectsOverviewUserCostumer from "@/components/OverviewUserCosutmer/OverviewUserCostumer";
import { useUserCustomerContext } from "@/context/UserCostumerContext";
import { handleAxiosError } from "@/services/error";
import CustomerService from "@/services/models/customer";
import UserService from "@/services/models/user";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Overview() {
  const { customerUserId } = useUserCustomerContext();

  const { "sina:x-token": sessionKey } = parseCookies();

  const [amoutOfUsers, setAmoutOfUsers] = useState<number>(0);
  const [customerId, setCustomerId] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");

  const handleUser = async () => {
    try {
      const { fetchCustomerUser } = await UserService();
      const response = await fetchCustomerUser(
        customerUserId || "",
        sessionKey,
      );
      handleClient(response.user?.customerId || "");
      setCustomerId(response.user?.customerId || "");
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    }
  };

  const handleClient = async (customerId: string) => {
    try {
      const { getCustomerById } = await CustomerService();
      const { customer } = await getCustomerById(customerId, sessionKey);
      setAmoutOfUsers(customer.users?.length || 0);
      setCustomerName(customer.name || "");
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    }
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex flex-col w-full gap-4">
          <div className="p-4 flex flex-col bg-white dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] w-full">
            <h1 className="text-base font-thin text-[#697077] dark:text-white">
              Total de usuários
            </h1>
            <h1 className="text-2xl font-bold text-[#21272A] dark:text-white">
              {amoutOfUsers}
            </h1>
          </div>
          <ProjectsOverviewUserCostumer />
        </div>

        <div className="w-full">
          {customerId && customerName && (
            <CustomerBudgetChart
              customerName={customerName}
              customerId={customerId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
