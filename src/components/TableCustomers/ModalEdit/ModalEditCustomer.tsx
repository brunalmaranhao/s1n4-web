"use client";
import { useCustomerContext } from "@/context/CustomerContext";
import { schemaEditCustomer } from "@/schemas/customer";
import { handleAxiosError } from "@/services/error";
import CustomerService from "@/services/models/customer";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ModalEditCustomer() {
  const {
    fetchCustomers,
    selectedCustomerEdit,
    isOpenModalEdit,
    onOpenChangeModalEdit,
    page,
  } = useCustomerContext();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors, isValid },
  } = useForm<IEditCustomer>({
    resolver: yupResolver(schemaEditCustomer),
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      accumulatedInvestment: selectedCustomerEdit?.accumulatedInvestment,
      contractDuration: selectedCustomerEdit?.contractDuration,
      contractObjective: selectedCustomerEdit?.contractObjective,
      contractValue: selectedCustomerEdit?.contractValue,
      expenditureProjection: selectedCustomerEdit?.expenditureProjection,
    },
  });

  console.log(errors);

  useEffect(() => {
    if (selectedCustomerEdit) {
      setValue(
        "accumulatedInvestment",
        selectedCustomerEdit.accumulatedInvestment,
      );
      setValue("contractDuration", selectedCustomerEdit.contractDuration);
      setValue("contractObjective", selectedCustomerEdit.contractObjective);
      setValue("contractValue", selectedCustomerEdit.contractValue);
      setValue(
        "expenditureProjection",
        selectedCustomerEdit.expenditureProjection || undefined,
      );
    }
  }, [selectedCustomerEdit]);

  async function handleEditProject(data: IEditCustomer) {
    if (selectedCustomerEdit?.id) {
      setLoading(true);
      try {
        const { update } = await CustomerService();
        await update(
          selectedCustomerEdit?.id,
          data.contractDuration,
          data.contractValue,
          data.accumulatedInvestment,
          data.expenditureProjection,
          data.contractObjective,
        );

        onOpenChangeModalEdit();
        fetchCustomers(page);
        toast.success("Cliente editado com sucesso.");
      } catch (error) {
        const customError = handleAxiosError(error);
        toast.error(customError.message);
      } finally {
        setLoading(false);
      }
    }
  }

  const inputVariant = "bordered";

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpenModalEdit}
      onOpenChange={onOpenChangeModalEdit}
      size="xl"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
              Editar Cliente
            </ModalHeader>
            <form onSubmit={handleSubmit(handleEditProject)}>
              <ModalBody className="flex flex-col gap-2 justify-center items-center text-black dark:text-white">
                <Input
                  label="Objetivo do Contrato (Opcional)"
                  {...register("contractObjective")}
                  size="sm"
                  variant={inputVariant}
                />
                <Input
                  label="Investimento Acumulado (Opcional)"
                  {...register("accumulatedInvestment")}
                  size="sm"
                  variant={inputVariant}
                  type="number"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">R$</span>
                    </div>
                  }
                />
                <Input
                  label="Duração do Contrato (Opcional)"
                  {...register("contractDuration")}
                  size="sm"
                  variant={inputVariant}
                  type="number"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">Meses</span>
                    </div>
                  }
                />
                <Input
                  label="Valor do Contrato (Opcional)"
                  type="number"
                  {...register("contractValue")}
                  size="sm"
                  variant={inputVariant}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">R$</span>
                    </div>
                  }
                />
                <Input
                  label="Projeção de Gastos (Opcional)"
                  type="number"
                  {...register("expenditureProjection")}
                  size="sm"
                  variant={inputVariant}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">R$</span>
                    </div>
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onOpenChangeModalEdit}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isDisabled={!isValid || loading}
                  className="bg-[#F57B00] text-white"
                >
                  {loading ? <Spinner size="sm" color="white" /> : "Salvar"}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
