"use client";

import FilterCustomersAndProjects from "@/components/FilterCustomersAndProjects/FilterCustomersAndProjects";
import OverviewTabContent from "@/components/OverviewTabContent/OverviewTabContent";
import ProjectsOverview from "@/components/ProjectsOverview/ProjectsOverview";
import TabsAndFilters from "@/components/TabsAndFilters/TabsAndFilters";
import Notification from "@/components/Notification/Notification";

import { Key, useState } from "react";
import ReportTabContent from "@/components/ReportTabContent/ReportTabContent";
import FilterReportsByCustomer from "@/components/FilterReportsByCustomer/FilterReportsByCustomer";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { SunIcon } from "@/components/SunIcon/SunIcon";
import { MoonIcon } from "@/components/MoonIcon/MoonIcon";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<Key>("");
  const [selectedClient, setSelectedClient] = useState<ICustomer | undefined>(
    undefined,
  );

  const { theme, setTheme } = useTheme();

  const handleTabChange = (key: Key) => {
    setSelectedTab(key);
  };

  const handleSelectedClient = (client: ICustomer | undefined) => {
    setSelectedClient(client);
  };

  return (
    <div className="bg-[#F2F4F8] dark:bg-[#000] flex text-black w-full">
      <div className="p-6 w-full">
        <div className="flex justify-between">
          <h1 className="text-[42px] text-[#21272A] dark:text-white font-bold">
            Dashboard -{" "}
            {selectedTab === "overview" ? "Visão Geral" : "Relatórios"}
          </h1>
          <div className="flex items-center gap-4">
            <Switch
              defaultSelected
              size="lg"
              // color="warning"
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

        <div className="flex flex-row items-center justify-between w-full">
          <TabsAndFilters onTabChange={handleTabChange} />
          {selectedTab === "overview" ? (
            <FilterCustomersAndProjects onClientSelect={handleSelectedClient} />
          ) : (
            <FilterReportsByCustomer />
          )}
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
          {selectedTab === "reports" && (
            <div>
              <ReportTabContent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
