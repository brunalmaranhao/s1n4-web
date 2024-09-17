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
      await createProject(data.name, data.customer, data.deadline);

      onClose();
      fetchAllProjects();
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
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
              Criar Projeto
            </ModalHeader>
            <form onSubmit={handleSubmit(handleCreateProject)}>
              <ModalBody className="flex flex-col gap-2 justify-center items-center">
                <Input
                  label="Nome"
                  {...register("name")}
                  isInvalid={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                  size="sm"
                />
                <Input
                  size="sm"
                  type="date"
                  label="Prazo Final"
                  className="text-black"
                  placeholder="DD/MM/YYYY"
                  errorMessage={errors.deadline?.message}
                  isInvalid={!!errors.deadline?.message}
                  {...register("deadline")}
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
                      variant="flat"
                      classNames={{
                        popoverContent: "text-black",
                        selectorIcon: "text-black",
                      }}
                      {...field}
                    >
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
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
