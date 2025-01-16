"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import CustomerService from "@/services/models/customer";
import toast from "react-hot-toast";
import { handleAxiosError } from "@/services/error";

type CustomerContextType = {
  isOpenModalEdit: boolean;
  onOpenChangeModalEdit: () => void;
  onOpenModalEdit: () => void;
  isOpenModalRemove: boolean;
  onOpenChangeModalRemove: () => void;
  onOpenModalRemove: () => void;
  isOpenModalAddReport: boolean;
  onOpenChangeModalAddReport: () => void;
  onOpenModalAddReport: () => void;
  isOpenModalAddUser: boolean;
  onOpenChangeModalAddUser: () => void;
  onOpenModalAddUser: () => void;
  isOpenModalAddResponsible: boolean;
  onOpenChangeModalAddResponsible: () => void;
  onOpenModalAddResponsible: () => void;
  customers: ICustomer[];
  fetchCustomers: (page: number) => void;
  selectedCustomerEdit?: ICustomer;
  setSelectedCustomerEdit: React.Dispatch<
    React.SetStateAction<ICustomer | undefined>
  >;
  selectedCustomerRemove?: ICustomer;
  setSelectedCustomerRemove: React.Dispatch<
    React.SetStateAction<ICustomer | undefined>
  >;
  selectedCustomerCreateCustomerUpdate?: ICustomer;
  setSelectedCustomerCreateCustomerUpdate: React.Dispatch<
    React.SetStateAction<ICustomer | undefined>
  >;
  selectedCustomerName?: string;
  setSelectedCustomerName: React.Dispatch<React.SetStateAction<string>>;

  firstCustomerNameLoaded?: string;
  setFirstCustomerNameLoaded: React.Dispatch<React.SetStateAction<string>>;

  selectedCustomer?: ICustomer;
  setSelectedCustomer: React.Dispatch<
    React.SetStateAction<ICustomer | undefined>
  >;

  isClientFilterActive: boolean;
  setIsClientFilterActive: React.Dispatch<React.SetStateAction<boolean>>;

  isClientSelected: boolean;
  setIsClientSelected: React.Dispatch<React.SetStateAction<boolean>>;

  shouldShowFirstCustomer: boolean;
  setShouldShowFirstCustomer: React.Dispatch<React.SetStateAction<boolean>>;

  customerBudgetBalance: ICustomerBudgetBalance | undefined;

  setCustomerBudgetBalance: React.Dispatch<
    React.SetStateAction<ICustomerBudgetBalance | undefined>
  >;

  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  page: number;
  loading: boolean;
  rowsPerPage: number;
};

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined,
);

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onOpenChange: onOpenChangeModalEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenModalRemove,
    onOpen: onOpenModalRemove,
    onOpenChange: onOpenChangeModalRemove,
  } = useDisclosure();
  const {
    isOpen: isOpenModalAddUser,
    onOpen: onOpenModalAddUser,
    onOpenChange: onOpenChangeModalAddUser,
  } = useDisclosure();

  const {
    isOpen: isOpenModalAddReport,
    onOpen: onOpenModalAddReport,
    onOpenChange: onOpenChangeModalAddReport,
  } = useDisclosure();

  const {
    isOpen: isOpenModalAddResponsible,
    onOpen: onOpenModalAddResponsible,
    onOpenChange: onOpenChangeModalAddResponsible,
  } = useDisclosure();

  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = useState(true);

  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [selectedCustomerEdit, setSelectedCustomerEdit] = useState<
    ICustomer | undefined
  >();
  const [selectedCustomerRemove, setSelectedCustomerRemove] = useState<
    ICustomer | undefined
  >();
  const [isClientSelected, setIsClientSelected] = useState<boolean>(false);

  const [customerBudgetBalance, setCustomerBudgetBalance] = useState<
    ICustomerBudgetBalance | undefined
  >();

  const [
    selectedCustomerCreateCustomerUpdate,
    setSelectedCustomerCreateCustomerUpdate,
  ] = useState<ICustomer | undefined>();

  const [selectedCustomerName, setSelectedCustomerName] = useState<string>("");
  const [firstCustomerNameLoaded, setFirstCustomerNameLoaded] =
    useState<string>("");

  const [selectedCustomer, setSelectedCustomer] = useState<
    ICustomer | undefined
  >();

  const [shouldShowFirstCustomer, setShouldShowFirstCustomer] =
    useState<boolean>(false);

  const [isClientFilterActive, setIsClientFilterActive] = useState(false);

  async function fetchCustomers(pageNumber: number) {
    setLoading(true);
    try {
      const { findAll } = await CustomerService();
      const response = await findAll(pageNumber, rowsPerPage);
      setCustomers(response.customers);
      setTotal(response.total);
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  }
  const contextValue: CustomerContextType = {
    customers,
    isOpenModalEdit,
    onOpenChangeModalEdit,
    onOpenModalEdit,
    selectedCustomerEdit,
    setSelectedCustomerEdit,
    selectedCustomerRemove,
    setSelectedCustomerRemove,
    isOpenModalRemove,
    onOpenModalRemove,
    onOpenChangeModalRemove,
    selectedCustomerCreateCustomerUpdate,
    setSelectedCustomerCreateCustomerUpdate,
    total,
    page,
    setPage,
    fetchCustomers,
    loading,
    rowsPerPage,
    isOpenModalAddUser,
    onOpenModalAddUser,
    onOpenChangeModalAddUser,
    isOpenModalAddReport,
    onOpenModalAddReport,
    onOpenChangeModalAddReport,
    isOpenModalAddResponsible,
    onOpenModalAddResponsible,
    onOpenChangeModalAddResponsible,
    selectedCustomerName,
    setSelectedCustomerName,
    firstCustomerNameLoaded,
    setFirstCustomerNameLoaded,
    selectedCustomer,
    setSelectedCustomer,
    shouldShowFirstCustomer,
    setShouldShowFirstCustomer,
    isClientSelected,
    setIsClientSelected,
    isClientFilterActive,
    setIsClientFilterActive,
    customerBudgetBalance,
    setCustomerBudgetBalance,
  };

  return (
    <CustomerContext.Provider value={contextValue}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      "useCustomerContext deve ser usado dentro de um CustomerProvider",
    );
  }
  return context;
};
