"use client";
import { Tabs, Tab } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { Key } from "react";

export default function TabsDashboardCustomer() {
  const router = useRouter();
  const pathname = usePathname();
  const handleTabChange = (key: Key) => {
    router.push(`/customer/dashboard/${key}`);
  };
  return (
    <div>
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        classNames={{
          base: "my-6",
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#001D6C]",
          tab: "w-full px-0 h-12",
          tabContent:
            "group-data-[selected=true]:text-[#001D6C] w-full text-[#21272A]",
        }}
        selectedKey={pathname.includes("projects") ? "projects" : "reports"}
        onSelectionChange={handleTabChange}
      >
        <Tab
          key="projects"
          className="w-full"
          title={
            <div className="flex items-center space-x-2">
              <span>Projetos</span>
            </div>
          }
        ></Tab>
        <Tab
          key="reports"
          title={
            <div className="flex items-center space-x-2">
              <span>Relatórios</span>
            </div>
          }
        ></Tab>
      </Tabs>
    </div>
  );
}
