"use client";
import { schemaNewResponsible } from "@/schemas/responsible";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCustomerContext } from "@/context/CustomerContext";
import ResponsiblePartiesService from "@/services/models/responsible-parties";
import { handleAxiosError } from "@/services/error";

export default function ModalAddResponsible() {
  const {
    selectedCustomerEdit,
    isOpenModalAddResponsible,
    onOpenChangeModalAddResponsible,
  } = useCustomerContext();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<INewResponsible>({
    resolver: yupResolver(schemaNewResponsible),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  useEffect(() => {
    if (!isOpenModalAddResponsible) {
      reset();
      setValue("phone", "");
    }
  }, [isOpenModalAddResponsible]);

  const roleOptions = [
    {
      key: "INFLUENCERS",
      label: "Influenciadores",
    },
    {
      key: "RISKMANAGEMENT",
      label: "Gestão de Risco",
    },
    {
      key: "OWNER",
      label: "Proprietário",
    },
  ];

  async function handleCreateResponsible(data: INewResponsible) {
    if (selectedCustomerEdit?.id) {
      setLoading(true);
      try {
        const { createResponsibleParties } = await ResponsiblePartiesService();
        await createResponsibleParties(
          data.firstName,
          data.lastName,
          data.email,
          data.phone,
          selectedCustomerEdit?.id,
          data.birthdate,
          data.role,
        );

        onOpenChangeModalAddResponsible();
        toast.success("Parte responsável adicionado com sucesso.");
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
      isOpen={isOpenModalAddResponsible}
      onOpenChange={onOpenChangeModalAddResponsible}
      size="xl"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
              Adicionar Parte Responsável - {selectedCustomerEdit?.name}
            </ModalHeader>
            <form onSubmit={handleSubmit(handleCreateResponsible)}>
              <ModalBody className="flex flex-col gap-2 text-black dark:text-white">
                <div className="flex flex-row gap-2 flex-wrap w-full">
                  <Input
                    label="Nome"
                    {...register("firstName")}
                    isInvalid={!!errors.firstName?.message}
                    errorMessage={errors.firstName?.message}
                    size="sm"
                    className="max-w-[260px]"
                    variant={inputVariant}
                  />
                  <Input
                    label="Sobrenome"
                    {...register("lastName")}
                    isInvalid={!!errors.lastName?.message}
                    errorMessage={errors.lastName?.message}
                    size="sm"
                    className="max-w-[260px]"
                    variant={inputVariant}
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  {...register("email")}
                  isInvalid={!!errors.email?.message}
                  errorMessage={errors.email?.message}
                  size="sm"
                  variant={inputVariant}
                />
                <Controller
                  control={control}
                  name={"phone"}
                  render={({ field }) => (
                    <InputMask mask={"(99)99999-9999"} {...field} type="text">
                      <Input
                        placeholder={"(99)99999-9999"}
                        size="sm"
                        type="tel"
                        label="Telefone"
                        labelPlacement="inside"
                        errorMessage={errors.phone?.message}
                        isInvalid={!!errors.phone?.message}
                        variant={inputVariant}
                      />
                    </InputMask>
                  )}
                />
                <Input
                  size="sm"
                  type="date"
                  label="Data de nascimento"
                  className="text-black dark:text-white"
                  placeholder="DD/MM/YYYY"
                  errorMessage={errors.birthdate?.message}
                  isInvalid={!!errors.birthdate?.message}
                  variant={inputVariant}
                  {...register("birthdate")}
                />

                <Controller
                  control={control}
                  name={"role"}
                  render={({ field }) => (
                    <Select
                      isInvalid={!!errors.role?.message}
                      errorMessage={errors.role?.message}
                      label="Função"
                      placeholder="Selecione uma função"
                      className="max-w-xs"
                      variant={inputVariant}
                      classNames={{
                        popoverContent: "text-black dark:text-white",
                        selectorIcon: "text-black dark:text-white",
                      }}
                      {...field}
                    >
                      {roleOptions.map((role) => (
                        <SelectItem key={role.key} value={role.key}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onOpenChangeModalAddResponsible}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#F57B00] text-white"
                  disabled={loading}
                >
                  {loading ? <Spinner color="white" size="sm" /> : "Criar"}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
