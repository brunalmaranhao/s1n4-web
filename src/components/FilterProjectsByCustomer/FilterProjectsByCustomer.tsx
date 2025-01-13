import { useProjectContext } from "@/context/ProjectContext";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useEffect, useMemo } from "react";
import { SlArrowDown } from "react-icons/sl";

export default function FilterProjectsByCustomer() {
  const {
    customers,
    fetchCustomer,
    setSelectedCustomerFilter,
    selectedCustomerFilter,
  } = useProjectContext();

  const selectedValue = useMemo(() => {
    if (selectedCustomerFilter) {
      const selectedCustomer = customers.find(
        (item) => item.id === selectedCustomerFilter,
      );
      return selectedCustomer?.name || "Cliente";
    }
    return "Cliente";
  }, [selectedCustomerFilter, customers]);

  useEffect(() => {
    if (customers.length === 0) {
      fetchCustomer();
    }
  }, [customers, fetchCustomer]);

  const handleSelectionChange = (keys: "all" | Set<React.Key>) => {
    const selectedId = Array.from(keys)[0] as string | undefined;
    setSelectedCustomerFilter(selectedId);
  };

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button
          className="bg-white text-[16px] text-black font-medium"
          endContent={<SlArrowDown />}
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="single"
        selectedKeys={
          selectedCustomerFilter ? new Set([selectedCustomerFilter]) : undefined
        }
        onSelectionChange={handleSelectionChange}
        variant="light"
        aria-label="Static Actions"
        className="max-h-[320px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-700"
      >
        {customers.map((item) => (
          <DropdownItem key={item.id} className="text-black dark:text-white">
            {item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
