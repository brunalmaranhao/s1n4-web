"use client";
import { useProjectContext } from "@/context/ProjectContext";
import { handleAxiosError } from "@/services/error";
import ProjectsService from "@/services/models/projects";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ModalRemoveProject() {
  const {
    selectedProjectRemove,
    isOpenModalRemove,
    onOpenChangeModalRemove,
    setSelectedProjectRemove,
    fetchListProjectByCustomer,
    selectedCustomerFilter,
  } = useProjectContext();
  const [loading, setLoading] = useState(false);

  async function handleRemoveProject() {
    if (selectedProjectRemove?.id) {
      setLoading(true);
      try {
        const { remove } = await ProjectsService();
        await remove(selectedProjectRemove.id);
        if (selectedCustomerFilter) {
          fetchListProjectByCustomer(selectedCustomerFilter);
        }

        onOpenChangeModalRemove();
        setSelectedProjectRemove(undefined);
      } catch (error) {
        const customError = handleAxiosError(error);
        toast.error(customError.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpenModalRemove}
      onOpenChange={onOpenChangeModalRemove}
      size="xl"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
              Desativar Projeto
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2 justify-center items-center text-black dark:text-white">
              <div className="flex flex-col w-full">
                <p>
                  Você tem certeza que deseja desativar o projeto{" "}
                  {selectedProjectRemove?.name}?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="light"
                onPress={onOpenChangeModalRemove}
              >
                Cancelar
              </Button>
              <Button
                disabled={loading}
                color="danger"
                type="button"
                onPress={() => handleRemoveProject()}
              >
                {loading ? <Spinner size="sm" color="white" /> : "Desativar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
