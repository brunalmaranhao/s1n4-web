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
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Menu() {
  const { handleSignOut } = useAuthContext();

  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <Navbar
      isBordered={true}
      className="bg-white dark:bg-[#1E1E1E] w-[256px] h-screen md:flex hidden"
      classNames={{
        base: "bg-red-400",
        wrapper: "h-screen w-full flex flex-col justify-start mt-[65px]",
      }}
    >
      <Image
        src="/sinalogo.svg"
        alt="logo"
        width={84}
        height={25}
        className="mb-4"
      />

      <NavbarContent className="flex flex-col w-full gap-0">
        <NavbarItem isActive className="w-full">
          <Link
            href="/admin"
            aria-current="page"
            className={`border-solid border border-[#F2F4F8] dark:border-[#616262] rounded-t-small space-x-2 text-[#21272A] dark:text-white text-[16px] font-medium ${
              pathname === "/admin"
                ? "bg-[#F57B00]"
                : "bg-white dark:bg-[#1E1E1E]"
            } flex items-center py-3 px-4`}
          >
            <Image
              src={pathname === "/admin" ? "/homeselected.svg" : "/home.svg"}
              alt="homeicon"
            />
            <h1>Home</h1>
          </Link>
        </NavbarItem>
        <NavbarItem className="w-full">
          <Link
            color="foreground"
            href="/admin/dashboard"
            className={`border-solid border border-[#F2F4F8] dark:border-[#616262] space-x-2 text-[#21272A] dark:text-white text-[16px] font-medium ${
              pathname === "/admin/dashboard"
                ? "bg-[#F57B00]"
                : "bg-white dark:bg-[#1E1E1E]"
            } flex items-center py-3 px-4`}
          >
            <Image
              src={
                pathname === "/admin/dashboard"
                  ? "/selecteddashboard.svg"
                  : "/dashboard.svg"
              }
              alt="homeicon"
            />
            <h1>Dashboard</h1>
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem className="w-full">
            <DropdownTrigger>
              <Link
                className={`border-solid border border-[#F2F4F8] dark:border-[#616262] space-x-2 text-[#21272A] dark:text-white text-[16px] font-medium ${
                  pathname.includes("/admin/management")
                    ? "bg-[#F57B00]"
                    : "bg-white dark:bg-[#1E1E1E]"
                } flex items-center py-3 px-4`}
                color="foreground"
              >
                <Image
                  src={
                    pathname.includes("/admin/management")
                      ? "/settingsselected.svg"
                      : "/settings.svg"
                  }
                  alt="homeicon"
                />
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
            className={`border-solid border border-[#F2F4F8] dark:border-[#616262] rounded-b-small space-x-2 text-[#21272A] dark:text-white text-[16px] font-medium ${
              pathname === "/admin/my-account"
                ? "bg-[#F57B00]"
                : "bg-white dark:bg-[#1E1E1E]"
            } flex items-center py-3 px-4`}
            color="foreground"
            href="/admin/my-account"
          >
            <Image
              src={
                pathname === "/admin/my-account"
                  ? "/selectedmyaccount.svg"
                  : "/myaccount.svg"
              }
              alt="homeicon"
            />
            <h1>Minha conta</h1>
          </Link>
        </NavbarItem>
        <Button
          as={Link}
          onPress={handleSignOut}
          color={theme === "dark" ? "default" : "primary"}
          href="#"
          variant="flat"
          className="w-full mt-4"
        >
          Sair
        </Button>
         
      </NavbarContent>
    </Navbar>
  );
}
