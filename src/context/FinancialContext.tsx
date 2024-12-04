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
  fetchBudgetExpensesBalanceByProject: (projectId: string) => void;
  fetchBudgetExpensesBalanceByCustomer: (customerId: string) => void;
  fetchAllBudgetExpensesBalance: () => void;
  loadingBalance: boolean;
  budgetExpenseBalance?: IBudgetExpenseBalance;
  selectedKeysCustomer: Set<string>;
  selectedKeysProject: Set<string>;
  setSelectedKeysCustomer: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSelectedKeysProject: React.Dispatch<React.SetStateAction<Set<string>>>;
  clearFilters: () => void
};

const FinancialContext = createContext<FinancialContextType | undefined>(
  undefined
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
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [budgetExpenses, setBudgetExpenses] = useState<IBudgetExpense[]>([]);
  const [filteredCustomerId, setFilteredCustomerId] = useState<
    string | undefined
  >();
  const [filteredProjectId, setFilteredProjectId] = useState<
    string | undefined
  >();

  const [selectedKeysCustomer, setSelectedKeysCustomer] = useState<Set<string>>(
    new Set()
  );
  const [selectedKeysProject, setSelectedKeysProject] = useState<Set<string>>(
    new Set()
  );

  const [budgetExpenseBalance, setBudgetExpenseBalance] = useState<
    IBudgetExpenseBalance | undefined
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

  async function fetchBudgetExpensesBalanceByCustomer(customerId: string) {
    setLoadingBalance(true);
    try {
      const { fetchBudgetExpenseBalanceByCustomer } = await FinancialService();
      const response = await fetchBudgetExpenseBalanceByCustomer(customerId);
      setBudgetExpenseBalance(response.data);
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoadingBalance(false);
    }
  }

  async function fetchBudgetExpensesBalanceByProject(projectId: string) {
    setLoadingBalance(true);
    try {
      const { fetchBudgetExpenseBalanceByProject } = await FinancialService();
      const response = await fetchBudgetExpenseBalanceByProject(projectId);
      setBudgetExpenseBalance(response.data);
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoadingBalance(false);
    }
  }

  async function fetchAllBudgetExpensesBalance() {
    setLoadingBalance(true);
    try {
      const { fetchAllBudgetExpenseBalance } = await FinancialService();
      const response = await fetchAllBudgetExpenseBalance();
      setBudgetExpenseBalance(response.data);
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoadingBalance(false);
    }
  }

  async function fetchBudgetExpensesByCustomer(customerId: string) {
    setLoading(true);
    try {
      const { fetchBudgetExpenseByCustomer } = await FinancialService();
      const response = await fetchBudgetExpenseByCustomer(customerId);
      //console.log(response);
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

  const clearFilters = () => {
    setSelectedKeysCustomer(new Set());
    setSelectedKeysProject(new Set());
    setFilteredCustomerId(undefined);
    setFilteredProjectId(undefined);
    fetchBudgetExpenses(page);
  };

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
    budgetExpenseBalance,
    loadingBalance,
    fetchAllBudgetExpensesBalance,
    fetchBudgetExpensesBalanceByProject,
    fetchBudgetExpensesBalanceByCustomer,
    selectedKeysCustomer,
    selectedKeysProject,
    setSelectedKeysCustomer,
    setSelectedKeysProject,
    clearFilters
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
      "useFinancialContext deve ser usado dentro de um FinancialProvider"
    );
  }
  return context;
};
