"use client";
import { usePathname, useRouter } from "next/navigation";
import FilterProjectsByCustomer from "../FilterProjectsByCustomer/FilterProjectsByCustomer";
import Notification from "../Notification/Notification";
import TabsDashboardCustomer from "./TabsDashboardCustomer/TabsDashboardCustomer";
import { Button } from "@nextui-org/react";
import { RiFileDownloadLine } from "react-icons/ri";
import { useReportContext } from "@/context/ReportContext";

export default function HeaderDashboardCustomer() {
  const { onOpenModalDownloadPeriodicReport } = useReportContext();
  const pathsWithTab = [
    "/customer/dashboard/reports",
    "/customer/dashboard/projects",
  ];
  const pathname = usePathname();
  const label = pathname.startsWith("/customer/dashboard/projects")
    ? "Projetos"
    : "Relatórios";
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-[42px] text-[#21272A] font-bold">
          Gerenciar - {label}{" "}
        </h1>

        <Notification />
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
