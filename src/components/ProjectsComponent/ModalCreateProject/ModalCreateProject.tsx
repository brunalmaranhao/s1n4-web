"use client";
import { HiddenIcon } from "@/assets/HiddenIcons";
import { VisibleIcon } from "@/assets/VisibleIcons";
import { useProjectContext } from "@/context/ProjectContext";
import { schemaNewProject } from "@/schemas/project";
import { handleAxiosError } from "@/services/error";
import CustomerService from "@/services/models/customer";
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
  Switch,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function ModalCreateProject() {
  const {
    isOpenModalCreateProject: isOpen,
    onClose,
    selectedCustomerFilter,
    fetchListProjectByCustomer,
    selectedListProjectAddProject,
    setSelectedListProjectAddProject,
  } = useProjectContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) reset();
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

  async function handleCreateProject(data: INewProject) {
    if (selectedCustomerFilter && selectedListProjectAddProject) {
      setLoading(true);
      try {
        const { createProject } = await ProjectsService();
        await createProject(
          data.name,
          selectedCustomerFilter,
          data.budget,
          selectedListProjectAddProject,
          data.shouldShowInformationsToCustomerUser,
          data.deadline
        );
        
        handleOnClose();
        reset()
        fetchListProjectByCustomer(selectedCustomerFilter);
      } catch (error) {
        const customError = handleAxiosError(error);
        toast.error(customError.message);
      } finally {
        setLoading(false);
      }
    }
  }

  const inputVariant = "bordered";

  function handleOnClose() {
    setSelectedListProjectAddProject(undefined);
    onClose();
  }
console.log(errors)
  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpen}
      onOpenChange={handleOnClose}
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
              <ModalBody className="flex flex-col gap-3 justify-center items-center text-black">
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
                <Switch
                  defaultSelected
                  size="lg"
                  startContent={<MdVisibilityOff/>}
                  endContent={<MdVisibility />}
                  {...register("shouldShowInformationsToCustomerUser")}
                 
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-[#F57B00]",
                    base: cn(
                      "flex flex-row-reverse w-full self-start gap-6",
                    ),
                  }}
                >
                  <div className="text-sm">
                    <p>Tornar informações do projeto visíveis para o usuário do cliente</p>
                  </div>

                </Switch>
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
