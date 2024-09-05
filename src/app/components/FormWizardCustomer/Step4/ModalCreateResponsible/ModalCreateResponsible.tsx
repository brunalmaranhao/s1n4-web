import { EyeFilledIcon } from "@/app/components/EyeFilledIcon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/app/components/EyeSlashFilledIcon/EyeSlashFilledIcon";
import { useFormWizardContext } from "@/context/FormWizardCustomerContext";
import { schemaNewResponsible } from "@/schemas/responsible";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from 'react-input-mask'
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
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ModalCreateResponsibleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCreateResponsible({
  isOpen,
  onClose,
}: ModalCreateResponsibleProps) {
  const { handleAddResponsible, responsibles } = useFormWizardContext();

  

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
    if (isOpen) {
      reset()
      setValue('phone', '')
    };
  }, [isOpen]);

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

  function handleCreateResponsible(data: INewResponsible) {
    const existResponsibleSameEmail = responsibles.find(
      (responsible) => responsible.email === data.email
    );
    const existResponsibleSamePhone = responsibles.find(
      (responsible) => responsible.phone === data.phone
    );
    if (existResponsibleSameEmail) {
      toast.error("Já existe um responsável com esse email.");
      return;
    }
    if (existResponsibleSamePhone) {
      toast.error("Já existe um responsável com esse telefone.");
      return;
    }

    handleAddResponsible(data);
    onClose();
  }

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpen}
      onOpenChange={onClose}
      size="xl"
      className="bg-slate-900"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Criar Usuário
            </ModalHeader>
            <form onSubmit={handleSubmit(handleCreateResponsible)}>
              <ModalBody className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 flex-wrap w-full">
                  <Input
                    label="Nome"
                    {...register("firstName")}
                    isInvalid={!!errors.firstName?.message}
                    errorMessage={errors.firstName?.message}
                    size="sm"
                    className="max-w-[260px]"
                  />
                  <Input
                    label="Sobrenome"
                    {...register("lastName")}
                    isInvalid={!!errors.lastName?.message}
                    errorMessage={errors.lastName?.message}
                    size="sm"
                    className="max-w-[260px]"
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  {...register("email")}
                  isInvalid={!!errors.email?.message}
                  errorMessage={errors.email?.message}
                  size="sm"
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
                      />
                    </InputMask>
                  )}
                />
                <Input
                  size="sm"
                  type="date"
                  label="Data de nascimento"
                  className="text-black"
                  placeholder="DD/MM/YYYY"
                  errorMessage={errors.birthdate?.message}
                  isInvalid={!!errors.birthdate?.message}
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
                      variant="flat"
                      classNames={{
                        popoverContent: "text-black",
                        selectorIcon: "text-black",
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
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Criar
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
