import {
  MdDisabledVisible,
  MdMoreHoriz,
  MdMoreVert,
  MdVisibilityOff,
} from "react-icons/md";
import ActionsCardProject from "./ActionsCardProject/ActionsCardProject";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type CardProjectProps = {
  handleDragStart: (project: IProject) => void;
  project: IProject;
};

export default function CardProject({
  handleDragStart,
  project,
}: CardProjectProps) {
  function formatTimeAgo(date: Date): string {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ptBR,
    });
  }
  return (
    <div
      key={project.id}
      className="bg-white dark:bg-[#1E1E1E] p-2 my-2 cursor-grab flex flex-col gap-1 rounded-md text-black"
      draggable
      onDragStart={() => handleDragStart(project)}
    >
      <div className="flex flex-row justify-between text-black">
        <p className="text-xs text-[#000] dark:text-white">
          {project.customer.corporateName}
        </p>
        <ActionsCardProject project={project} />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-md text-[#000] dark:text-white truncate max-w-[120px]">
          {project.name}
        </p>
        <small className="text-[#697077] text-tiny">
          {project.updatedListProjectAt &&
            formatTimeAgo(new Date(project.updatedListProjectAt))}
        </small>
      </div>
      <div className="flex w-full justify-end">
        {!project.shouldShowInformationsToCustomerUser && (
          <MdVisibilityOff className="text-xs text-[#697077]" />
        )}
      </div>
    </div>
  );
}
