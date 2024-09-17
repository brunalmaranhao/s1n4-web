"use client";

import {
  fetchActiveUsers,
  fetchCustomersWithUsers,
  findAllCustomers,
} from "./actions";
import { Key, useEffect, useState } from "react";
import { parseCookies } from "nookies";
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
import { SlArrowDown } from "react-icons/sl";
import OverviewTabContent from "@/components/OverviewTabContent/OverviewTabContent";
import TabsAndFilters from "@/components/TabsAndFilters/TabsAndFilters";
import FilterCustomersAndProjects from "@/components/FilterCustomersAndProjects/FilterCustomersAndProjects";
import Menu from "@/components/Menu/Menu";
import Notification from "@/components/Notification/Notification";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<Key>("");

  const handleTabChange = (key: Key) => {
    setSelectedTab(key);
  };
  return (
    <div className="bg-[#F2F4F8] flex text-black w-full">
      <div className="p-6 w-full">
        <div className="flex justify-between">
          <h1 className="text-[42px] text-[#21272A] font-bold">
            Dashboard - Visão geral
          </h1>
          <Notification />
        </div>

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
