import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  DatePicker,
} from "@nextui-org/react";
import { SlArrowDown } from "react-icons/sl";
import { GoArrowRight } from "react-icons/go";

export default function FilterCustomersAndProjects() {
  return (
    <div className="flex items-center space-x-6">
      <h1 className="text-nowrap font-medium">Filtrar por </h1>
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="bg-white w-full text-[16px] font-medium"
            endContent={<SlArrowDown />}
          >
            Cliente
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem className="text-black">
            Lista de clientes aqui
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="bg-white w-full text-[16px] font-medium"
            endContent={<SlArrowDown />}
          >
            Projeto
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem className="text-black">
            Lista de projetos aqui
          </DropdownItem>
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
