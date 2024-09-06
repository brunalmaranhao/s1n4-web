"use client";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import FilterProjectsByCustomer from "../FilterProjectsByCustomer/FilterProjectsByCustomer";
import Notification from "../Notification/Notification";
import TabsManagement from "./TabsManagement/TabsManagement";

export default function HeaderManagement() {
  const { push } = useRouter();
  const pathsWithTab = [
    "/admin/management/customers",
    "/admin/management/projects",
  ];
  const pathname = usePathname();
  const label = pathname.startsWith("/admin/management/customers")
    ? "Clientes"
    : "Projetos";
  return (
    <div className="flex flex-col w-full px-4 py-8 gap-6">
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-3xl">Gerenciar - {label} </h1>
        <Notification />
      </div>
      <div className="flex flex-row justify-between w-full flex-wrap gap-6">
        {pathsWithTab.includes(pathname) && <TabsManagement />}

        {label === "Clientes" && pathsWithTab.includes(pathname) && (
          <div>
            <Button
              color="primary"
              onPress={() => push("/admin/management/customers/new")}
            >
              Novo Cliente
            </Button>
          </div>
        )}
        {label === "Projetos" && pathsWithTab.includes(pathname) && (
          <div className="flex flex-row gap-3 items-center flex-wrap">
            <h4>Filtrar por</h4>
            <FilterProjectsByCustomer />
            <Button color="primary">Novo Projeto</Button>
          </div>
        )}
      </div>
    </div>
  );
}
