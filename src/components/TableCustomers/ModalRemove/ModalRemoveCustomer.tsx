"use client";
import { useCustomerContext } from "@/context/CustomerContext";
import { handleAxiosError } from "@/services/error";
import CustomerService from "@/services/models/customer";
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

export default function ModalRemoveCustomer() {
  const {
    fetchCustomers,
    selectedCustomerRemove,
    isOpenModalRemove,
    onOpenChangeModalRemove,
    page,
    setSelectedCustomerRemove,
  } = useCustomerContext();
  const [loading, setLoading] = useState(false);

  async function handleRemoveCustomer() {
    if (selectedCustomerRemove?.id) {
      setLoading(true);
      try {
        const { remove } = await CustomerService();
        await remove(selectedCustomerRemove.id);
        fetchCustomers(page);
        onOpenChangeModalRemove();
        setSelectedCustomerRemove(undefined);
        toast.success("Cliente removido com sucesso.");
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
      className="bg-[#F2F4F8]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black">
              Desativar Cliente
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2 justify-center items-center text-black">
              <div className="flex flex-col ">
                <p>
                  Você tem certeza que deseja desativar o cliente{" "}
                  {selectedCustomerRemove?.name}?
                </p>
                <b className="mt-3 text-xs">
                  - Os usuários do cliente perderão acesso ao sistema.
                </b>
                <b className="text-xs">
                  - Os projetos, relatórios e partes responsáveis do cliente não
                  estarão mais visíveis.
                </b>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onOpenChangeModalRemove}
              >
                Cancelar
              </Button>
              <Button
                disabled={loading}
                color="danger"
                type="button"
                onPress={() => handleRemoveCustomer()}
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
