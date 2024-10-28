import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  DatePicker,
  Tooltip,
} from "@nextui-org/react";
import { SlArrowDown } from "react-icons/sl";
import { GoArrowRight } from "react-icons/go";
import { findAllCustomers } from "@/app/admin/dashboard/actions";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { fetchAllProjects } from "@/app/admin/actions";
import { SlEqualizer } from "react-icons/sl";

interface IFilterCustomersAndProjectsProps {
  onClientSelect: (client: ICustomer | undefined) => void;
}

export default function FilterCustomersAndProjects({
  onClientSelect,
}: IFilterCustomersAndProjectsProps) {
  const { "sina:x-token": sessionKey } = parseCookies();

  const [clientList, setClientList] = useState<ICustomer[]>([]);
  const [projectsList, setProjectslist] = useState<IProject[]>([]);
  const [filteredClient, setFilteredClient] = useState<string>("");
  const [filteredProject, setFilteredProject] = useState<string>("");

  const handleClientList = async (token: string) => {
    const { customers } = await findAllCustomers(token);
    return customers;
  };

  const handleProjectsList = async (token: string) => {
    const { projects } = await fetchAllProjects(token);
    return projects;
  };

  const handleClientFilter = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    client: ICustomer,
  ) => {
    const clientName = event.currentTarget.innerText;
    setFilteredClient(clientName);
    onClientSelect(client);
  };

  const handleProjectsFilter = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const projectName = event.currentTarget.innerText;
    setFilteredProject(projectName);
  };

  const handleClearFilter = () => {
    setFilteredClient("");
    setFilteredProject("");
    onClientSelect(undefined);
  };

  useEffect(() => {
    const fetchClients = async () => {
      const customersList = await handleClientList(sessionKey);
      setClientList(customersList || []);
      const projectsList = await handleProjectsList(sessionKey);
      setProjectslist(projectsList || []);
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
              {client.corporateName}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button
            className="bg-white w-full text-[16px] font-medium text-black"
            endContent={<SlArrowDown />}
          >
            {filteredProject ? filteredProject : "Projetos"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {projectsList.map((project, index) => (
            <DropdownItem
              onClick={(event) => handleProjectsFilter(event)}
              key={index}
              className="text-black dark:text-white"
            >
              {project.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <DatePicker
        variant="flat"
        size="lg"
        label="Start date"
        labelPlacement="inside"
      />
      <GoArrowRight size={150} />
      <DatePicker size="lg" label="End date" labelPlacement="inside" />
    </div>
  );
}
