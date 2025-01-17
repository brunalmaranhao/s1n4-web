import { useProjectContext } from "@/context/ProjectContext";
import ProjectUpdatesService from "@/services/models/project-updates";
import { formatTimeAgo } from "@/util/fomat-time-ago";
import { useEffect, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import Comments from "./Comments/Comments";
import ReactionService from "@/services/models/reactions";
import EmojiPicker from "@/components/EmojiPicker/EmojiPicker";
import Reactions from "@/components/Reactions/Reactions";

type ProjectUpdateOriginNotificationProps = {
  project: IProject;
};

export default function ProjectUpdateOriginNotification({
  project,
}: ProjectUpdateOriginNotificationProps) {
  const [projectUpdates, setProjectUpdates] = useState<IProjectUpdates[]>([]);
  const [isLoadingProjectUpdates, setIsLoadingProjectUpdates] = useState(true);

  useEffect(() => {
    fetchProjectUpdates();
  }, [project]);

  async function fetchProjectUpdates() {
    if (project) {
      setIsLoadingProjectUpdates(true);
      try {
        const { fetchProjectProjectUpdates } = await ProjectUpdatesService();
        const response = await fetchProjectProjectUpdates(project.id);
        setProjectUpdates(response.updates);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingProjectUpdates(false);
      }
    }
  }

  async function createReaction(emoji: string, projectUpdateId: string) {
    setIsLoadingProjectUpdates(true);
    try {
      const { createReactionProjectUpdate } = await ReactionService();
      await createReactionProjectUpdate(projectUpdateId, emoji);
      fetchProjectUpdates();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingProjectUpdates(false);
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
            <p
              className="text-[16px] font-normal my-1 w-full overflow-auto [&::-webkit-scrollbar]:h-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
              {projectUpdate.description}
            </p>
          </div>
          <div className="flex text-[12px] gap-[6px] items-center mt-1">
            <EmojiPicker
              onSelectEmoji={(emoji) => {
                createReaction(emoji, projectUpdate.id);
              }}
            />
            <Reactions
              reactions={projectUpdate.reactions}
              fetchProjectUpdates={fetchProjectUpdates}
            />
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
