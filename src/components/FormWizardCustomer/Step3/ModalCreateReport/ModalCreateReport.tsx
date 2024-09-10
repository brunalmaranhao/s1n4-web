import { useFormWizardContext } from "@/context/FormWizardCustomerContext";
import { schemaNewReport } from "@/schemas/report";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ModalCreateReportProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCreateReport({
  isOpen,
  onClose,
}: ModalCreateReportProps) {
  const { handleAddReport, reports } = useFormWizardContext();

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewReport>({
    resolver: yupResolver(schemaNewReport),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  function handleCreateReport(data: INewReport) {
    const existReport = reports?.find(
      (report) => report.reportId === data.reportId
    );
    if (existReport) {
      toast.error("Já existe um relatório com esse ID.");
      return;
    }

    handleAddReport(data);
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
              Criar Relatório
            </ModalHeader>
            <form onSubmit={handleSubmit(handleCreateReport)}>
              <ModalBody className="flex flex-col gap-2">
                <Input
                  label="Nome"
                  {...register("name")}
                  isInvalid={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                  size="sm"
                  className="max-w-[260px]"
                />
                <Input
                  label="PowerBi Workspace Id"
                  type="text"
                  {...register("workspaceId")}
                  isInvalid={!!errors.workspaceId?.message}
                  errorMessage={errors.workspaceId?.message}
                  size="sm"
                />
                <Input
                  label="PowerBi Report Id"
                  type="text"
                  {...register("reportId")}
                  isInvalid={!!errors.reportId?.message}
                  errorMessage={errors.reportId?.message}
                  size="sm"
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
