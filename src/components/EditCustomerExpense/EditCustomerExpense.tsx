import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Selection,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface EditCustomerExpenseProps {
  isOpenEditExpense: boolean;
  onCloseEditExpense: () => void;
  customerName: string;
  projectName: string;
  title: string;
  description: string;
  amount: number;
  customers: ICustomer[];
}

export default function EditCustomerExpense({
  isOpenEditExpense,
  onCloseEditExpense,
  customerName,
  projectName,
  amount,
  description,
  title,
  customers,
}: EditCustomerExpenseProps) {
  const [value, setValue] = useState<Selection>(new Set([""]));
  const [customerProjects, setCustomerProjects] = useState<IProject[]>([]);

  //   useEffect(() => {
  //     if (isOpenEditExpense) setValue(new Set([customerName]));
  //   }, [isOpenEditExpense, customerName]);

  useEffect(() => {
    const selectedCustomer = customers.find(
      (customer) => customer.name === customerName,
    );
    setCustomerProjects(selectedCustomer?.projects || []);
  }, [customerName]);

  return (
    <Modal isOpen={isOpenEditExpense} onOpenChange={onCloseEditExpense}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1>Editar lançamento</h1>
            </ModalHeader>
            <ModalBody>
              <Select
                placeholder={customerName}
                labelPlacement="outside"
                label="Cliente/Empresa"
                variant="bordered"
                selectedKeys={value}
                onSelectionChange={setValue}
                selectionMode="single"
              >
                {customers.map((customer, index) => (
                  <SelectItem key={index}>{customer.name}</SelectItem>
                ))}
              </Select>
              <Select
                placeholder={projectName}
                labelPlacement="outside"
                label="Projeto"
                variant="bordered"
              >
                {customerProjects.map((project, index) => (
                  <SelectItem key={index}>{project.name}</SelectItem>
                ))}
              </Select>
              <Input
                placeholder={title}
                labelPlacement="outside"
                label="Título"
                variant="bordered"
              />
              <Input
                placeholder={description}
                labelPlacement="outside"
                label="Descrição"
                variant="bordered"
              />
              <Input
                placeholder={`R$ ${amount.toString()}`}
                labelPlacement="outside"
                label="Valor"
                variant="bordered"
                type="number"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
