import { useProjectContext } from "@/context/ProjectContext";
import { MdAdd, MdOutlineOutlinedFlag } from "react-icons/md";
import { useNotificationContext } from "@/context/NotificationsContext";


export default function Tags() {
  const {
    selectedNotification
  } = useNotificationContext();




  return (
    <div className="text-black dark:text-white flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <MdOutlineOutlinedFlag className="text-[#F57B00] text-[24px]" />
        <p className="text-[24px] font-bold">Etiquetas</p>
      </div>
      <div className="flex ml-7 items-center gap-2 flex-wrap">
        {selectedNotification?.projectUpdates.project?.tags.length === 0 && (
         <small>Não existem etiquetas adicionadas.</small>
        )}
        {selectedNotification?.projectUpdates.project?.tags.map((tag) => (
          <div
            key={tag.id}
            style={{ backgroundColor: tag.color }}
            className={`px-3 h-7 rounded-lg flex  items-center text-white text-[14px]`}
          >
            <p className="max-w-[120px] truncate">{tag.name} </p>
          </div>
        ))}
      </div>
    </div>
  );
}
