import { getCustomerById, getProjectById } from "@/app/admin/actions";
import { useEffect, useState } from "react";

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
    <div key={key} className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <h1>{email}</h1>
        <h1>{role}</h1>
        <h1>
          {projectNameState} - {customerNameState}
        </h1>
        <h1>{date}</h1>
      </div>
      <h1>{description}</h1>
    </div>
  );
}
