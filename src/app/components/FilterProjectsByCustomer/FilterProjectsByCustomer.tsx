import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export default function FilterProjectsByCustomer() {
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button variant="flat" className="bg-[#fff]">
          Cliente
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Static Actions">
        <DropdownItem key="delete" className="text-black">
          Cliente 1
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
