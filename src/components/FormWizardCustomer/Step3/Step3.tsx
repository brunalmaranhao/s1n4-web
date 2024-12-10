import { useFormWizardContext } from "@/context/FormWizardCustomerContext";
import { Button, useDisclosure } from "@nextui-org/react";
import TableNewReports from "./TableNewReports/TableNewReports";
import ModalCreateReport from "./ModalCreateReport/ModalCreateReport";
import { MdAdd } from "react-icons/md";

const Step3 = () => {
  const { handleNext, handleBack, step } = useFormWizardContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div
      className={`${step === 3 ? "flex" : "hidden"} flex-col gap-3 text-black`}
    >
      <div className="flex justify-between items-center w-full">
        <h2>3. Relatórios</h2>
        <Button
          className="border-[#F57B00] bg-transparent text-[#F57B00]"
          variant="bordered"
          onPress={onOpen}
        >
          <MdAdd /> Criar relatório
        </Button>
      </div>

      <TableNewReports />

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
      <ModalCreateReport isOpen={isOpen} onClose={onOpenChange} />
    </div>
  );
};

export default Step3;
