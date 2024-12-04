"use client";
import { useProjectContext } from "@/context/ProjectContext";
import { useReportContext } from "@/context/ReportContext";
import { schemaNewPeriodicReport } from "@/schemas/periodic-report";
import { handleAxiosError } from "@/services/error";
import PeriodicReportService from "@/services/models/periodic-report";
import { months, years } from "@/util/month-and-years";
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
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineUploadFile } from "react-icons/md";

export default function ModalCreatePeriodicReport() {
  const {
    customers,
    fetchCustomer,
    fetchProjectsByCustomer,
    projects,
    loadingProjects,
  } = useProjectContext();
  const { isOpenModalCreatePeriodicReport, onCloseModalCreatePeriodicReport } =
    useReportContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customers.length === 0) fetchCustomer();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm<INewPeriodicReport>({
    resolver: yupResolver(schemaNewPeriodicReport),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  useEffect(() => {
    //console.log(watch('customerId'))
    if (getValues("customerId")) {
      fetchProjectsByCustomer(getValues("customerId"));
    }
  }, [watch("customerId")]);

  async function createLaunch(data: INewPeriodicReport) {
    setLoading(true);
    try {
      const { createPeriodicReport } = await PeriodicReportService();
      await createPeriodicReport(data);
      reset();
      onCloseModalCreatePeriodicReport();
      toast.success("Relátorio adicionado com sucesso.");
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
      isOpen={isOpenModalCreatePeriodicReport}
      onOpenChange={onCloseModalCreatePeriodicReport}
      size="md"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
              Inserir relatório
            </ModalHeader>
            <form onSubmit={handleSubmit(createLaunch)}>
              <ModalBody className="flex flex-col gap-2 text-black dark:text-white">
                <Input
                  label="Nome do projeto"
                  {...register("name")}
                  isInvalid={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                  size="sm"
                />

                <div className="flex gap-3">
                  <Controller
                    name={"month"}
                    control={control}
                    render={({ field }) => (
                      <Select
                        isInvalid={!!errors.month?.message}
                        errorMessage={errors.month?.message}
                        label="Mês"
                        placeholder="Selecione o mês"
                        className="max-w-xs"
                        classNames={{
                          popoverContent: "text-black dark:text-white",
                          selectorIcon: "text-black dark:text-white",
                        }}
                        {...field}
                      >
                        {months?.map((month, index) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Controller
                    name={"year"}
                    control={control}
                    render={({ field }) => (
                      <Select
                        isInvalid={!!errors.year?.message}
                        errorMessage={errors.year?.message}
                        label="Ano"
                        placeholder="Selecione o ano"
                        className="max-w-xs"
                        classNames={{
                          popoverContent: "text-black dark:text-white",
                          selectorIcon: "text-black dark:text-white",
                        }}
                        {...field}
                      >
                        {years?.map((year, index) => (
                          <SelectItem key={year} value={year}>
                            {year.toString()}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                </div>
                <Controller
                  name={"customerId"}
                  control={control}
                  render={({ field }) => (
                    <Select
                      isInvalid={!!errors.customerId?.message}
                      errorMessage={errors.customerId?.message}
                      label="Cliente"
                      placeholder="Selecione um cliente"
                      className="max-w-xs"
                      classNames={{
                        popoverContent: "text-black dark:text-white",
                        selectorIcon: "text-black dark:text-white",
                      }}
                      {...field}
                    >
                      {customers?.map((customer, index) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                {getValues("customerId") && !loadingProjects && (
                  <Controller
                    name={"projectId"}
                    control={control}
                    render={({ field }) => (
                      <Select
                        isInvalid={!!errors.projectId?.message}
                        errorMessage={errors.projectId?.message}
                        label="Projeto"
                        placeholder="Selecione um projeto"
                        className="max-w-xs"
                        classNames={{
                          popoverContent: "text-black dark:text-white",
                          selectorIcon: "text-black dark:text-white",
                        }}
                        {...field}
                      >
                        {projects?.map((project, index) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                )}
                <Input
                  {...register("file")}
                  type="file"
                  isInvalid={!!errors.file?.message}
                  errorMessage={errors.file?.message}
                  size="md"
                  placeholder="dsa"
                  endContent={<MdOutlineUploadFile />}
                  className="cursor-pointer"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#F57B00] text-white"
                  disabled={loading}
                >
                  {loading ? <Spinner color="white" size="sm" /> : "Salvar"}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
