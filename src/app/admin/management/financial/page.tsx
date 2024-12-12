"use client";

import ModalAddBudgetExpense from "@/components/ModalAddBudgetExpense/ModalAddBudgetExpense";
import TableBudgetExpenses from "@/components/TableBudgetExpenses/TableBudgetExpenses";
import { decodeToken } from "@/services/jwt-decode/decode";
import { parseCookies } from "nookies";
import { fetchActiveCustomers } from "./actions";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

export default function Financial() {
  const { "sina:x-token": sessionKey } = parseCookies();

  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const handleFetchActiveCustomers = async (token: string) => {
    const response = await fetchActiveCustomers(token);
    return response.customers;
  };

  useEffect(() => {
    setisLoading(true);
    const callHandleActiveCustomers = async (token: string) => {
      const result = await handleFetchActiveCustomers(token);

      setCustomers(result || []);
    };
    callHandleActiveCustomers(sessionKey).finally(() => setisLoading(false));
  }, []);

  return (
    <main className="min-h-screen w-full">
      <div className="xl:min-w-[1200px] lg:min-w-[900px]">
        {isLoading ? (
          <Spinner />
        ) : (
          <TableBudgetExpenses customers={customers} />
        )}
      </div>
      <ModalAddBudgetExpense />
    </main>
  );
}
