import { useAuthContext } from "@/context/AuthContext";
import { useProjectUpdateContext } from "@/context/ProjectUpdateContext";
import CommentService from "@/services/models/comments";
import { formatTimeAgo } from "@/util/fomat-time-ago";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import ModalRemoveComment from "./ModalRemoveComment/ModalRemoveComment";
import toast from "react-hot-toast";
import { defaultErrorMessage } from "@/util/default-error-message";
import EmojiPicker from "@/components/EmojiPicker/EmojiPicker";
import ReactionService from "@/services/models/reactions";
import Reactions from "@/components/Reactions/Reactions";

type CommentsProps = {
  comments: IComment[];
  fetchProjectUpdates: () => void;
  projectUpdateId: string;
};

export default function Comments({
  comments,
  fetchProjectUpdates,
  projectUpdateId,
}: CommentsProps) {
  const { loggedUser } = useAuthContext();
  const [commentContent, setCommentContent] = useState("");

  const [focusedInputId, setFocusedInputId] = useState<string | null>(null);
  const { handleSelectedComment } = useProjectUpdateContext();

  const [selectedCommentEdit, setSelectedCommentEdit] = useState<
    IComment | undefined
  >();
  const [commentContentEdit, setCommentContentEdit] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState(false);

  async function handleAddComment(
    projectUpdateId: string,
    commentContent: string,
  ) {
    if (commentContent.trim()) {
      setLoading(true);
      try {
        const { createComment } = await CommentService();
        await createComment(projectUpdateId, commentContent.trim());
        fetchProjectUpdates();
      } catch (error) {
        toast.error(defaultErrorMessage("adicionar", "comentário"));
        console.error("Erro ao adicionar comentário:", error);
      } finally {
        setLoading(false);
        setCommentContent("");
      }
    }
  }

  async function handleEditComment(commentId: string) {
    if (commentContentEdit?.trim()) {
      setLoading(true);
      try {
        const { update } = await CommentService();
        await update(commentId, commentContentEdit.trim());
        fetchProjectUpdates();
      } catch (error) {
        toast.error(defaultErrorMessage("editar", "comentário"));
        console.error("Erro ao adicionar comentário:", error);
      } finally {
        setLoading(false);
        setCommentContentEdit("");
        setSelectedCommentEdit(undefined);
      }
    }
  }

  async function createReaction(emoji: string, commentId: string) {
    setLoading(true);
    try {
      const { createReactionComment } = await ReactionService();
      await createReactionComment(commentId, emoji);
      fetchProjectUpdates();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col ml-7 mt-2">
        {comments.map((comment, index) => (
          <div key={comment.id} className="flex flex-col relative mb-4">
            <div
              className={`absolute left-[-15px] top-0 w-[2px] bg-gray-300 ${
                index === comments.length - 1 ? "h-6" : "h-full"
              }`}
            ></div>
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-semibold">{comment.author.name}</p>
              <div className="flex items-center gap-1 text-[12px] font-normal">
                <MdOutlineAccessTime className="text-[#F57B00]" />
                {formatTimeAgo(new Date(comment.createdAt))}
              </div>
            </div>
            <div className="mt-1">
              {selectedCommentEdit?.id === comment.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditComment(comment.id);
                  }}
                >
                  <Input
                    value={commentContentEdit}
                    onChange={(e) => setCommentContentEdit(e.target.value)}
                  />
                  <div className="flex items-end gap-2">
                    <Button
                      className="my-2 bg-[#F57B00] w-[80px]"
                      size="sm"
                      onMouseDown={(e) => e.preventDefault()}
                      type="submit"
                    >
                      Salvar
                    </Button>
                    <Button
                      className="my-2 bg-transparent border-1 border-[#F57B00] text-[#F57B00]"
                      size="sm"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setSelectedCommentEdit(undefined);
                        setCommentContentEdit(undefined);
                      }}
                      type="button"
                    >
                      Descartar alterações
                    </Button>
                  </div>
                </form>
              ) : (
                <p
                  className="text-[12px] font-normal my-1 w-full overflow-auto [&::-webkit-scrollbar]:h-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                >
                  {comment.content}
                </p>
              )}
            </div>
            <div className="flex text-[12px] gap-[6px] items-center mt-1">
              <EmojiPicker
                onSelectEmoji={(emoji) => {
                  createReaction(emoji, comment.id);
                }}
              />
              {loggedUser?.id === comment.author.id &&
                selectedCommentEdit?.id !== comment.id && (
                  <>
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedCommentEdit(comment);
                        setCommentContentEdit(comment.content);
                      }}
                    >
                      Editar
                    </p>
                    <div className="w-[4px] h-[4px] rounded-full bg-[#878D96]" />
                    <Popover
                      shadow="lg"
                      offset={10}
                      placement="bottom"
                      shouldBlockScroll={false}
                      onOpenChange={(isOpen) => {
                        if (isOpen) {
                          handleSelectedComment(comment);
                        } else {
                          handleSelectedComment(undefined);
                        }
                      }}
                    >
                      <PopoverTrigger>
                        <p className="cursor-pointer">Excluir</p>
                      </PopoverTrigger>
                      <PopoverContent className="w-[380px]">
                        {(titleProps) => (
                          <ModalRemoveComment
                            fetchProjectUpdates={fetchProjectUpdates}
                          />
                        )}
                      </PopoverContent>
                    </Popover>
                  </>
                )}
              <Reactions
                reactions={comment.reactions}
                fetchProjectUpdates={fetchProjectUpdates}
              />
            </div>
          </div>
        ))}
        <div
          className="flex flex-col"
          onFocus={() => setFocusedInputId(`comment-${projectUpdateId}`)}
          onBlur={() => {
            setFocusedInputId(null);
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddComment(projectUpdateId, commentContent);
            }}
          >
            <Input
              placeholder="Escrever um comentário..."
              value={
                focusedInputId === `comment-${projectUpdateId}`
                  ? commentContent
                  : ""
              }
              onChange={(e) => setCommentContent(e.target.value)}
            />
            {focusedInputId === `comment-${projectUpdateId}` && (
              <Button
                className="my-2 bg-[#F57B00] w-[80px]"
                size="sm"
                onMouseDown={(e) => e.preventDefault()}
                type="submit"
              >
                Salvar
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
