import { useAuthContext } from "@/context/AuthContext";
import ReactionService from "@/services/models/reactions";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useState } from "react";
import { MdDelete, MdRemove } from "react-icons/md";

type ReactionsProps = {
  reactions: GroupedReactions;
  fetchProjectUpdates: () => void;
};

export default function Reactions({
  reactions,
  fetchProjectUpdates,
}: ReactionsProps) {
  const { loggedUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  function renderEmoji(unified: string) {
    const codePoints = unified.split("-").map((u) => parseInt(u, 16));
    return String.fromCodePoint(...codePoints);
  }
  async function handleRemoveReaction(reaction: Reaction) {
    setLoading(true);
    if (!reaction.commentId && !reaction.projectUpdateId) return;

    try {
      const { removeReactionProjectUpdate, removeReactionComment } =
        await ReactionService();
      if (reaction.commentId) {
        await removeReactionComment(reaction.commentId);
      } else if (reaction.projectUpdateId) {
        await removeReactionProjectUpdate(reaction.projectUpdateId);
      }

      fetchProjectUpdates();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex gap-1 items-center dark:text-white text-black">
      {Object.entries(reactions).map(([emoji, reactions]) => (
        <div key={emoji} className="relative">
          <Popover>
            <PopoverTrigger>
              <div className="cursor-pointer gap-1 flex items-center w-10 h-6 justify-center rounded-lg border-1">
                <span>{renderEmoji(emoji)}</span>
                <span>{reactions.length}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-4 w-[200px] dark:text-white text-black">
              {reactions.map((reaction) => (
                <div key={reaction.id} className="flex gap-2 items-center">
                  <p className="text-sm">{reaction.author.name}</p>
                  {loggedUser?.id === reaction.author.id && (
                    <MdDelete
                      className="text-[18px] cursor-pointer"
                      onClick={() => handleRemoveReaction(reaction)}
                    />
                  )}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </div>
  );
}
