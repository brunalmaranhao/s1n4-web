import React from "react";
import type { Metadata } from "next";
import HeaderDashboardCustomer from "@/components/HeaderDashboardCustomer/HeaderDashboardCustomer";

export const metadata: Metadata = {
  title: "Gerenciar",
  description: "Grupo Sina",
};

export default function CustomerDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center w-full">
      <div className={`px-10 w-full`}>
        <HeaderDashboardCustomer />
        <div>{children}</div>
      </div>
    </main>
  );
}
