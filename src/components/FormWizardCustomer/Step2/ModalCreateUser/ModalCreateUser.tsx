import { EyeFilledIcon } from "@/components/EyeFilledIcon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon/EyeSlashFilledIcon";
import { useFormWizardContext } from "@/context/FormWizardCustomerContext";
import { schemaNewUserCustomer } from "@/schemas/user";
import { yupResolver } from "@hookform/resolvers/yup";
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

interface ModalCreateUserProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCreateUser({
  isOpen,
  onClose,
}: ModalCreateUserProps) {
  const { handleAddUser, users } = useFormWizardContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen]);

  const inputVariant = "bordered";

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<INewUserCustomer>({
    resolver: yupResolver(schemaNewUserCustomer),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  const roleOptions = [
    {
      key: "CLIENT_RESPONSIBLE",
      label: "Responsável pelo Cliente",
    },
    {
      key: "CLIENT_OWNER",
      label: "Proprietário do Cliente",
    },
    {
      key: "CLIENT_USER",
      label: "Usuário do Cliente",
    },
  ];

  function handleCreateUser(data: INewUserCustomer) {
    const existUser = users.find((user) => user.email === data.email);
    if (existUser) {
      toast.error("Já existe um usuário com esse email.");
      return;
    }

    handleAddUser(data);
    onClose();
  }

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpen}
      onOpenChange={onClose}
      size="xl"
      backdrop="blur"
    >
      <ModalContent className="text-black dark:text-white">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
              Criar Usuário
            </ModalHeader>
            <form onSubmit={handleSubmit(handleCreateUser)}>
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
                <Input
                  label="Senha"
                  type={!isVisible ? "password" : "text"}
                  {...register("password")}
                  isInvalid={!!errors.password?.message}
                  errorMessage={errors.password?.message}
                  size="sm"
                  variant={inputVariant}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
                <Input
                  label="Confirmar Senha"
                  {...register("confirmPassword")}
                  type={!isVisible ? "password" : "text"}
                  isInvalid={!!errors.confirmPassword?.message}
                  errorMessage={errors.confirmPassword?.message}
                  size="sm"
                  variant={inputVariant}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
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
                      className="max-w-xs text-blac"
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
                <Button className="border-black dark:border-white text-black dark:text-white bg-transparent" variant="bordered" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" className="bg-[#F57B00]" type="submit">
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
