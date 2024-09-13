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

export default function Header() {
  const { handleSignOut } = useAuthContext();

  return (
    <Navbar
      isBordered={true}
      className="bg-white w-[256px] min-h-screen"
      classNames={{
        base: "bg-red-400",
        wrapper: "h-screen w-full flex flex-col justify-start mt-[65px]",
      }}
    >
      <NavbarContent className="flex flex-col gap-2 max-h-[125px] w-full">
        <NavbarItem isActive className="w-full">
          <Link
            href="/admin"
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
            href="/admin/dashboard"
            className="space-x-2 text-[#21272A] text-[16px] font-medium "
          >
            <Image src="/folders.svg" alt="homeicon" />
            <h1>Dashboard</h1>
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem className="w-full">
            <DropdownTrigger>
              <Link
                className="space-x-2 text-[#21272A] text-[16px] font-medium"
                color="foreground"
              >
                <Image src="/tags.svg" alt="homeicon" />
                <h1>Gerenciar</h1>
              </Link>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Manage projects and customers"
            className="w-[240px]"
            itemClasses={{
              base: "gap-4 text-black text-bold text-[24px]",
            }}
          >
            <DropdownItem
              key="gerenciar clientes"
              description="Manage customers here."
            >
              <Link href="/admin/management/customers">Gerenciar clientes</Link>
            </DropdownItem>
            <DropdownItem
              key="gerenciar projetos"
              description="Manage projects here."
            >
              <Link href="/admin/management/projects">Gerenciar Projetos</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
