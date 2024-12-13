import { DragEvent } from "react";
import CardProject from "../CardProject/CardProject";

type CardStatusProps = {
  handleDrop: (status: StatusProject) => void;
  allowDrop: (event: DragEvent<HTMLDivElement>) => void;
  projects?: IProject[];
  handleDragStart: (project: IProject) => void;
  status: StatusProject;
  handleDragEnter: (
    event: DragEvent<HTMLDivElement>,
    value: StatusProject,
  ) => void;
  handleDragLeave: (event: DragEvent<HTMLDivElement>) => void;
  highlightedColumn: StatusProject | null;
};

export default function CardStatus({
  handleDrop,
  allowDrop,
  projects,
  status,
  handleDragStart,
  handleDragEnter,
  handleDragLeave,
  highlightedColumn,
}: CardStatusProps) {
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
      } text-black p-4 max-w-[520px] w-full rounded-md min-h-[100px] ${
        highlightedColumn === status ? "border-4 border-white" : ""
      }`}
      onDrop={() => handleDrop(status)}
      onDragOver={allowDrop}
      onDragEnter={(e) => handleDragEnter(e, status)}
      onDragLeave={handleDragLeave}
    >
      <p className="text-white">{label?.label}</p>
      <div className="flex flex-col gap-1">
        {projects?.map((project, index) => (
          <CardProject
            key={index}
            handleDragStart={handleDragStart}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}
