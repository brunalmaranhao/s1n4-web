"use client";
import "react-quill/dist/quill.snow.css"; // Estilos padrão do React Quill
import dynamic from "next/dynamic";
import { useState } from "react";
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
import { Controller, useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import toast from "react-hot-toast";

import { useProjectContext } from "@/context/ProjectContext";
import { schemaNewProject } from "@/schemas/project";
import { handleAxiosError } from "@/services/error";
import ProjectsService from "@/services/models/projects";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function ModalCreateProject() {
  const {
    isOpenModalCreateProject: isOpen,
    onClose,
    selectedCustomerFilter,
    fetchListProjectByCustomer,
    selectedListProjectAddProject,
    setSelectedListProjectAddProject,
  } = useProjectContext();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<INewProject>({
    resolver: yupResolver(schemaNewProject),
    mode: "onSubmit",
  });

  async function handleCreateProject(data: INewProject) {
    if (selectedCustomerFilter && selectedListProjectAddProject) {
      setLoading(true);
      console.log(data.description);
      try {
        const { createProject } = await ProjectsService();
        await createProject(
          data.name,
          selectedCustomerFilter,
          data.budget,
          selectedListProjectAddProject,
          data.shouldShowInformationsToCustomerUser,
          data.description,
          data.deadline,
          data.start
        );
        handleOnClose();
        reset();
        fetchListProjectByCustomer(selectedCustomerFilter);
      } catch (error) {
        const customError = handleAxiosError(error);
        toast.error(customError.message);
      } finally {
        setLoading(false);
      }
    }
  }

  function handleOnClose() {
    setSelectedListProjectAddProject(undefined);
    onClose();
  }

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
              variant="bordered"
              className="text-black dark:text-white"
            />

            {/* Componente React Quill */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <ReactQuill
                    theme="snow"
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Escreva sobre o projeto"
                    className="text-black dark:text-white custom-quill rounded-lg"
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image"], // Links e imagens
                        ["clean"], // Remover formatações
                      ],
                    }}
                    formats={[
                      "header",
                      "bold",
                      "italic",
                      "underline",
                      "list",
                      "bullet",
                      "link",
                      "image",
                    ]}
                  />
                  {errors.description && (
                    <p className="text-[#f31260] text-[0.75rem] ">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Input
              size="sm"
              type="date"
              label="Início"
              className="text-black dark:text-white"
              placeholder="DD/MM/YYYY"
              errorMessage={errors.start?.message}
              isInvalid={!!errors.start?.message}
              {...register("start")}
              variant="bordered"
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
              variant="bordered"
            />
            <Input
              size="sm"
              type="number"
              label="Orçamento"
              className="text-black dark:text-white"
              errorMessage={errors.budget?.message}
              isInvalid={!!errors.budget?.message}
              {...register("budget")}
              variant="bordered"
            />
            <Switch
              defaultSelected
              size="lg"
              startContent={<MdVisibilityOff />}
              endContent={<MdVisibility />}
              {...register("shouldShowInformationsToCustomerUser")}
              classNames={{
                wrapper: "group-data-[selected=true]:bg-[#F57B00]",
                base: cn("flex flex-row-reverse w-full self-start gap-6"),
              }}
            >
              <div className="text-sm">
                <p>
                  Tornar informações do projeto visíveis para o usuário do
                  cliente
                </p>
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
      </ModalContent>
    </Modal>
  );
}
