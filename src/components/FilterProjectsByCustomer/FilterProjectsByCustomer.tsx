import { useProjectContext } from "@/context/ProjectContext";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";

export default function FilterProjectsByCustomer() {
  const {
    customers,
    fetchCustomer,
    fetchAllProjects,
    fetchProjectsByCustomer,
  } = useProjectContext();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const selectedId = Array.from(selectedKeys)[0];
    if (selectedId) {
      fetchProjectsByCustomer(selectedId);
      return;
    }
    fetchAllProjects();
  }, [selectedKeys]);

  const selectedValue = useMemo(() => {
    if (selectedKeys.size > 0) {
      const selectedId = Array.from(selectedKeys)[0];
      const selectedCustomer = customers.find((item) => item.id === selectedId);
      return selectedCustomer?.corporateName || "Cliente";
    }
    return "Cliente";
  }, [selectedKeys, customers]);

  useEffect(() => {
    if (customers.length === 0) {
      fetchCustomer();
    }
  }, [customers, fetchCustomer]);

  const handleSelectionChange = (keys: "all" | Set<React.Key>) => {
    setSelectedKeys(new Set(Array.from(keys) as string[]));
  };

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button variant="bordered" color="primary" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        variant="light"
        aria-label="Static Actions"
        className="h-[200px] overflow-auto"
      >
        {customers.map((item) => (
          <DropdownItem key={item.id} className="text-black">
            {item.corporateName}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
