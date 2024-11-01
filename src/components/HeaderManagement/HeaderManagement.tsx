"use client";
import { Button, Switch } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import TabsManagement from "./TabsManagement/TabsManagement";
import { useProjectContext } from "@/context/ProjectContext";
import FilterProjectsByCustomer from "../FilterProjectsByCustomer/FilterProjectsByCustomer";
import Notification from "../Notification/Notification";
import { SunIcon } from "../SunIcon/SunIcon";
import { MoonIcon } from "../MoonIcon/MoonIcon";
import { useTheme } from "next-themes";
import Image from "next/image";
import { GrAdd } from "react-icons/gr";
import { useFinancialContext } from "@/context/FinancialContext";
import FilterBudgetExpenseByCustomerOrProject from "../FilterBudgetExpenseByCustomerOrProject/FilterBudgetExpenseByCustomerOrProject";

export default function HeaderManagement() {
  const { theme, setTheme } = useTheme();
  const { onOpen } = useProjectContext();
  const { onOpen: onOpenFinancialModal } = useFinancialContext();
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
      <div className="flex flex-row justify-between mt-4 items-center w-full">
        <h1 className="text-[42px] text-[#21272A] dark:text-white font-bold">
          Gerenciar - {label}{" "}
        </h1>
        <div className="flex flex-row gap-4 items-center">
          <Switch
            defaultSelected
            size="lg"
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            classNames={{
              wrapper: "group-data-[selected=true]:bg-[#F57B00]",
            }}
          ></Switch>
          <Notification />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full flex-wrap gap-6">
        {pathsWithTab.includes(pathname) && <TabsManagement />}

        {label === "Clientes" && pathsWithTab.includes(pathname) && (
          <div>
            <Button
              color="primary"
              onPress={() => push("/admin/management/customers/new")}
              startContent={<GrAdd />}
              className="pr-6 bg-[#F57B00]"
            >
              Novo Cliente
            </Button>
          </div>
        )}
        {label === "Projetos" && pathsWithTab.includes(pathname) && (
          <div className="flex flex-row gap-3 items-center flex-wrap">
            <h1 className="text-nowrap font-medium text-black dark:text-white">
              Filtrar por
            </h1>
            <FilterProjectsByCustomer />
            <Button
              color="primary"
              startContent={<GrAdd />}
              className="pr-5 bg-transparent text-[#F57B00] border border-[#F57B00]"
              onPress={() => onOpen()}
            >
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
            <Button
              startContent={<GrAdd />}
              className="pr-5 bg-transparent text-[#F57B00] border border-[#F57B00]"
              onPress={() => onOpenFinancialModal()}
            >
              Novo Lançamento
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
