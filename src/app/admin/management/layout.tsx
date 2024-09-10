import React from "react";
import type { Metadata } from "next";
import HeaderManagement from "@/components/HeaderManagement/HeaderManagement";

export const metadata: Metadata = {
  title: "Gerenciar",
  description: "Grupo Sina",
};

export default function ManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col justify-center items-center">
    <div className={`xl:max-w-[1200px] w-full`}>
      <HeaderManagement />
      <div>{children}</div>
    </div>
    </main>
  );
}
