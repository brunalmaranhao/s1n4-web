"use client";
import { useNotificationContext } from "@/context/NotificationsContext";
import NotificationsService from "@/services/models/notifications";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useEffect } from "react";

export default function ModalNotification() {
  const { isOpen, onClose, fetchNotifications, selectedNotification } =
    useNotificationContext();

  useEffect(() => {
    handleReadNotification();
  }, [selectedNotification]);

  async function handleReadNotification() {
    if (selectedNotification && !selectedNotification.readAt) {
      try {
        const { readNotification } = await NotificationsService();
        await readNotification(selectedNotification.id);
        fetchNotifications();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpen}
      onOpenChange={onClose}
      size="xl"
      className="bg-slate-900"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Notificação
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2">
              <div className="flex flex-col gap-3">
                <p className="text-xs">{selectedNotification?.title}</p>
                <p className="text-lg">{selectedNotification?.content}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
