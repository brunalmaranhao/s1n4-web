"use client";
import { handleAxiosError } from "@/services/error";
import ReportService from "@/services/models/report";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";

type ModalRemoveReportProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  report?: ReportDetailsResponse;
  fetchData: () => void;
};
export default function ModalRemoveReport({
  isOpen,
  onOpenChange,
  report,
  fetchData,
}: ModalRemoveReportProps) {
  const [loading, setLoading] = useState(false);

  async function handleRemoveReport() {
    if (report?.id) {
      setLoading(true);
      try {
        const { remove } = await ReportService();
        await remove(report.id);
        fetchData();
        onOpenChange();
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
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
      className="bg-[#F2F4F8]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black">
              Desativar Relatório
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2 justify-center items-center text-black">
              <div className="flex flex-col ">
                <p>
                  Você tem certeza que deseja desativar o relatório{" "}
                  {report?.name}?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onOpenChange}>
                Cancelar
              </Button>
              <Button
                disabled={loading}
                color="danger"
                type="button"
                onPress={() => handleRemoveReport()}
              >
                {loading ? <Spinner /> : "Desativar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
