import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Redefinir senha - Grupo Sina",
  description: "Grupo Sina",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex w-full min-h-screen">{children}</div>
    </div>
  );
}
