import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";

import MenuClient from "@/components/MenuClient/Menu";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Grupo Sina",
  description: "Grupo Sina",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F2F4F8] dark:bg-[#000] w-full flex">
      <MenuClient />
      <div className="flex w-full min-h-screen">{children}</div>
    </div>
  );
}
