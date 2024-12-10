import { useFormWizardContext } from "@/context/FormWizardCustomerContext";
import { Button, useDisclosure } from "@nextui-org/react";
import TableNewResponsibles from "./TableNewResponsibles/TableNewResponsibles";
import ModalCreateResponsible from "./ModalCreateResponsible/ModalCreateResponsible";
import { MdAdd } from "react-icons/md";

const Step4 = () => {
  const { handleBack, step, handleNext } = useFormWizardContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div
      className={`${step === 4 ? "flex" : "hidden"} flex-col gap-3 text-black`}
    >
      <div className="flex justify-between items-center w-full">
        <h2>4. Outras configurações</h2>
        <Button
          className="border-[#F57B00] bg-transparent text-[#F57B00]"
          variant="bordered"
          onPress={onOpen}
        >
          <MdAdd /> Criar responsável
        </Button>
      </div>

      <TableNewResponsibles />

      <div className="w-full mt-10 flex justify-end gap-3">
        <Button
          onClick={handleBack}
          color="primary"
          variant="light"
          className="dark:text-white text-black"
        >
          Voltar
        </Button>
        <Button className="bg-[#F57B00] text-white" onClick={handleNext}>
          Avançar
        </Button>
      </div>
      <ModalCreateResponsible isOpen={isOpen} onClose={onOpenChange} />
    </div>
  );
};

export default Step4;
