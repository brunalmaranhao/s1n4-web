import { useFormWizardContext } from "@/context/FormWizardCustomerContext";
import { Button, useDisclosure } from "@nextui-org/react";
import TableNewReports from "./TableNewReports/TableNewReports";
import ModalCreateReport from "./ModalCreateReport/ModalCreateReport";

const Step3 = () => {
  const { handleNext, handleBack, step } = useFormWizardContext();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div className={`${step === 3 ? "flex" : "hidden"} flex-col gap-3`}>
      <div className="flex justify-between items-center w-full">
        <h2>3. Relatórios</h2>
        <Button color="primary" variant="bordered"  onPress={onOpen}>Criar relatório</Button>
      </div>

      <TableNewReports />

      <div className="w-full mt-10 flex justify-end gap-3">
        <Button onClick={handleBack} color="primary" variant="light">
          Voltar
        </Button>
        <Button onClick={handleNext} color="primary">
          Avançar
        </Button>
      </div>
      <ModalCreateReport isOpen={isOpen} onClose={onOpenChange} />
    </div>
  );
};

export default Step3;
