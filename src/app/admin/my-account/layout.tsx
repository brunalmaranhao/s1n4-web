import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minha conta - Grupo Sina",
  description: "Grupo Sina",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full">{children}</div>
    </div>
  );
}
