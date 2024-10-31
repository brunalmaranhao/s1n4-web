"use client";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { Key, useState } from "react";
import { GrAdd } from "react-icons/gr";

export default function TabsManagement() {
  const [selectedTab, setSelectedTab] = useState<Key>("customers");
  const router = useRouter();
  const pathname = usePathname();
  const handleTabChange = (key: Key) => {
    setSelectedTab(key);
    router.push(`/admin/management/${key}`);
  };
  const { push } = useRouter();

  return (
    <div className="">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        classNames={{
          base: "my-6",
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#F57B00] dark:bg-[#F57B00]",
          tab: "w-full px-0 h-12",
          tabContent:
            "group-data-[selected=true]:text-[#001D6C] w-full text-[#21272A]",
        }}
        selectedKey={pathname.includes("projects") ? "projects" : "customers"}
        onSelectionChange={handleTabChange}
      >
        <Tab
          key="customers"
          className="w-full"
          title={
            <div className="flex items-center space-x-2">
              <span
                className={`font-medium ${
                  selectedTab === "customers"
                    ? "text-[#F57B00]"
                    : "text-black dark:text-white"
                }`}
              >
                Clientes
              </span>
            </div>
          }
        ></Tab>
        <Tab
          key="projects"
          title={
            <div className="flex items-center space-x-2">
              <span
                className={`font-medium ${
                  selectedTab === "projects"
                    ? "text-[#F57B00]"
                    : "text-black dark:text-white"
                }`}
              >
                Projetos
              </span>
            </div>
          }
        ></Tab>
        <Tab
          key="financial"
          title={
            <div className="flex items-center space-x-2">
              <span
                className={`font-medium ${
                  selectedTab === "financial"
                    ? "text-[#F57B00]"
                    : "text-black dark:text-white"
                }`}
              >
                Financeiro
              </span>
            </div>
          }
        ></Tab>
      </Tabs>
    </div>
  );
}
