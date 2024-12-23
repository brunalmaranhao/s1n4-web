import { useProjectContext } from "@/context/ProjectContext";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { MdAdd, MdOutlineOutlinedFlag } from "react-icons/md";
import Tags from "./Tags/Tags";
import { useTagContext } from "@/context/TagContext";
import { useEffect, useState } from "react";

type TagComponentProps = {
  isCustomerUser?: boolean;
};

export default function TagComponent({ isCustomerUser }: TagComponentProps) {
  const { selectedProjectEdit } = useProjectContext();
  const {
    handleSelectedVisibleModal,
    handleSelectedTag,
    handleCleanTagsCreated,
    tagsCreated,
    tags,
    handleSetTags,
  } = useTagContext();
  const [crossOffset, setCrossOffset] = useState<number>(0);

  useEffect(() => {
    if (selectedProjectEdit && tags.length === 0) {
      const finalList = selectedProjectEdit.tags;
      for (let item of tagsCreated) {
        finalList.push(item);
      }
      handleSetTags(finalList);
    }
  }, []);

  useEffect(() => {
    if (selectedProjectEdit) {
      const size = selectedProjectEdit.tags.length;
      switch (size) {
        case 0:
          setCrossOffset(140);
          break;

        default:
          setCrossOffset(0);
          break;
      }
    }
  }, [selectedProjectEdit]);

  return (
    <div className="text-black dark:text-white flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <MdOutlineOutlinedFlag className="text-[#F57B00] text-[24px]" />
        <p className="text-[24px] font-bold">Etiquetas</p>
      </div>
      <div className="flex ml-7 items-center gap-2 flex-wrap">
        {tags.length === 0 && (
          <>
            {isCustomerUser && (
              <small>Não existem etiquetas adicionadas.</small>
            )}
          </>
        )}
        {tags?.map((tag) => (
          <div
            key={tag.id}
            style={{ backgroundColor: tag.color }}
            className={`px-3 h-7 rounded-lg flex  items-center text-white text-[14px]`}
          >
            <p className="max-w-[120px] truncate">{tag.name} </p>
          </div>
        ))}
        {!isCustomerUser && (
          <Popover
            shadow="lg"
            offset={10}
            crossOffset={crossOffset}
            placement="bottom"
            shouldBlockScroll={false}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                handleSelectedTag(undefined);
                handleSelectedVisibleModal("tags");
                handleCleanTagsCreated();
              }
            }}
          >
            <PopoverTrigger>
              <Button
                className={`bg-transparent min-w-0 ${
                  tags.length > 0 && "w-8 h-7 p-0"
                }  border-[#F57B00] border-1 text-[#F57B00] rounded-lg `}
              >
                {tags.length === 0 && "Adicionar"}{" "}
                <MdAdd className="text-24px" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px]">
              {(titleProps) => <Tags />}
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
