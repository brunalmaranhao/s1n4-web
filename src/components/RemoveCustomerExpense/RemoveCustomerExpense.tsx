import { handleAxiosError } from "@/services/error";
import BudgetExpenseService from "@/services/models/budget-expenses";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface RemoveCustomerExpenseProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  title: string;
  customerName: string;
  expenseId: string;
}

export default function RemoveCustomerExpense({
  isOpen,
  onClose,
  title,
  customerName,
  expenseId,
}: RemoveCustomerExpenseProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleRemoveBudgetExpense = async (id: string) => {
    setLoading(true);
    try {
      const { removeBudgetExpense } = await BudgetExpenseService();
      await removeBudgetExpense(id);
      toast.success("Despesa removida com sucesso!");
      onClose();
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1>Excluir lançamento</h1>
            </ModalHeader>
            <ModalBody>
              <h1 className="text-[#1E1E1E] dark:text-white text-[16px] font-semibold">{`${title} / ${customerName}`}</h1>
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
                onPress={() => handleRemoveBudgetExpense(expenseId)}
              >
                {loading ? <Spinner /> : "Excluir"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
