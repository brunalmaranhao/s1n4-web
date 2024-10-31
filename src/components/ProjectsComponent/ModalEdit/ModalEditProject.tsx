"use client";
import { useProjectContext } from "@/context/ProjectContext";
import { schemaNewProject } from "@/schemas/project";
import { handleAxiosError } from "@/services/error";
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
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ModalEditProject() {
  const {
    fetchAllProjects,
    customers,
    selectedProjectEdit,
    fetchCustomer,
    isOpenModalEdit,
    onOpenChangeModalEdit,
  } = useProjectContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<INewProject>({
    resolver: yupResolver(schemaNewProject),
    mode: "onSubmit",
    shouldFocusError: false,
    defaultValues: {
      customer: selectedProjectEdit?.customerId,
      name: selectedProjectEdit?.name,
    },
  });
  useEffect(() => {
    if (customers.length === 0) {
      fetchCustomer();
    }
  }, []);

  useEffect(() => {
    if (customers.length >= 1) {
      if (selectedProjectEdit) {
        console.log(selectedProjectEdit.customerId);
        setValue("name", selectedProjectEdit.name);
        setValue("customer", selectedProjectEdit.customerId);
      }
    }
  }, [customers, selectedProjectEdit]);

  async function handleEditProject(data: INewProject) {
    console.log(data);
    if (selectedProjectEdit?.id) {
      setLoading(true);
      try {
        const { update } = await ProjectsService();
        await update(
          selectedProjectEdit?.id,
          data.name,
          data.customer,
          data.deadline,
        );

        onOpenChangeModalEdit();
        fetchAllProjects();
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
              Editar Projeto
            </ModalHeader>
            <form onSubmit={handleSubmit(handleEditProject)}>
              <ModalBody className="flex flex-col gap-2 justify-center items-center text-black dark:text-white">
                <Input
                  label="Nome"
                  {...register("name")}
                  isInvalid={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                  size="sm"
                  variant={inputVariant}
                />
                <Controller
                  control={control}
                  name="deadline"
                  defaultValue={
                    selectedProjectEdit?.deadline
                      ? parseISO(selectedProjectEdit.deadline.toString())
                      : undefined
                  }
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="sm"
                      type="date"
                      label="Prazo Final"
                      className="text-black dark:text-white"
                      placeholder="DD/MM/YYYY"
                      variant={inputVariant}
                      errorMessage={errors.deadline?.message}
                      isInvalid={!!errors.deadline?.message}
                      value={
                        field.value ? format(field.value, "yyyy-MM-dd") : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseISO(e.target.value) : undefined,
                        )
                      }
                    />
                  )}
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
                        popoverContent: "text-black dark:text-white",
                        selectorIcon: "text-black dark:text-white",
                      }}
                      defaultSelectedKeys={[
                        selectedProjectEdit?.customerId || "",
                      ]}
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
                <Button
                  color="default"
                  variant="light"
                  onPress={onOpenChangeModalEdit}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#F57B00] text-white">
                  Salvar
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
