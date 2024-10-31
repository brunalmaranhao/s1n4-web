"use client";

import { useCustomerContext } from "@/context/CustomerContext";
import { schemaNewReport } from "@/schemas/report";
import { handleAxiosError } from "@/services/error";
import ReportService from "@/services/models/report";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ModalAddReport() {
  const {
    selectedCustomerEdit,
    isOpenModalAddReport,
    onOpenChangeModalAddReport,
  } = useCustomerContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpenModalAddReport) reset();
  }, [isOpenModalAddReport]);

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

  async function createReports(data: INewReport) {
    if (selectedCustomerEdit?.id) {
      setLoading(true);
      try {
        const { createReport } = await ReportService();
        await createReport(
          data.name,
          data.workspaceId,
          data.reportId,
          selectedCustomerEdit?.id,
        );

        onOpenChangeModalAddReport();
        toast.success("Relatório adicionado com sucesso.");
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
      isOpen={isOpenModalAddReport}
      onOpenChange={onOpenChangeModalAddReport}
      size="xl"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
              Adicionar Relatório - {selectedCustomerEdit?.name}
            </ModalHeader>
            <form onSubmit={handleSubmit(createReports)}>
              <ModalBody className="flex flex-col gap-2 text-black dark:text-white">
                <Input
                  label="Nome"
                  {...register("name")}
                  isInvalid={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                  size="sm"
                  className="max-w-[260px]"
                  variant={inputVariant}
                />
                <Input
                  label="PowerBi Workspace Id"
                  type="text"
                  {...register("workspaceId")}
                  isInvalid={!!errors.workspaceId?.message}
                  errorMessage={errors.workspaceId?.message}
                  size="sm"
                  variant={inputVariant}
                />
                <Input
                  label="PowerBi Report Id"
                  type="text"
                  {...register("reportId")}
                  isInvalid={!!errors.reportId?.message}
                  errorMessage={errors.reportId?.message}
                  size="sm"
                  variant={inputVariant}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onOpenChangeModalAddReport}
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
