import { MdDisabledVisible, MdMoreHoriz, MdMoreVert } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Tooltip } from "@nextui-org/react";
import { useProjectContext } from "@/context/ProjectContext";

type CardProjectProps = {
  project: IProject;
};

export default function CardProject({ project }: CardProjectProps) {
  const { setSelectedProjectEdit, onOpenModalProjectDetails } =
    useProjectContext();
  function formatTimeAgo(date: Date): string {
    console.log(date);
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ptBR,
    });
  }

  function handleOpenModalDetails() {
    setSelectedProjectEdit(project);
    onOpenModalProjectDetails();
  }
  return (
    <div
      key={project.id}
      className="bg-white cursor-pointer dark:bg-[#1E1E1E] p-2 my-2 flex flex-col gap-1 rounded-md text-black"
      onClick={() => handleOpenModalDetails()}
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap cursor-default">
          {project?.tags?.map((tag) => (
            <Tooltip content={tag.name} className="text-black dark:text-white">
              <div
                key={tag.id}
                className="w-[40px] h-[8px] rounded-lg text-black dark:text-white"
                style={{ backgroundColor: tag.color }}
              ></div>
            </Tooltip>
          ))}
        </div>
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
