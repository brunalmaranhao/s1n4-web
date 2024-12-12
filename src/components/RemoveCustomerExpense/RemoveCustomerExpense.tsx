import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface RemoveCustomerExpenseProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  title: string;
  customerName: string;
}

export default function RemoveCustomerExpense({
  isOpen,
  onClose,
  title,
  customerName,
}: RemoveCustomerExpenseProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1>Excluir projeto</h1>
            </ModalHeader>
            <ModalBody>
              <h1>{`${title} / ${customerName}`}</h1>
              <h1>
                Você realmente deseja excluir este lançamento? Esta ação não
                poderá ser desfeita.
              </h1>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="solid"
                className="w-full"
                onPress={onClose}
              >
                Excluir
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
