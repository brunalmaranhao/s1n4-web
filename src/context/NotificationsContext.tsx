"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import NotificationsService from "@/services/models/notifications";

type NotificationContextType = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  notifications: INotification[];
  countUnread: number;
  selectedNotification?: INotification;
  handleSelectedNotification: (notificaiton: INotification) => void;
  fetchNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [countUnread, setCountUnread] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState<
    INotification | undefined
  >();

  async function fetchNotifications() {
    try {
      const { fetchNotifications } = await NotificationsService();
      const response = await fetchNotifications();

      const unreadNotifications = response.filter(
        (item) => item.readAt === null,
      );
      //console.log(unreadNotifications.length);
      setNotifications(response);
      setCountUnread(unreadNotifications.length);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelectedNotification(notificaiton: INotification) {
    setSelectedNotification(notificaiton);
    onOpen();
  }

  function onClose() {
    onOpenChange();
    setSelectedNotification(undefined);
  }

  const contextValue: NotificationContextType = {
    isOpen,
    onClose,
    onOpen,
    notifications,
    countUnread,
    selectedNotification,
    handleSelectedNotification,
    fetchNotifications,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext deve ser usado dentro de um NotificationProvider",
    );
  }
  return context;
};
