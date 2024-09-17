import Menu from "@/components/Menu/Menu";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";

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
    <div className="flex flex-row w-full bg-[#F2F4F8]">
      <Menu />

      {children}
    </div>
  );
}
