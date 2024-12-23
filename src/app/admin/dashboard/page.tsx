"use client";

import dynamic from "next/dynamic";
import FilterCustomersAndProjects from "@/components/FilterCustomersAndProjects/FilterCustomersAndProjects";
import OverviewTabContent from "@/components/OverviewTabContent/OverviewTabContent";
import ProjectsOverview from "@/components/ProjectsOverview/ProjectsOverview";
import TabsAndFilters from "@/components/TabsAndFilters/TabsAndFilters";
import Notification from "@/components/Notification/Notification";

import { Key, useState } from "react";
import FilterReportsByCustomer from "@/components/FilterReportsByCustomer/FilterReportsByCustomer";
import { useTheme } from "next-themes";
import { Button, Switch, Tooltip } from "@nextui-org/react";
import { SunIcon } from "@/components/SunIcon/SunIcon";
import { MoonIcon } from "@/components/MoonIcon/MoonIcon";
import { GrAdd } from "react-icons/gr";
import { useReportContext } from "@/context/ReportContext";

import { CustomersBudgetDonutChart } from "@/components/CustomersBudgetDonutChart/CustomersBudgetDonutChart";

const ReportTabContent = dynamic(
  () => import("@/components/ReportTabContent/ReportTabContent"),
  { ssr: false },
);

const ModalCreatePeriodicReport = dynamic(
  () =>
    import("@/components/ModalCreatePeriodicReport/ModalCreatePeriodicReport"),
  { ssr: false },
);

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<Key>("");
  const [selectedClient, setSelectedClient] = useState<ICustomer | undefined>(
    undefined,
  );

  const { onOpenModalCreatePeriodicReport } = useReportContext();

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
            <div className="flex gap-3">
              <Button
                color="primary"
                startContent={<GrAdd />}
                className="pr-5 bg-transparent text-[#F57B00] border border-[#F57B00]"
                onPress={() => onOpenModalCreatePeriodicReport()}
              >
                Inserir Relatório Mensal
              </Button>
              <FilterReportsByCustomer />
            </div>
          )}
        </div>
        <div className="flex space-x-6">
          <div className="flex flex-col w-[50%]">
            {selectedTab === "overview" && (
              <div className="h-full ">
                <OverviewTabContent selectedClient={selectedClient} />
                <div className=" h-full mt-6 flex">
                  <ProjectsOverview selectedClient={selectedClient} />
                </div>
              </div>
            )}
            {selectedTab === "reports" && (
              <div>
                <ReportTabContent />
              </div>
            )}
          </div>
          <div className="w-[50%]">
            {selectedTab === "overview" && (
              <div className="bg-white flex justify-start items-center dark:bg-[#1E1E1E] border-solid border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg shadow-[0_0_48px_0_rgba(0,0,0,0.05)] dark:shadow-[0_0_48px_0_rgba(0,0,0,0.02)] h-[200px]">
                <CustomersBudgetDonutChart />
                <div className=" mr-10">
                  <div className="flex justify-center items-center">
                    <div className="w-[10px] h-[10px] rounded-full space-x-4 bg-yellow-400" />
                    <h1>Cliente</h1>
                    <h1>(budget mensal)</h1>
                    <h1>(percentual do budget disponivel)</h1>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-[10px] h-[10px] rounded-full space-x-4 bg-yellow-400" />
                    <h1>Cliente</h1>
                    <h1>(budget mensal)</h1>
                    <h1>(percentual do budget disponivel)</h1>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-[10px] h-[10px] rounded-full space-x-4 bg-yellow-400" />
                    <h1>Cliente</h1>
                    <h1>(budget mensal)</h1>
                    <h1>(percentual do budget disponivel)</h1>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-[10px] h-[10px] rounded-full space-x-4 bg-yellow-400" />
                    <h1>Cliente</h1>
                    <h1>(budget mensal)</h1>
                    <h1>(percentual do budget disponivel)</h1>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-[10px] h-[10px] rounded-full space-x-4 bg-yellow-400" />
                    <h1>Cliente</h1>
                    <h1>(budget mensal)</h1>
                    <h1>(percentual do budget disponivel)</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalCreatePeriodicReport />
    </div>
  );
}
