import { DragEvent } from "react";
import CardProject from "../CardProject/CardProject";

type CardStatusProps = {
  projects?: IProject[];
  status: StatusProject;
};

export default function CardStatus({ projects, status }: CardStatusProps) {
  const labelStatus = [
    {
      key: "WAITING",
      label: "A fazer",
    },
    {
      key: "IN_PROGRESS",
      label: "Em andamento",
    },
    {
      key: "DONE",
      label: "Finalizado",
    },
  ];
  const label = labelStatus.find((item) => item.key === status);

  return (
    <div
      className={`${label?.key === "WAITING" ? "bg-[#F57B00]" : ""} ${
        label?.key === "IN_PROGRESS" ? "bg-[#F57B00]" : ""
      } ${
        label?.key === "DONE" ? "bg-[#23CF5C]" : ""
      } text-black p-4 max-w-[520px] w-full rounded-md min-h-[100px] `}
    >
      <p>{label?.label}</p>
      <div className="flex flex-col gap-1">
        {projects?.map((project, index) => (
          <CardProject key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
