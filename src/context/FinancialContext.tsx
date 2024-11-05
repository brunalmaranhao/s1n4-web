"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import FinancialService from "@/services/models/financial";
import { handleAxiosError } from "@/services/error";
import toast from "react-hot-toast";

type FinancialContextType = {
  isOpenModalCreateLaunch: boolean;
  onClose: () => void;
  onOpen: () => void;
  fetchBudgetExpenses: (pageNumber: number) => void;
  fetchBudgetExpensesByCustomer: (customerId: string) => void;
  fetchBudgetExpensesByProject: (projectId: string) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  page: number;
  loading: boolean;
  rowsPerPage: number;
  budgetExpenses: IBudgetExpense[];
  filteredCustomerId?: string;
  filteredProjectId?: string;
  setFilteredCustomerId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setFilteredProjectId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

const FinancialContext = createContext<FinancialContextType | undefined>(
  undefined,
);

export const FinancialProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    isOpen: isOpenModalCreateLaunch,
    onOpen,
    onOpenChange: onClose,
  } = useDisclosure();
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = useState(true);
  const [budgetExpenses, setBudgetExpenses] = useState<IBudgetExpense[]>([]);
  const [filteredCustomerId, setFilteredCustomerId] = useState<
    string | undefined
  >();
  const [filteredProjectId, setFilteredProjectId] = useState<
    string | undefined
  >();

  // useEffect(() => {
  //   if(filteredCustomerId && filteredProjectId){
  //     fetchBudgetExpensesByProject(filteredProjectId)
  //   }else if(filteredCustomerId && !filteredProjectId){
  //     fetchBudgetExpensesByCustomer(filteredCustomerId)
  //   }
  // },[filteredCustomerId, filteredProjectId])

  async function fetchBudgetExpenses(pageNumber: number) {
    setLoading(true);
    try {
      const { fetchBudgetExpense } = await FinancialService();
      const response = await fetchBudgetExpense(pageNumber, rowsPerPage);
      setBudgetExpenses(response.data);
      setTotal(response.total);
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBudgetExpensesByCustomer(customerId: string) {
    setLoading(true);
    try {
      const { fetchBudgetExpenseByCustomer } = await FinancialService();
      const response = await fetchBudgetExpenseByCustomer(customerId);
      console.log(response);
      setBudgetExpenses(response.data);
      setTotal(response.data.length);
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBudgetExpensesByProject(projectId: string) {
    setLoading(true);
    try {
      const { fetchBudgetExpenseByProject } = await FinancialService();
      const response = await fetchBudgetExpenseByProject(projectId);
      setBudgetExpenses(response.data);
      setTotal(response.data.length);
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  }

  const contextValue: FinancialContextType = {
    isOpenModalCreateLaunch,
    onOpen,
    onClose,
    fetchBudgetExpenses,
    setPage,
    total,
    page,
    loading,
    rowsPerPage,
    budgetExpenses,
    filteredCustomerId,
    setFilteredCustomerId,
    filteredProjectId,
    setFilteredProjectId,
    fetchBudgetExpensesByCustomer,
    fetchBudgetExpensesByProject,
  };

  return (
    <FinancialContext.Provider value={contextValue}>
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancialContext = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error(
      "useFinancialContext deve ser usado dentro de um FinancialProvider",
    );
  }
  return context;
};
