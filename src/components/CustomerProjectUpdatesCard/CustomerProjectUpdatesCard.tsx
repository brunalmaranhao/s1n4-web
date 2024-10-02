import { Image } from "@nextui-org/react";
import { format } from "date-fns";

interface ProjectUpdateCardProps {
  email: string;
  role: string;
  projectUpdate: IProjectUpdates;
  key: number;
}

export default function CustomerProjectUpdatesCard({
  email,
  role,
  projectUpdate,
  key,
}: ProjectUpdateCardProps) {
  const roleTranslations: { [key: string]: string } = {
    CLIENT_RESPONSIBLE: "Responsável",
    CLIENT_OWNER: "Cliente",
    CLIENT_USER: "Usuário",
  };

  // console.log(projectUpdate);

  return (
    <div key={key} className="flex flex-col space-y-2 mb-4">
      <div className={`flex space-x-2 items-center justify-between`}>
        <div className="flex">
          <h1 className="text-[16px] font-normal text-[#21272A] underline">
            {email}
          </h1>
          <div className="flex space-x-5 pl-4">
            <Image src="/divider.svg" alt="divider icon" />
            <Image src="/roleicon.svg" alt="role icon" />
          </div>
          <h1 className="text-[16px] text-[#697077] font-normal">
            {roleTranslations[role]}
          </h1>
          <div className="flex mx-4 space-x-4">
            <Image src="/rightarrow.svg" alt="right icon" />
            <Image src="/projecticon.svg" alt="project icon" />
          </div>

          <h1 className="text-[16px] text-[#697077] font-normal">
            {projectUpdate.project?.name} -{" "}
            {projectUpdate.project?.customer.corporateName}
          </h1>
        </div>
        <h1>{format(projectUpdate.date, "dd/MM/yyyy 'às' HH:mm")}</h1>
      </div>
      <h1>{projectUpdate.description}</h1>
    </div>
  );
}
