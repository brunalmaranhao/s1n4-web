"use client";
import { Tabs, Tab } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { Key } from "react";

export default function TabsManagement() {
  const router = useRouter();
 const pathname = usePathname()
  const handleTabChange = (key: Key) => {    
    router.push(`/admin/management/${key}`);
  };
  return (
    <div>
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "w-full px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4] w-full",
        }}
        // selectedKey={pathname}
        onSelectionChange={handleTabChange}
      >
        <Tab
          key="customers"
            className="w-full"
          title={
            <div className="flex items-center space-x-2">
              <span>Clientes</span>
            </div>
          }
        ></Tab>
        <Tab
          key="projects"
          title={
            <div className="flex items-center space-x-2">
              <span>Projetos</span>
            </div>
          }
        ></Tab>
      </Tabs>
    </div>
  );
}
