import { Image } from "@nextui-org/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ProjectUpdateCardProps {
  email: string;
  role: string;
  projectUpdate: IProjectUpdatesState;
  key: number;
  isLast: boolean;
}

export default function ProjectUpdateCard({
  email,
  role,
  projectUpdate,
  key,
  isLast,
}: ProjectUpdateCardProps) {
  const roleTranslations: { [key: string]: string } = {
    INTERNAL_MANAGEMENT: "Gestão Interna",
    INTERNAL_PARTNERS: "Parceiros Internos",
    INTERNAL_FINANCIAL_LEGAL: "Financeiro/Jurídico",
  };
  console.log(isLast);

  return (
    <div key={key} className="flex flex-col space-y-2 mb-4">
      <div className={`flex space-x-2 items-center justify-between`}>
        <div className="flex">
          <h1 className="text-[16px] font-normal text-[#21272A] dark:text-white underline">
            {email}
          </h1>
          <div className="flex space-x-5 pl-4 mr-2 items-center">
            <Image src="/divider.svg" alt="divider icon" />
            <Image src="/roleicon.svg" alt="role icon" />
          </div>
          <h1 className="text-[16px] text-[#697077] dark:text-white font-normal">
            {roleTranslations[role]}
          </h1>
          <div className="flex mx-4 space-x-4">
            <Image src="/rightarrow.svg" alt="right icon" />
            <Image src="/projecticon.svg" alt="project icon" />
          </div>

          <h1 className="text-[16px] text-[#697077] dark:text-white font-normal">
            {projectUpdate.project.name} - {projectUpdate.project.customer.name}
          </h1>
        </div>
        <div className="flex space-x-2">
          <Image src="/access_time.svg" alt="date icon" />
          <h1 className="text-black dark:text-white">
            {format(projectUpdate.date, "d MMMM", { locale: ptBR })}
          </h1>
        </div>
      </div>
      <h1 className="text-black dark:text-white py-2">
        "{projectUpdate.description}"
      </h1>
      {isLast ? null : <hr className="border-[#878D9633]" />}
    </div>
  );
}
