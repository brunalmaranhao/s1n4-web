import { useProjectContext } from "@/context/ProjectContext";
import {
  Button,
  DateRangePicker,
  DateValue,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  RangeValue,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { I18nProvider } from "@react-aria/i18n";
import { parseDate } from "@internationalized/date";
import { AiOutlineClose } from "react-icons/ai";

export default function FilterProjectsByCustomer() {
  const [dateFilter, setDateFilter] = useState<
    RangeValue<DateValue> | undefined
  >();
  const {
    customers,
    fetchCustomer,
    setSelectedCustomerFilter,
    selectedCustomerFilter,
    fetchListProjectByCustomerAndDate,
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
    setDateFilter(undefined);
  };

  function changeDate(value: RangeValue<DateValue>) {
    setDateFilter(value);
    if (value.start && value.end && selectedCustomerFilter) {
      const start =
        value.start.year + "-" + value.start.month + "-" + value.start.day;
      const end = value.end.year + "-" + value.end.month + "-" + value.end.day;
      fetchListProjectByCustomerAndDate(selectedCustomerFilter, start, end);
    }
  }
  const clearFilters = () => {
    setSelectedCustomerFilter(undefined);
    setDateFilter(undefined);
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <Dropdown backdrop="blur">
        <DropdownTrigger className="w-full">
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
            selectedCustomerFilter
              ? new Set([selectedCustomerFilter])
              : undefined
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
      {selectedCustomerFilter && (
        <>
          <I18nProvider locale="pt-BR">
            <DateRangePicker
              size="sm"
              label="Período"
              variant="bordered"
              className="max-w-[260px] bg-white rounded-xl text-black"
              visibleMonths={2}
              value={dateFilter}
              onChange={changeDate}
              classNames={{
                segment: 'text-black',
                label: 'text-black',
                selectorButton: 'text-black',
                selectorIcon: 'text-black',
              
              }}
            />
          </I18nProvider> 
          <div className="w-[150px]">
            <Button
              onClick={clearFilters}
              className="bg-red-500 text-white flex items-center w-full"
            >
              Limpar Filtros <AiOutlineClose className="ml-1" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
