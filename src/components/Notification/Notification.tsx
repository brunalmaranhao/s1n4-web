import NotificationsService from "@/services/models/notifications";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { MdCheck, MdNotifications } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { useNotificationContext } from "@/context/NotificationsContext";
import { useTheme } from "next-themes";
import ModalProjectDetailView from "../ModalProjectDetailView/ModalProjectDetailView";

export default function Notification() {
  const {
    countUnread,
    fetchNotifications,
    handleSelectedNotification,
    notifications,
    selectedNotification,
  } = useNotificationContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { theme } = useTheme();

  const now = new Date();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const [iconColor, setIconColor] = useState("black");

  useEffect(() => {
    if (theme === "dark") {
      setIconColor("white");
    } else if (theme === "light") {
      setIconColor("black");
    }
  }, [theme]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  function formattedDate(date: Date) {
    const createdAt = new Date(date);
    const isMoreThanOneDay = now.getTime() - createdAt.getTime() > oneDayInMs;
    const formattedDate = isMoreThanOneDay
      ? format(createdAt, "dd/MM 'às' HH:mm", { locale: ptBR })
      : formatDistanceToNow(createdAt, { addSuffix: true, locale: ptBR });

    return formattedDate;
  }

  const handleOpenModal = (notification: INotification) => {
    handleSelectedNotification(notification);
    onOpen();
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <button className="outline-none">
            <Badge
              content={countUnread}
              color="danger"
              shape="rectangle"
              showOutline={false}
              isInvisible={countUnread === 0}
              classNames={{
                badge: "bg-[#F57B00] text-white",
              }}
            >
              <MdNotifications size={22} color={iconColor} />
            </Badge>
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          className="max-h-[320px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-700"
        >
          {notifications.map((item) => (
            <DropdownItem
              showDivider
              key={item.id}
              className="text-black dark:text-white"
              onPress={() => handleOpenModal(item)}
            >
              <div className="flex flex-row items-center gap-3">
                {item.readAt ? (
                  <MdCheck color="green" />
                ) : (
                  <GoDotFill color="red" />
                )}

                <div className="flex flex-col">
                  <p>{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {formattedDate(item.createdAt)}
                  </p>
                </div>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      {selectedNotification?.projectUpdates && (
        <ModalProjectDetailView
          isOpen={isOpen}
          onClose={onOpenChange}
          origin="notication"
          notification={selectedNotification}
          projectUpdates={selectedNotification?.projectUpdates}
        />
      )}
    </>
  );
}
