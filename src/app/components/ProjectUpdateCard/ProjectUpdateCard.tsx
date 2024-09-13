import { getCustomerById, getProjectById } from "@/app/admin/actions";
import { Image } from "@nextui-org/react";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";

// const robotoMedium = Roboto({
//   weight: "400",
//   subsets: ["latin"],
// });

interface ProjectUpdateCardProps {
  email: string;
  role: string;
  projectId: string;
  key: number;
  acessToken: string;
  date: string;
  description: string;
}

export default function ProjectUpdateCard({
  email,
  role,
  projectId,
  key,
  acessToken,
  date,
  description,
}: ProjectUpdateCardProps) {
  const [projectNameState, setProjectNameState] = useState<string>("");
  const [customerNameState, setCustomerNameState] = useState<string>("");

  const handleProjectById = async (id: string, token: string) => {
    const result = await getProjectById(id, token);
    return result.project;
  };

  const handleCustomerById = async (id: string, token: string) => {
    const result = await getCustomerById(id, token);
    return result.customer;
  };

  const roleTranslations: { [key: string]: string } = {
    INTERNAL_MANAGEMENT: "Gestão Interna",
    INTERNAL_PARTNERS: "Parceiros Internos",
    INTERNAL_FINANCIAL_LEGAL: "Financeiro/Jurídico",
  };

  useEffect(() => {
    handleProjectById(projectId, acessToken).then((data) => {
      setProjectNameState(data?.name || "");
      handleCustomerById(data?.customerId || "", acessToken).then(
        (response) => {
          setCustomerNameState(response?.corporateName || "");
        },
      );
    });
  }, []);

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
            {projectNameState} - {customerNameState}
          </h1>
        </div>
        <h1>{date}</h1>
      </div>
      <h1>{description}</h1>
    </div>
  );
}
