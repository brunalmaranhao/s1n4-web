import { MdDisabledVisible, MdMoreHoriz, MdMoreVert } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type CardProjectProps = {
  project: IProject;
};

export default function CardProject({ project }: CardProjectProps) {
  function formatTimeAgo(date: Date): string {
    console.log(date);
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ptBR,
    });
  }
  return (
    <div
      key={project.id}
      className="bg-white dark:bg-[#1E1E1E] p-2 my-2 flex flex-col gap-1 rounded-md text-black"
      draggable
    >
      <div className="flex flex-row justify-between text-black">
        <p className="text-xs text-[#000] dark:text-white">
          {project.customer.corporateName}
        </p>
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
    </div>
  );
}
