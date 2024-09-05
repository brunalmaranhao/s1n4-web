import { useFormWizardContext } from "@/context/FormWizardCustomerContext";
import { Button, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser/ModalCreateUser";
import TableNewUsers from "./TableNewUsers/TableNewUsers";

const Step2 = () => {
  const { handleNext, handleBack, step } = useFormWizardContext();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className={`${step === 2 ? "flex" : "hidden"} flex-col gap-3`}>
      <div className="flex justify-between items-center w-full">
        <h2>2. Usuários</h2>
        <Button color="primary" variant="bordered"  onPress={onOpen}>Criar usuário</Button>
      </div>

      <TableNewUsers />

      <div className="w-full mt-10 flex justify-end gap-3">
        <Button onClick={handleBack} color="primary" variant="light">
          Voltar
        </Button>
        <Button onClick={handleNext} color="primary">
          Avançar
        </Button>
      </div>
      <ModalCreateUser isOpen={isOpen} onClose={onOpenChange} />
    </div>
  );
};

export default Step2;
