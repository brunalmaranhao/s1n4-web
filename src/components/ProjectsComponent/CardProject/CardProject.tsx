import { MdVisibilityOff } from "react-icons/md";
import ActionsCardProject from "./ActionsCardProject/ActionsCardProject";
import { useProjectContext } from "@/context/ProjectContext";
import { Tooltip } from "@nextui-org/react";
import { formatTimeAgo } from "@/util/fomat-time-ago";

type CardProjectProps = {
  handleDragStart: (project: IProject) => void;
  project: IProject;
};

export default function CardProject({
  handleDragStart,
  project,
}: CardProjectProps) {
  const { setSelectedProjectEdit, onOpenModalProjectDetails } =
    useProjectContext();

  function handleOpenModalDetails() {
    setSelectedProjectEdit(project);
    onOpenModalProjectDetails();
  }
  console.log(project);

  return (
    <div
      key={project.id}
      className="bg-white dark:bg-[#1E1E1E] p-2 my-2 cursor-pointer flex flex-col gap-1 rounded-md text-black"
      draggable
      onDragStart={() => handleDragStart(project)}
      onClick={() => handleOpenModalDetails()}
    >
      <div className="flex flex-row justify-between items-start text-black">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 flex-wrap cursor-default">
            {project.tags.map((tag) => (
              <Tooltip
                key={tag.id}
                content={tag.name}
                className="text-black dark:text-white"
              >
                <div
                  className="w-[40px] h-[8px] rounded-lg"
                  style={{ backgroundColor: tag.color }}
                ></div>
              </Tooltip>
            ))}
          </div>
          <p className="text-xs text-[#000] dark:text-white">
            {project.customer.name}
          </p>
        </div>
        <ActionsCardProject project={project} />
      </div>
      <div className="flex flex-col">
        <p className="text-md text-[#000] dark:text-white truncate">
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
