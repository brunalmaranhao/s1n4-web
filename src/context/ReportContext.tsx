"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import ReportService from "@/services/models/report";
import toast from "react-hot-toast";
import CustomerService from "@/services/models/customer";

type ReportContextType = {
  reports: ReportDetailsResponse[];
  fetchReports: (page: number, size: number) => void;
  fetchReportsByCustomerId: (
    customerId: string,
    page: number,
    size: number
  ) => void;
  loading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  customers: ICustomer[];
  rowsPerPage: number;
  selectedCustomer?: string;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [reports, setReports] = useState<ReportDetailsResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<
    string | undefined
  >();
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  async function fetchReports(page: number, size: number) {
    if (customers.length === 0) fetchCustomer();
    setLoading(true);
    try {
      const { fetchReports } = await ReportService();
      const response = await fetchReports(page, size);
      setReports(response.reports);
      setTotal(response.total);
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar os relatórios,");
    } finally {
      setLoading(false);
    }
  }
  async function fetchReportsByCustomerId(
    customerId: string,
    page: number,
    size: number
  ) {
    setLoading(true);
    try {
      const { fetchReportsByCustomerId } = await ReportService();
      const response = await fetchReportsByCustomerId(customerId, page, size);
      setReports(response.reports);
      setTotal(response.total);
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar os relatórios,");
    } finally {
      setLoading(false);
    }
  }

  async function fetchCustomer() {
    try {
      const { findAllActives } = await CustomerService();
      const response = await findAllActives();
      setCustomers(response.customers);
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar clientes.");
    }
  }

  const contextValue: ReportContextType = {
    reports,
    fetchReports,
    fetchReportsByCustomerId,
    loading,
    total,
    customers,
    page,
    setPage,
    rowsPerPage,
    selectedCustomer,
    setSelectedCustomer,
  };

  return (
    <ReportContext.Provider value={contextValue}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error(
      "useReportContext deve ser usado dentro de um ReportProvider"
    );
  }
  return context;
};
