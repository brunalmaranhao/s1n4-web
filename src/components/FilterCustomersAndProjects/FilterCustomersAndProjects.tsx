import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "@nextui-org/react";
import { SlArrowDown } from "react-icons/sl";
import { findAllCustomers } from "@/app/admin/dashboard/actions";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { fetchAllProjects } from "@/app/admin/actions";
import { SlEqualizer } from "react-icons/sl";
import { useCustomerContext } from "@/context/CustomerContext";

interface IFilterCustomersAndProjectsProps {
  onClientSelect: (client: ICustomer | undefined) => void;
}

export default function FilterCustomersAndProjects({
  onClientSelect,
}: IFilterCustomersAndProjectsProps) {
  const { "sina:x-token": sessionKey } = parseCookies();

  const [clientList, setClientList] = useState<ICustomer[]>([]);
  const [filteredClient, setFilteredClient] = useState<string>("");
  const { setCustomerBudgetBalance } = useCustomerContext();

  const handleClientList = async (token: string) => {
    const { customers } = await findAllCustomers(token);
    return customers;
  };

  const {
    setSelectedCustomerName,
    setShouldShowFirstCustomer,
    setIsClientSelected,
    setIsClientFilterActive,
  } = useCustomerContext();

  const handleClientFilter = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    client: ICustomer,
  ) => {
    const clientName = event.currentTarget.innerText;
    setFilteredClient(clientName);
    onClientSelect(client);
    setSelectedCustomerName(clientName);
    setShouldShowFirstCustomer(true);
    setIsClientSelected(true);
    setIsClientFilterActive(true);
  };

  const handleClearFilter = async () => {
    setFilteredClient("");
    onClientSelect(undefined);
    setSelectedCustomerName("");
    setShouldShowFirstCustomer(false);
    setIsClientSelected(false);
    setIsClientFilterActive(false);
    const customersList = await handleClientList(sessionKey);
    const firstActiveCustomer = customersList?.[0];
    if (firstActiveCustomer) {
      onClientSelect(firstActiveCustomer);
      setSelectedCustomerName(firstActiveCustomer.corporateName || "");
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      const customersList = await handleClientList(sessionKey);
      setClientList(customersList || []);
    };
    fetchClients();
  }, []);

  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center">
        <Tooltip content="Limpar Filtro" className="text-black dark:text-white">
          <Button className="bg-transparent" onClick={handleClearFilter}>
            <SlEqualizer size={25} />
          </Button>
        </Tooltip>
        <h1 className="text-nowrap font-medium text-black dark:text-white">
          Filtrar por{" "}
        </h1>
      </div>
      <Dropdown backdrop="blur" className="">
        <DropdownTrigger>
          <Button
            className="bg-white w-full text-[16px] font-medium text-black"
            endContent={<SlArrowDown />}
          >
            {filteredClient ? filteredClient : "Cliente"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {clientList.map((client, index) => (
            <DropdownItem
              onClick={(event) => handleClientFilter(event, client)}
              key={index}
              className="text-black dark:text-white"
            >
              {client.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
