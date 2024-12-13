"use client";
import { useProjectContext } from "@/context/ProjectContext";
import { handleAxiosError } from "@/services/error";
import ListProjectsService from "@/services/models/list-projects";
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

export default function ModalRemoveListProject() {
  const {
    selectedListProjectRemove,
    isOpenModalRemoveListProject,
    onOpenChangeModalRemoveListProject,
    setSelectedListProjectRemove,
    fetchListProjectByCustomer,
    selectedCustomerFilter,
  } = useProjectContext();
  const [loading, setLoading] = useState(false);

  async function handleRemoveProject() {
    if (selectedListProjectRemove?.id) {
      setLoading(true);
      try {
        const { remove } = await ListProjectsService();
        await remove(selectedListProjectRemove.id);
        if (selectedCustomerFilter) {
          fetchListProjectByCustomer(selectedCustomerFilter);
        }

        onOpenChangeModalRemoveListProject();
        setSelectedListProjectRemove(undefined);
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
      isOpen={isOpenModalRemoveListProject}
      onOpenChange={onOpenChangeModalRemoveListProject}
      size="xl"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
              Desativar Lista Projeto
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2 justify-center items-center text-black dark:text-white">
              <div className="flex flex-col w-full">
                <p>
                  Você tem certeza que deseja desativar a lista de projetos{" "}
                  {selectedListProjectRemove?.name}?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="light"
                onPress={onOpenChangeModalRemoveListProject}
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
