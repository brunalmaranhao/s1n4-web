"use client";
import { EyeFilledIcon } from "@/components/EyeFilledIcon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon/EyeSlashFilledIcon";
import { useCustomerContext } from "@/context/CustomerContext";
import { schemaNewUserCustomer } from "@/schemas/user";
import { handleAxiosError } from "@/services/error";
import DepartmentService from "@/services/models/department";
import UserService from "@/services/models/user";
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
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ModalAddUser() {
  const { selectedCustomerEdit, isOpenModalAddUser, onOpenChangeModalAddUser } =
    useCustomerContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  const handleFetchDepartments = async () => {
    const { fetchAllDepartments } = await DepartmentService();
    const response = await fetchAllDepartments();
    setDepartments(response.departments);
  };

  useEffect(() => {
    setLoading(true);
    handleFetchDepartments().finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isOpenModalAddUser) reset();
  }, [isOpenModalAddUser]);

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

  async function createUsers(data: INewUserCustomer) {
    if (selectedCustomerEdit?.id) {
      setLoading(true);
      try {
        const { createUserCustomer } = await UserService();
        await createUserCustomer(
          data.firstName,
          data.lastName,
          data.email,
          data.password,
          selectedCustomerEdit?.id,
          data.role,
          data.departmentId,
        );

        onOpenChangeModalAddUser();
        toast.success("Usuário adicionado com sucesso.");
      } catch (error) {
        const customError = handleAxiosError(error);
        toast.error(customError.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpenModalAddUser}
      onOpenChange={onOpenChangeModalAddUser}
      size="xl"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
              Adicionar Usuário - {selectedCustomerEdit?.name}
            </ModalHeader>
            <form onSubmit={handleSubmit(createUsers)}>
              <ModalBody className="flex flex-col gap-2 text-black dark:text-white">
                {loading ? (
                  <Spinner />
                ) : (
                  <>
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
                          className="max-w-xs"
                          variant={inputVariant}
                          classNames={{
                            popoverContent: "text-black",
                            selectorIcon: "text-black",
                          }}
                          {...field}
                        >
                          {roleOptions.map((role) => (
                            <SelectItem
                              key={role.key}
                              value={role.key}
                              className="text-black dark:text-white"
                            >
                              {role.label}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                    <Controller
                      control={control}
                      name={"departmentId"}
                      render={({ field }) => (
                        <Select
                          isInvalid={!!errors.departmentId?.message}
                          errorMessage={errors.departmentId?.message}
                          label="Departamento"
                          placeholder="Selecione um departamento"
                          className="max-w-xs"
                          variant={inputVariant}
                          classNames={{
                            popoverContent: "text-black",
                            selectorIcon: "text-black",
                          }}
                          {...field}
                        >
                          {departments.map((department) => (
                            <SelectItem
                              key={department.id}
                              value={department.id}
                              className="text-black dark:text-white"
                            >
                              {department.name}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onOpenChangeModalAddUser}
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
