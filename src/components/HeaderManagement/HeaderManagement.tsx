"use client";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import TabsManagement from "./TabsManagement/TabsManagement";
import { useProjectContext } from "@/context/ProjectContext";
import FilterProjectsByCustomer from "../FilterProjectsByCustomer/FilterProjectsByCustomer";
import Notification from "../Notification/Notification";
import { useFinancialContext } from "@/context/FinancialContext";
import FilterBudgetExpenseByCustomerOrProject from "../FilterBudgetExpenseByCustomerOrProject/FilterBudgetExpenseByCustomerOrProject";

export default function HeaderManagement() {
  const { onOpen } = useProjectContext();
  const {onOpen: onOpenFinancialModal } = useFinancialContext()
  const { push } = useRouter();
  const pathsWithTab = [
    "/admin/management/customers",
    "/admin/management/projects",
    "/admin/management/financial",
  ];
  const pathname = usePathname();
  const label = pathname.startsWith("/admin/management/customers")
    ? "Clientes"
    : pathname.startsWith("/admin/management/projects")
    ? "Projetos"
    : "Financeiro";
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-[42px] text-[#21272A] font-bold">
          Gerenciar - {label}{" "}
        </h1>
        <Notification />
      </div>
      <div className="flex flex-row justify-between w-full flex-wrap gap-6">
        {pathsWithTab.includes(pathname) && <TabsManagement />}

        {label === "Clientes" && pathsWithTab.includes(pathname) && (
          <div>
            <Button
              color="primary"
              onPress={() => push("/admin/management/customers/new")}
            >
              Novo Cliente
            </Button>
          </div>
        )}
        {label === "Projetos" && pathsWithTab.includes(pathname) && (
          <div className="flex flex-row gap-3 items-center flex-wrap">
            <h1 className="text-nowrap font-medium text-black dark:text-white">
              Filtrar por{" "}
            </h1>
            <FilterProjectsByCustomer />
            <Button color="primary" onPress={() => onOpen()}>
              Novo Projeto
            </Button>
          </div>
        )}

        {label === "Financeiro" && pathsWithTab.includes(pathname) && (
          <div className="flex flex-row gap-3 items-center flex-wrap">
            <h1 className="text-nowrap font-medium text-black dark:text-white">
              Filtrar por{" "}
            </h1>
            <FilterBudgetExpenseByCustomerOrProject />
            <Button color="primary" onPress={() => onOpenFinancialModal()}>
              Novo Lançamento
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
