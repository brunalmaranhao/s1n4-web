import { useProjectContext } from "@/context/ProjectContext";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { SlArrowDown } from "react-icons/sl";

export default function FilterProjectsByCustomer() {
  const {
    customers,
    fetchCustomer,
    fetchAllProjects,
    fetchProjectsByCustomer,
    setSelectedCustomerFilter,
  } = useProjectContext();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const selectedId = Array.from(selectedKeys)[0];
    if (selectedId) {
      fetchProjectsByCustomer(selectedId);
      setSelectedCustomerFilter(selectedId);
      return;
    }
    setSelectedCustomerFilter(undefined);
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
        <Button
          className="bg-white text-[16px] font-medium"
          endContent={<SlArrowDown />}
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        variant="light"
        aria-label="Static Actions"
        className="max-h-[320px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-700"
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
