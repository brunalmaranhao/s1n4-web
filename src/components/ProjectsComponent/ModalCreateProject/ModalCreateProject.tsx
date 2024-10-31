"use client";
import { useProjectContext } from "@/context/ProjectContext";
import { schemaNewProject } from "@/schemas/project";
import { handleAxiosError } from "@/services/error";
import CustomerService from "@/services/models/customer";
import ProjectsService from "@/services/models/projects";
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

export default function ModalCreateProject() {
  const {
    fetchAllProjects,
    customers,
    fetchCustomer,
    isOpenModalCreateProject: isOpen,
    onClose,
  } = useProjectContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<INewProject>({
    resolver: yupResolver(schemaNewProject),
    mode: "onSubmit",
    shouldFocusError: false,
  });
  useEffect(() => {
    if (customers.length === 0) {
      fetchCustomer();
    }
  }, []);

  async function handleCreateProject(data: INewProject) {
    setLoading(true);
    try {
      const { createProject } = await ProjectsService();
      await createProject(data.name, data.customer, data.budget, data.deadline);

      onClose();
      fetchAllProjects();
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  }

  const inputVariant = "bordered";

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpen}
      onOpenChange={onClose}
      size="xl"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
              Criar Projeto
            </ModalHeader>
            <form onSubmit={handleSubmit(handleCreateProject)}>
              <ModalBody className="flex flex-col gap-2 justify-center items-center text-black">
                <Input
                  label="Nome"
                  {...register("name")}
                  isInvalid={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                  size="sm"
                  variant={inputVariant}
                  className="text-black dark:text-white"
                />
                <Input
                  size="sm"
                  type="date"
                  label="Prazo Final"
                  className="text-black dark:text-white"
                  placeholder="DD/MM/YYYY"
                  errorMessage={errors.deadline?.message}
                  isInvalid={!!errors.deadline?.message}
                  {...register("deadline")}
                  variant={inputVariant}
                />
                <Input
                  size="sm"
                  type="number"
                  label="Orçamento"
                  className="text-black dark:text-white "
                  errorMessage={errors.budget?.message}
                  isInvalid={!!errors.budget?.message}
                  {...register("budget")}
                  variant={inputVariant}
                />
                <Controller
                  control={control}
                  name={"customer"}
                  render={({ field }) => (
                    <Select
                      isInvalid={!!errors.customer?.message}
                      errorMessage={errors.customer?.message}
                      label="Cliente"
                      placeholder="Selecione um cliente"
                      variant={inputVariant}
                      classNames={{
                        popoverContent: "text-black",
                        selectorIcon: "text-black",
                      }}
                      {...field}
                    >
                      {customers.map((customer) => (
                        <SelectItem
                          key={customer.id}
                          value={customer.id}
                          className="text-black dark:text-white"
                        >
                          {customer.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#F57B00] text-white">
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
