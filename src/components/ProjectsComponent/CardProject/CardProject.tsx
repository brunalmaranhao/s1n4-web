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
      className="bg-white p-2 my-2 cursor-grab flex flex-col gap-1 rounded-md text-black"
      draggable
      onDragStart={() => handleDragStart(project)}
    >
      <div className="flex flex-row justify-between text-black">
        <p className="text-xs">{project.customer.corporateName}</p>
        <ActionsCardProject project={project} />
      </div>
      <p className="text-md">{project.name}</p>
    </div>
  );
}
