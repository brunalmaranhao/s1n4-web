"use client";
import { useProjectContext } from "@/context/ProjectContext";
import { schemaNewListProject } from "@/schemas/list-project";
import { schemaNewProject } from "@/schemas/project";
import { handleAxiosError } from "@/services/error";
import CustomerService from "@/services/models/customer";
import ListProjectsService from "@/services/models/list-projects";
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

export default function ModalCreateListProject() {
  const {
    customers,
    fetchCustomer,
    fetchListProjectByCustomer,
    setSelectedCustomerFilter,
    isOpenModalCreateListProject: isOpen,
    onCloseModalCreateListProject: onClose,
    selectedCustomerFilter,
  } = useProjectContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      reset();
      return;
    }
    console.log(selectedCustomerFilter);
    if (selectedCustomerFilter) {
      setValue("customer", selectedCustomerFilter);
      // reset({
      //   customer: selectedCustomerFilter || "",
      //   name: "",
      // });
    }
  }, [isOpen, selectedCustomerFilter]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<INewListProject>({
    resolver: yupResolver(schemaNewListProject),
    mode: "onSubmit",
    shouldFocusError: false,
    defaultValues: {
      customer: selectedCustomerFilter,
    },
  });
  useEffect(() => {
    if (customers.length === 0) {
      fetchCustomer();
    }
  }, []);

  useEffect(() => {
    if (selectedCustomerFilter) {
      // setValue("customer", selectedCustomerFilter);
      // reset({
      //   customer: selectedCustomerFilter || "",
      //   name: "",
      // });
    }
  }, [selectedCustomerFilter]);

  async function handleCreateProject(data: INewListProject) {
    setLoading(true);
    try {
      const { createListProject } = await ListProjectsService();
      await createListProject(data.name, data.customer);
      setSelectedCustomerFilter(data.customer);
      fetchListProjectByCustomer(data.customer);

      onClose();
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
              Criar Lista de Projetos
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
                <Controller
                  control={control}
                  name={"customer"}
                  render={({ field }) => (
                    <Select
                      isInvalid={!!errors.customer?.message}
                      errorMessage={errors.customer?.message}
                      label="Cliente"
                      defaultSelectedKeys={
                        selectedCustomerFilter ? [selectedCustomerFilter] : []
                      }
                      placeholder="Selecione um cliente"
                      variant={inputVariant}
                      classNames={{
                        popoverContent: "dark:text-white text-black",
                        selectorIcon: "dark:text-white text-black",
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
