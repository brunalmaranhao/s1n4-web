import { useProjectContext } from "@/context/ProjectContext";
import { MdAdd, MdOutlineOutlinedFlag } from "react-icons/md";
import { useNotificationContext } from "@/context/NotificationsContext";

type TagsProps = {
  tags?: ITag[];
};

export default function Tags({ tags }: TagsProps) {
  return (
    <div className="text-black dark:text-white flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <MdOutlineOutlinedFlag className="text-[#F57B00] text-[24px]" />
        <p className="text-[24px] font-bold">Etiquetas</p>
      </div>
      {tags && tags.length > 0 ? (
        <div className="flex ml-7 items-center gap-2 flex-wrap">
          {tags.map((tag) => (
            <div
              key={tag.id}
              style={{ backgroundColor: tag.color }}
              className={`px-3 h-7 rounded-lg flex  items-center text-white text-[14px]`}
            >
              <p className="max-w-[120px] truncate">{tag.name} </p>
            </div>
          ))}
        </div>
      ) : (
        <small className="ml-7">Não existem tags adicionadas.</small>
      )}
    </div>
  );
}
