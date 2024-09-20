import { Tab, Tabs } from "@nextui-org/react";

import { Key, useState } from "react";

interface TabsAndFiltersProps {
  onTabChange: (key: Key) => void;
}

export default function TabsAndFilters({ onTabChange }: TabsAndFiltersProps) {
  const [selectedTab, setSelectedTab] = useState<Key>("");

  const handleTabChange = (key: Key) => {
    setSelectedTab(key);
    onTabChange(key);
  };

  return (
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
      selectedKey={selectedTab as string | null | undefined}
      onSelectionChange={handleTabChange}
    >
      <Tab
        key="overview"
        className="w-full"
        title={
          <div className="flex items-center space-x-2">
            <span className="font-medium">Visão geral</span>
          </div>
        }
      ></Tab>
      <Tab
        key="reports"
        title={
          <div className="flex items-center space-x-2">
            <span className="font-medium">Relatórios</span>
          </div>
        }
      ></Tab>
    </Tabs>
  );
}
