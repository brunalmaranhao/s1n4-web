import { useFormWizardContext } from "@/context/FormWizardCustomerContext";
import { Button, useDisclosure } from "@nextui-org/react";
import TableNewResponsibles from "./TableNewResponsibles/TableNewResponsibles";
import ModalCreateResponsible from "./ModalCreateResponsible/ModalCreateResponsible";

const Step4 = () => {
  const { handleBack, step, handleNext} = useFormWizardContext();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div className={`${step === 4 ? "flex" : "hidden"} flex-col gap-3`}>
    <div className="flex justify-between items-center w-full">
      <h2>4. Outras configurações</h2>
      <Button color="primary" variant="bordered"  onPress={onOpen}>Criar responsável</Button>
    </div>

    <TableNewResponsibles />

    <div className="w-full mt-10 flex justify-end gap-3">
      <Button onClick={handleBack} color="primary" variant="light">
        Voltar
      </Button>
      <Button  color="primary" onPress={() => handleNext()}>
        Finalizar
      </Button>
    </div>
    <ModalCreateResponsible isOpen={isOpen} onClose={onOpenChange} />
  </div>
  );
};

export default Step4;
