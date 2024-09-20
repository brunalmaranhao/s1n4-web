"use client";

import FilterCustomersAndProjects from "@/components/FilterCustomersAndProjects/FilterCustomersAndProjects";
import OverviewTabContent from "@/components/OverviewTabContent/OverviewTabContent";
import ProjectsOverview from "@/components/ProjectsOverview/ProjectsOverview";
import TabsAndFilters from "@/components/TabsAndFilters/TabsAndFilters";
import Notification from "@/components/Notification/Notification";

import { Key, useState } from "react";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<Key>("");
  const [selectedClient, setSelectedClient] = useState<ICustomer | undefined>(
    undefined,
  );

  console.log(selectedClient);

  const handleTabChange = (key: Key) => {
    setSelectedTab(key);
  };

  const handleSelectedClient = (client: ICustomer | undefined) => {
    setSelectedClient(client);
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
          <FilterCustomersAndProjects onClientSelect={handleSelectedClient} />
        </div>
        <div className="flex flex-col">
          {selectedTab === "overview" && (
            <>
              <OverviewTabContent selectedClient={selectedClient} />
              <div className="w-[380px] mt-6">
                <ProjectsOverview selectedClient={selectedClient} />
              </div>
            </>
          )}
          {selectedTab === "reports" && <div>Conteúdo de Relatórios</div>}
        </div>
      </div>
    </div>
  );
}
