import { useProjectContext } from "@/context/ProjectContext";
import ProjectUpdatesService from "@/services/models/project-updates";
import { formatTimeAgo } from "@/util/fomat-time-ago";
import { useEffect, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import Comments from "./Comments/Comments";

export default function ProjectUpdateComponentCustomer() {
  const [projectUpdates, setProjectUpdates] = useState<IProjectUpdates[]>([]);
  const [isLoadingProjectUpdates, setIsLoadingProjectUpdates] = useState(true);


  const { selectedProjectEdit } = useProjectContext();

  useEffect(() => {
    fetchProjectUpdates();
  }, [selectedProjectEdit]);

  async function fetchProjectUpdates() {
    if (selectedProjectEdit) {
      setIsLoadingProjectUpdates(true);
      try {
        const { fetchProjectProjectUpdates } = await ProjectUpdatesService();
        const response = await fetchProjectProjectUpdates(
          selectedProjectEdit.id
        );
        setProjectUpdates(response.updates);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingProjectUpdates(false);
      }
    }
  }


  return (
    <div className="text-black dark:text-white">
      {projectUpdates.length === 0 && !isLoadingProjectUpdates && (
        <p>Ainda não existem atualizações do projeto.</p>
      )}
      {/* Project Updates */}
      {projectUpdates.map((projectUpdate) => (
        <div className="flex flex-col mb-4" key={projectUpdate.id}>
          <div className="flex items-center gap-4">
            <p className="text-[18px] font-semibold">
              {projectUpdate.user.firstName + " " + projectUpdate.user.lastName}
            </p>
            <div className="flex items-center gap-2 text-[16px] font-normal">
              <MdOutlineAccessTime className="text-[#F57B00]" />
              {projectUpdate && formatTimeAgo(new Date(projectUpdate.date))}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-[16px] font-normal my-1">
              {projectUpdate.description}
            </p>
          </div>
          {/* Comments */}
          <div className="my-2">
            <Comments
              comments={projectUpdate.comments}
              projectUpdateId={projectUpdate.id}
              fetchProjectUpdates={fetchProjectUpdates}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
