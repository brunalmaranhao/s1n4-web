"use client";
import { useProjectContext } from "@/context/ProjectContext";
import { schemaNewProject } from "@/schemas/project";
import { handleAxiosError } from "@/services/error";
import ProjectsService from "@/services/models/projects";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  cn,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function ModalEditProject() {
  const {
    customers,
    selectedProjectEdit,
    setSelectedProjectEdit,
    fetchCustomer,
    isOpenModalEdit,
    onOpenChangeModalEdit,
    fetchListProjectByCustomer,
    selectedCustomerFilter
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
      name: selectedProjectEdit?.name,
      budget: selectedProjectEdit?.budget,
      shouldShowInformationsToCustomerUser: selectedProjectEdit?.shouldShowInformationsToCustomerUser
    },
  });
  useEffect(() => {
    if (customers.length === 0) {
      fetchCustomer();
    }
  }, []);

  //console.log(selectedProjectEdit);

  useEffect(() => {
    if (customers.length >= 1) {
      if (selectedProjectEdit) {
        setValue("name", selectedProjectEdit.name);
        setValue("budget", selectedProjectEdit.budget);
        setValue("shouldShowInformationsToCustomerUser", selectedProjectEdit.shouldShowInformationsToCustomerUser)
      }
    }
  }, [customers, selectedProjectEdit]);

  async function handleEditProject(data: INewProject) {

    if (selectedProjectEdit?.id) {
      setLoading(true);
      try {
        const { update } = await ProjectsService();
        await update(
          selectedProjectEdit?.id,
          data.name,
          data.budget,
          data.shouldShowInformationsToCustomerUser
        );

        if (selectedCustomerFilter) {
          fetchListProjectByCustomer(selectedCustomerFilter);
        }
        onOpenChangeModalEdit();
        
      } catch (error) {
        const customError = handleAxiosError(error);
        toast.error(customError.message);
      } finally {
        setLoading(false);
      }
    }
  }

  const inputVariant = "bordered";

  function onClose(){
    onOpenChangeModalEdit()
    setSelectedProjectEdit(undefined)
  }

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpenModalEdit}
      onOpenChange={onClose}
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
                          e.target.value ? parseISO(e.target.value) : undefined
                        )
                      }
                    />
                  )}
                />

                <Input
                  size="sm"
                  type="number"
                  label="Orçamento"
                  className="text-black dark:text-white"
                  errorMessage={errors.budget?.message}
                  isInvalid={!!errors.budget?.message}
                  {...register("budget")}
                  variant={inputVariant}
                />

                <Switch
                  defaultSelected
                  size="lg"
                  // color="warning"
                  startContent={<MdVisibilityOff />}
                  endContent={<MdVisibility />}
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-[#F57B00]",
                    base: cn("flex flex-row-reverse w-full self-start gap-6"),
                  }}
                  {...register("shouldShowInformationsToCustomerUser")}
                >
                  <div className="text-sm">
                    <p>Tornar informações do projeto visíveis para o usuário do cliente</p>
                  </div>
                </Switch>
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
