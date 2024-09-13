import { MdMoreHoriz, MdMoreVert } from "react-icons/md";
import ActionsCardProject from "./ActionsCardProject/ActionsCardProject";

type CardProjectProps = {
  handleDragStart: (project: IProject) => void;
  project: IProject;
};

export default function CardProject({
  handleDragStart,
  project,
}: CardProjectProps) {
  return (
    <div
      key={project.id}
      className="bg-slate-900 text-white p-2 my-2 cursor-grab flex flex-col gap-1 rounded-md"
      draggable
      onDragStart={() => handleDragStart(project)}
    >
      <div className="flex flex-row justify-between">
        <p className="text-xs">{project.customer.corporateName}</p>
        <ActionsCardProject project={project} />
      </div>
      <p className="text-md">{project.name}</p>
    </div>
  );
}
