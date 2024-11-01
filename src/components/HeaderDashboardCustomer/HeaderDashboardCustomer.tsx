"use client";
import { usePathname, useRouter } from "next/navigation";
import FilterProjectsByCustomer from "../FilterProjectsByCustomer/FilterProjectsByCustomer";
import Notification from "../Notification/Notification";
import TabsDashboardCustomer from "./TabsDashboardCustomer/TabsDashboardCustomer";

export default function HeaderDashboardCustomer() {
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
      <div className="flex flex-row justify-between w-full flex-wrap gap-6">
        {pathsWithTab.includes(pathname) && <TabsDashboardCustomer />}
      </div>
    </div>
  );
}
