"use client";

import dynamic from "next/dynamic";
import FilterCustomersAndProjects from "@/components/FilterCustomersAndProjects/FilterCustomersAndProjects";
import OverviewTabContent from "@/components/OverviewTabContent/OverviewTabContent";
import ProjectsOverview from "@/components/ProjectsOverview/ProjectsOverview";
import TabsAndFilters from "@/components/TabsAndFilters/TabsAndFilters";
import Notification from "@/components/Notification/Notification";

import { Key, useEffect, useState } from "react";
import FilterReportsByCustomer from "@/components/FilterReportsByCustomer/FilterReportsByCustomer";
import { useTheme } from "next-themes";
import { Button, Switch, Tooltip } from "@nextui-org/react";
import { SunIcon } from "@/components/SunIcon/SunIcon";
import { MoonIcon } from "@/components/MoonIcon/MoonIcon";
import { GrAdd } from "react-icons/gr";
import { useReportContext } from "@/context/ReportContext";
import DashboardBudgetChart from "@/components/DashboardBudgetChart/DashboardBudgetChart";
import { useCustomerContext } from "@/context/CustomerContext";
import CustomerService from "@/services/models/customer";
import toast from "react-hot-toast";
import { RiFileDownloadLine } from "react-icons/ri";
import ModalDownloadPeriodicReportWithCustomerFilter from "@/components/ModalDownloadPeriodicReportWithCustomerFilter/ModalDownloadPeriodicReportWithCustomerFilter";
import OverdueProjectsOverview from "@/components/OverdueProjectsOverview/OverdueProjectsOverview";

const ReportTabContent = dynamic(
  () => import("@/components/ReportTabContent/ReportTabContent"),
  { ssr: false },
);

const BrazilMap = dynamic(() => import("@/components/BrazilMap/BrazilMap"), {
  ssr: false,
});

const ModalCreatePeriodicReport = dynamic(
  () =>
    import("@/components/ModalCreatePeriodicReport/ModalCreatePeriodicReport"),
  { ssr: false },
);

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<Key>("");

  const { onOpenModalCreatePeriodicReport, onOpenModalDownloadPeriodicReport } =
    useReportContext();
  const { setSelectedCustomer, selectedCustomer, isClientSelected } =
    useCustomerContext();
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const { theme, setTheme } = useTheme();

  const handleTabChange = (key: Key) => {
    setSelectedTab(key);
  };

  const handleSelectedClient = (client: ICustomer | undefined) => {
    setSelectedCustomer(client);
    console.log(client);
  };

  const getFirstCustomerId = async () => {
    try {
      const { findAllActives } = await CustomerService();
      const { customers } = await findAllActives();
      setSelectedCustomer(customers[0]);
      setCustomers(customers);
    } catch (error) {
      toast.error(error as string);
    }
  };

  useEffect(() => {
    getFirstCustomerId();
  }, []);

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
                startContent={<RiFileDownloadLine />}
                className="pr-5 bg-transparent text-[#F57B00] border border-[#F57B00]"
                onPress={() => onOpenModalDownloadPeriodicReport()}
              >
                Baixar relatório
              </Button>
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
        <div className="flex w-full space-x-6">
          <div className="flex flex-col w-[50%] h-full ">
            {selectedTab === "overview" && (
              <div className="h-full w-full flex flex-col gap-4 ">
                <OverviewTabContent selectedClient={selectedCustomer} />
                <div className=" h-full flex w-full space-x-4 ">
                  <ProjectsOverview selectedClient={selectedCustomer} />
                  <OverdueProjectsOverview selectedClient={selectedCustomer} />
                </div>
              </div>
            )}
            {selectedTab === "reports" && (
              <div>
                <ReportTabContent />
              </div>
            )}
          </div>
          <div className="w-[50%] flex flex-col gap-4">
            {selectedTab === "overview" && (
              <>
                {selectedCustomer?.id && (
                  <DashboardBudgetChart customerId={selectedCustomer?.id} />
                )}

                {!isClientSelected && <BrazilMap customers={customers} />}
              </>
            )}
          </div>
        </div>
      </div>
      <ModalCreatePeriodicReport />
      <ModalDownloadPeriodicReportWithCustomerFilter />
    </div>
  );
}
