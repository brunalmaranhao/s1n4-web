"use client";

import {
  fetchActiveUsers,
  fetchCustomersWithUsers,
  findAllCustomers,
} from "./actions";
import { Key, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import Header from "@/app/components/Header/Header";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import TabsManagement from "@/app/components/TabsManagement/TabsManagement";
import TabsAndFilters from "@/app/components/TabsAndFilters/TabsAndFilters";
import { SlArrowDown } from "react-icons/sl";
import FilterCustomersAndProjects from "@/app/components/FilterCustomersAndProjects/FilterCustomersAndProjects";
import OverviewTabContent from "@/app/components/OverviewTabContent/OverviewTabContent";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<Key>("");

  const handleTabChange = (key: Key) => {
    setSelectedTab(key);
  };
  return (
    <div className="bg-[#F2F4F8] flex text-black">
      <Header />
      <div className="p-6 w-full">
        <h1 className="text-[42px] text-[#21272A] font-bold">
          Dashboard - Visão geral
        </h1>
        <div className="flex flex-row items-center justify-between w-full">
          <TabsAndFilters onTabChange={handleTabChange} />
          <FilterCustomersAndProjects />
        </div>
        <div className="flex flex-col">
          {selectedTab === "overview" && <OverviewTabContent />}
          {selectedTab === "reports" && <div>Conteúdo de Relatórios</div>}
        </div>
      </div>
    </div>
  );
}
