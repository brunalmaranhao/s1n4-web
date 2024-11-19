import { useFinancialContext } from "@/context/FinancialContext";
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
import { AiOutlineClose } from "react-icons/ai";

export default function FilterBudgetExpenseByCustomerOrProject() {
  const { customers, fetchCustomer, fetchProjectsByCustomer, projects } =
    useProjectContext();

  const {
    setFilteredCustomerId,
    setFilteredProjectId,
    fetchBudgetExpenses,
    page,
    fetchBudgetExpensesByCustomer,
    fetchBudgetExpensesByProject,
    filteredCustomerId,   
    fetchAllBudgetExpensesBalance,
    fetchBudgetExpensesBalanceByCustomer,
    fetchBudgetExpensesBalanceByProject,
    setSelectedKeysCustomer,
    setSelectedKeysProject,
    selectedKeysCustomer,
    selectedKeysProject,
    clearFilters
  } = useFinancialContext();

  useEffect(() => {
    const selectedId = Array.from(selectedKeysCustomer)[0];
    if (selectedId) {
      fetchProjectsByCustomer(selectedId);
      setFilteredCustomerId(selectedId);
      fetchBudgetExpensesByCustomer(selectedId);
      fetchBudgetExpensesBalanceByCustomer(selectedId)
      return;
    }
    setFilteredCustomerId(undefined);
    fetchBudgetExpenses(page);
    fetchAllBudgetExpensesBalance()
  }, [selectedKeysCustomer]);

  useEffect(() => {
    const selectedIdCustomer = Array.from(selectedKeysCustomer)[0];
    const selectedIdProject = Array.from(selectedKeysProject)[0];
    if (selectedIdProject) {
      setFilteredProjectId(selectedIdProject);
      fetchBudgetExpensesByProject(selectedIdProject);
      fetchBudgetExpensesBalanceByProject(selectedIdProject)
      return;
    } else if (selectedIdCustomer) {
      setFilteredCustomerId(selectedIdCustomer);
      fetchBudgetExpensesByCustomer(selectedIdCustomer);
      fetchBudgetExpensesBalanceByCustomer(selectedIdCustomer)
      return;
    }
    setFilteredProjectId(undefined);
  }, [selectedKeysProject, selectedKeysCustomer]);

  const selectedValueCustomer = useMemo(() => {
    if (selectedKeysCustomer.size > 0) {
      const selectedId = Array.from(selectedKeysCustomer)[0];
      const selectedCustomer = customers.find((item) => item.id === selectedId);
      return selectedCustomer?.corporateName || "Cliente";
    }
    return "Cliente";
  }, [selectedKeysCustomer, customers]);

  const selectedValueProject = useMemo(() => {
    if (selectedKeysProject.size > 0) {
      const selectedId = Array.from(selectedKeysProject)[0];
      const selectedProject = projects.find((item) => item.id === selectedId);
      return selectedProject?.name || "Projeto";
    }
    return "Projeto";
  }, [selectedKeysProject, projects]);

  useEffect(() => {
    if (customers.length === 0) {
      fetchCustomer();
    }
  }, [customers, fetchCustomer]);

  const handleSelectionChangeCustomer = (keys: "all" | Set<React.Key>) => {
    setSelectedKeysCustomer(new Set(Array.from(keys) as string[]));
    setSelectedKeysProject(new Set());
  };

  const handleSelectionChangeProject = (keys: "all" | Set<React.Key>) => {
    setSelectedKeysProject(new Set(Array.from(keys) as string[]));
  };

  

  return (
    <div className="flex gap-3 items-center text-black">
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button
            className="bg-white text-[16px] font-medium text-black"
            endContent={<SlArrowDown />}
          >
            {selectedValueCustomer}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          selectionMode="single"
          selectedKeys={selectedKeysCustomer}
          onSelectionChange={handleSelectionChangeCustomer}
          variant="light"
          aria-label="Static Actions"
          className="max-h-[320px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-700 text-black"
        >
          {customers.map((item) => (
            <DropdownItem key={item.id} className="text-black dark:text-white">
              {item.corporateName}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {filteredCustomerId && (
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button
              className="bg-white text-[16px] font-medium text-black"
              endContent={<SlArrowDown />}
            >
              {selectedValueProject}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            selectionMode="single"
            selectedKeys={selectedKeysProject}
            onSelectionChange={handleSelectionChangeProject}
            variant="light"
            aria-label="Static Actions"
            className="max-h-[320px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-700"
          >
            {projects.map((item) => (
              <DropdownItem key={item.id} className="text-black dark:text-white">
                {item.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}

      {(filteredCustomerId || filteredCustomerId) && (
        <Button
          onClick={clearFilters}
          className="bg-red-500 text-white ml-2 flex items-center"
        >
          Limpar Filtros <AiOutlineClose className="ml-1" />
        </Button>
      )}
    </div>
  );
}
