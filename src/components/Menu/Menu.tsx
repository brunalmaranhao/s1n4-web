
"use client";
import { useAppContext } from "@/context/AppConext";
import { useAuthContext } from "@/context/AuthContext";
import {
  Button,
  Link,
  Image,
  Navbar,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { RiExpandLeftFill } from "react-icons/ri";

export default function Menu() {
  const { handleSignOut } = useAuthContext();
  const { isExpanded, setIsExpanded } = useAppContext();

  const { theme } = useTheme();
  const pathname = usePathname();

  const menuItems = [
    {
      pathnames: ["/admin"],
      link: "/admin",
      label: "Home",
      iconSelected: "/homeselected.svg",
      icon: "/home.svg",
    },
    {
      pathnames: ["/admin/dashboard"],
      link: "/admin/dashboard",
      label: "Dashboard",
      iconSelected: "/selecteddashboard.svg",
      icon: "/dashboard.svg",
    },
    {
      pathnames: [
        "/admin/management/customers",
        "/admin/management/reports",
        "/admin/management/financial",
      ],
      link: "/admin/management/customers",
      label: "Gerenciar",
      iconSelected: "/settingsselected.svg",
      icon: "/settings.svg",
    },
    {
      pathnames: ["/admin/my-account"],
      link: "/admin/my-account",
      label: "Minha conta",
      iconSelected: "/selectedmyaccount.svg",
      icon: "/myaccount.svg",
    },
  ];

  return (
    <Navbar
      isBordered={true}
      className={`bg-white dark:bg-[#1E1E1E] ${
        isExpanded ? "w-[256px]" : "w-[64px]"
      } h-screen md:flex hidden transition-all duration-300`}
      classNames={{
        base: "bg-red-400",
        wrapper: "h-screen w-full flex flex-col justify-start mt-[65px]",
      }}
    >
      <div
        className={`${
          !isExpanded && "pr-3"
        } flex justify-end min-w-[64px] w-full`}
      >
        <RiExpandLeftFill
          onClick={() => setIsExpanded(!isExpanded)}
          className={`"text-[24px]  cursor-pointer dark:text-white text-black transition-transform duration-300 ${
            isExpanded ? "rotate-0 mr-3" : "rotate-180"
          }`}
        />
      </div>
      {isExpanded && (
        <Image
          src="/sinalogo.svg"
          alt="logo"
          width={84}
          height={25}
          className="mb-4"
        />
      )}

      <NavbarContent
        className={`flex flex-col w-full ${isExpanded ? "gap-0" : "gap-2"} `}
      >
        {menuItems.map((menuItem, index) => (
          <NavbarItem isActive className="w-full" key={index}>
            {isExpanded ? (
              <Link
                href={menuItem.link}
                aria-current="page"
                className={`border-solid border border-[#F2F4F8] dark:border-[#616262] ${
                  index === 0 && "rounded-t-small"
                } space-x-2 text-[#21272A] dark:text-white text-[16px] font-medium ${
                  menuItem.pathnames.some((path) => path === pathname)
                    ? "bg-[#F57B00]"
                    : "bg-white dark:bg-[#1E1E1E]"
                } flex items-center py-3 px-4`}
              >
                <Image
                  src={
                    menuItem.pathnames.includes(pathname)
                      ? menuItem.iconSelected
                      : menuItem.icon
                  }
                  alt="menu-icon"
                />
                <h1>{menuItem.label}</h1>
              </Link>
            ) : (
              <div className="flex flex-col items-center">
                <Tooltip
                  content={menuItem.label}
                  placement="right-end"
                  className="dark:text-white text-black"
                >
                  <Link
                    href={menuItem.link}
                    aria-current="page"
                    className={`border-solid border border-[#F2F4F8] dark:border-[#616262] ${
                      index === 0 && "rounded-t-small"
                    } text-[#21272A] dark:text-white text-[16px] font-medium ${
                      menuItem.pathnames.includes(pathname)
                        ? "bg-[#F57B00]"
                        : "bg-white dark:bg-[#1E1E1E]"
                    } flex items-center justify-center w-[50px] py-2`}
                  >
                    <Image
                      src={
                        menuItem.pathnames.includes(pathname)
                          ? menuItem.iconSelected
                          : menuItem.icon
                      }
                      alt="menu-icon"
                    />
                  </Link>
                </Tooltip>
              </div>
            )}
          </NavbarItem>
        ))}

        {isExpanded ? (
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
        ) : (
          <Tooltip
            content="Sair"
            placement="right-end"
            offset={-8}
            className="dark:text-white text-black"
          >
            <Button
              as={Link}
              onPress={handleSignOut}
              color={theme === "dark" ? "default" : "primary"}
              href="#"
              variant="flat"
              className="w-[50px] mt-4 bg-transparent min-w-[0] dark:text-white text-[#F57B00]"
            >
              <MdLogout className="w-[50px] text-[24px]" />
            </Button>
          </Tooltip>
        )}
      </NavbarContent>
    </Navbar>
  );
}
