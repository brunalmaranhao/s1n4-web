"use client";
import { usePathname, useRouter } from "next/navigation";
import FilterProjectsByCustomer from "../FilterProjectsByCustomer/FilterProjectsByCustomer";
import Notification from "../Notification/Notification";
import TabsDashboardCustomer from "./TabsDashboardCustomer/TabsDashboardCustomer";
import { Button, Switch } from "@nextui-org/react";
import { RiFileDownloadLine } from "react-icons/ri";
import { useReportContext } from "@/context/ReportContext";
import { SunIcon } from "../SunIcon/SunIcon";
import { MoonIcon } from "../MoonIcon/MoonIcon";
import { useTheme } from "next-themes";
import CustomerFinancial from "@/app/customer/dashboard/financial/page";
import OverviewUserCostumer from "../OverviewUserCosutmer/OverviewUserCostumer";

export default function HeaderDashboardCustomer() {
  const { theme, setTheme } = useTheme();
  const { onOpenModalDownloadPeriodicReport } = useReportContext();
  const pathsWithTab = [
    "/customer/dashboard/overview",
    "/customer/dashboard/reports",
    "/customer/dashboard/projects",
    "/customer/dashboard/financial",
  ];
  const pathname = usePathname();
  const label = pathname.startsWith("/customer/dashboard/projects")
    ? "Projetos"
    : pathname.startsWith("/customer/dashboard/reports")
      ? "Relatórios"
      : pathname.startsWith("/customer/dashboard/overview")
        ? "Visão geral"
        : "Financeiro";

  // console.log(label);
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-row mt-4  justify-between w-full">
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
        {pathsWithTab.includes(pathname) && <TabsDashboardCustomer />}

        {label === "Relatórios" && (
          <Button
            startContent={<RiFileDownloadLine />}
            className="pr-5 bg-transparent text-[#F57B00] border border-[#F57B00]"
            onPress={() => onOpenModalDownloadPeriodicReport()}
          >
            Baixar relatório
          </Button>
        )}
      </div>
    </div>
  );
}
