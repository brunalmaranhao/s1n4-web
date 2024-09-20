"use client";
import { useNotificationContext } from "@/context/NotificationsContext";
import { useProjectContext } from "@/context/ProjectContext";
import { schemaNewProjectUpdate } from "@/schemas/project";
import { handleAxiosError } from "@/services/error";
import ProjectUpdatesService from "@/services/models/project-updates";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ModalCreateProjectUpdate() {
  const { fetchNotifications } = useNotificationContext();
  const {
    selectedProjectCreateProjectUpdate,
    isOpenModalCreateProjectUpdate: isOpen,
    onOpenChangeModalCreateProjectUpdate: onClose,
  } = useProjectContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<INewProjectUpdate>({
    resolver: yupResolver(schemaNewProjectUpdate),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  async function handleCreateProjectUpdate(data: INewProjectUpdate) {
    if (selectedProjectCreateProjectUpdate) {
      setLoading(true);
      try {
        const { createProjectUpdate } = await ProjectUpdatesService();
        await createProjectUpdate(
          data.description,
          selectedProjectCreateProjectUpdate?.id,
        );
        fetchNotifications();
        onClose();
      } catch (error) {
        const customError = handleAxiosError(error);
        toast.error(customError.message);
      } finally {
        setLoading(false);
      }
    }
  }

  const inputVariant = "bordered";

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpen}
      onOpenChange={onClose}
      size="xl"
      className="bg-[#F2F4F8]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black">
              Adicionar atualização ao projeto{" "}
              {selectedProjectCreateProjectUpdate?.name}
            </ModalHeader>
            <form onSubmit={handleSubmit(handleCreateProjectUpdate)}>
              <ModalBody className="flex flex-col gap-6 text-black">
                <Input
                  label="Descrição"
                  {...register("description")}
                  isInvalid={!!errors.description?.message}
                  errorMessage={errors.description?.message}
                  size="sm"
                  variant={inputVariant}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Criar
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
