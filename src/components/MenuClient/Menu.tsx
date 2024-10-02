"use client";
import { useAuthContext } from "@/context/AuthContext";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Image,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

export default function MenuClient() {
  const { handleSignOut } = useAuthContext();

  return (
    <Navbar
      isBordered={true}
      className="bg-white w-[256px] h-screen md:flex hidden"
      classNames={{
        base: "bg-red-400",
        wrapper: "h-screen w-full flex flex-col justify-start mt-[65px]",
      }}
    >
      <NavbarContent className="flex flex-col gap-2 max-h-[125px] w-full">
        <NavbarItem isActive className="w-full">
          <Link
            href="/customer"
            aria-current="page"
            className="space-x-2 text-[#21272A] text-[16px] font-medium"
          >
            <Image src="/home.svg" alt="homeicon" />
            <h1>Home</h1>
          </Link>
        </NavbarItem>
        <NavbarItem className="w-full">
          <Link
            color="foreground"
            href="/customer/dashboard/projects"
            className="space-x-2 text-[#21272A] text-[16px] font-medium "
          >
            <Image src="/folders.svg" alt="homeicon" />
            <h1>Dashboard</h1>
          </Link>
        </NavbarItem>

        <NavbarItem className="w-full">
          <Link
            className="space-x-2 text-[#21272A] text-[16px] font-medium"
            color="foreground"
            href="#"
          >
            <Image src="/users.svg" alt="homeicon" />
            <h1>Minha conta</h1>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex flex-colf max-h-10 mt-6 w-full">
        <NavbarItem>
          <Button
            as={Link}
            onPress={handleSignOut}
            color="primary"
            href="#"
            variant="flat"
            className="w-full"
          >
            Sair
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
