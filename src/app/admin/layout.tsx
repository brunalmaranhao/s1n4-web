import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";

import Header from "@/components/Header/Header";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Grupo Sina - Admin",
  description: "Grupo Sina",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F2F4F8] h-full w-full flex items-center">
      <Header />
      <div className="flex w-full min-h-screen">{children}</div>
    </div>
  );
}
