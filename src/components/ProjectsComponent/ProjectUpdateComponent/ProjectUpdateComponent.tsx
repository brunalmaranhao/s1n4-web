import { useProjectContext } from "@/context/ProjectContext";
import ProjectUpdatesService from "@/services/models/project-updates";
import { formatTimeAgo } from "@/util/fomat-time-ago";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MdAddReaction, MdOutlineAccessTime } from "react-icons/md";
import Comments from "./Comments/Comments";
import { useProjectUpdateContext } from "@/context/ProjectUpdateContext";
import ModalRemoveProjectUpdates from "./ModalRemoveProjectUpdate/ModalRemoveProjectUpdate";
import EmojiPicker from "@/components/EmojiPicker/EmojiPicker";
import ReactionService from "@/services/models/reactions";
import { useAuthContext } from "@/context/AuthContext";
import Reactions from "@/components/Reactions/Reactions";

export default function ProjectUpdateComponent() {
  const [projectUpdates, setProjectUpdates] = useState<IProjectUpdates[]>([]);
  const [isLoadingProjectUpdates, setIsLoadingProjectUpdates] = useState(false);
  const { loggedUser } = useAuthContext();

  const [updateContent, setUpdateContent] = useState("");
  const [focusedInputId, setFocusedInputId] = useState<string | null>(null);
  const [selectedProjectUpdateEdit, setSelectedProjectUpdateEdit] = useState<
    IProjectUpdates | undefined
  >();
  const [projectUpdateContentEdit, setProjectUpdateContentEdit] = useState<
    string | undefined
  >();

  const { selectedProjectEdit } = useProjectContext();
  const { selectedProjectUpdate, handleSelectedProjectUpdate } =
    useProjectUpdateContext();

  const [loading, setLoading] = useState(false);

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

  async function handleAddProjectUpdate() {
    if (selectedProjectEdit && updateContent.trim()) {
      try {
        const { createProjectUpdate } = await ProjectUpdatesService();
        await createProjectUpdate(updateContent.trim(), selectedProjectEdit.id);
        fetchProjectUpdates();
        setUpdateContent("");
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handleEditProjectUpdate() {
    if (selectedProjectUpdateEdit && projectUpdateContentEdit?.trim()) {
      setLoading(true);
      try {
        const { update } = await ProjectUpdatesService();
        await update(
          selectedProjectUpdateEdit.id,
          projectUpdateContentEdit.trim()
        );
        fetchProjectUpdates();
        setUpdateContent("");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setSelectedProjectUpdateEdit(undefined);
        setProjectUpdateContentEdit(undefined);
      }
    }
  }

  return (
    <div>
      <div
        className="flex flex-col mb-2"
        onFocus={() => setFocusedInputId("update")}
        onBlur={() => {
          setFocusedInputId(null);
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProjectUpdate();
          }}
        >
          <Input
            placeholder="Escrever uma nova atualização do projeto..."
            value={updateContent}
            onChange={(e) => setUpdateContent(e.target.value)}
            className="mb-2"
          />
          {focusedInputId === "update" && (
            <Button
              className="mt-1 mb-4 bg-[#F57B00] w-[80px]"
              type="submit"
              size="sm"
              onMouseDown={(e) => e.preventDefault()}
            >
              Salvar
            </Button>
          )}
        </form>
      </div>

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
            {selectedProjectUpdateEdit?.id === projectUpdate.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditProjectUpdate();
                }}
              >
                <Input
                  value={projectUpdateContentEdit}
                  onChange={(e) => setProjectUpdateContentEdit(e.target.value)}
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
                      setSelectedProjectUpdateEdit(undefined);
                      setProjectUpdateContentEdit(undefined);
                    }}
                    type="button"
                  >
                    Descartar alterações
                  </Button>
                </div>
              </form>
            ) : (
              <p className="text-[16px] font-normal my-1">
                {projectUpdate.description}
              </p>
            )}
          </div>
          <div className="flex text-[12px] gap-[6px] items-center">
            {selectedProjectUpdateEdit?.id !== projectUpdate.id && (
              <div className="flex text-[12px] gap-[6px] items-center mt-1">
                <EmojiPicker
                  onSelectEmoji={(emoji) => {
                    createReaction(emoji, projectUpdate.id);
                  }}
                />
                {loggedUser?.id === projectUpdate.userId && (
                  <>
                    <div className="w-[4px] h-[4px] rounded-full bg-[#878D96]" />
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedProjectUpdateEdit(projectUpdate);
                        setProjectUpdateContentEdit(projectUpdate.description);
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
                          handleSelectedProjectUpdate(projectUpdate);
                        } else {
                          handleSelectedProjectUpdate(undefined);
                        }
                      }}
                    >
                      <PopoverTrigger>
                        <p className="cursor-pointer">Excluir</p>
                      </PopoverTrigger>
                      <PopoverContent className="w-[380px]">
                        {(titleProps) => (
                          <ModalRemoveProjectUpdates
                            fetchProjectUpdates={fetchProjectUpdates}
                          />
                        )}
                      </PopoverContent>
                    </Popover>
                  </>
                )}

                <Reactions reactions={projectUpdate.reactions} fetchProjectUpdates={fetchProjectUpdates} />
              </div>
            )}
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
