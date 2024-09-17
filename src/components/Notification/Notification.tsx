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
import ModalNotification from "./ModalNotification/ModalNotification";
import { GoDotFill } from "react-icons/go";
import { useNotificationContext } from "@/context/NotificationsContext";

export default function Notification() {
  const {
    countUnread,
    fetchNotifications,
    handleSelectedNotification,
    notifications,
  } = useNotificationContext();

  const now = new Date();
  const oneDayInMs = 24 * 60 * 60 * 1000;

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

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <button>
            <Badge
              content={countUnread}
              color="danger"
              shape="rectangle"
              showOutline={false}
              isInvisible={countUnread === 0}
            >
              <MdNotifications size={22} />
            </Badge>
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="max-h-[320px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-700">
          {notifications.map((item) => (
            <DropdownItem
              showDivider
              key={item.id}
              className="text-black"
              onPress={() => handleSelectedNotification(item)}
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
      <ModalNotification />
    </>
  );
}
