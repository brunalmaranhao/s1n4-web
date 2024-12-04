"use client";
import { EyeFilledIcon } from "@/components/EyeFilledIcon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon/EyeSlashFilledIcon";
import { useCustomerContext } from "@/context/CustomerContext";
import { useFinancialContext } from "@/context/FinancialContext";
import { useProjectContext } from "@/context/ProjectContext";
import { schemaNewBudgetExpense } from "@/schemas/financial";
import { schemaNewUserCustomer } from "@/schemas/user";
import { handleAxiosError } from "@/services/error";
import FinancialService from "@/services/models/financial";
import UserService from "@/services/models/user";
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

export default function ModalAddBudgetExpense() {
  const { customers, projects, fetchCustomer, fetchProjectsByCustomer } =
    useProjectContext();
  const {
    isOpenModalCreateLaunch,
    onClose,
    filteredProjectId,
    filteredCustomerId,
    fetchBudgetExpenses,
    fetchBudgetExpensesByCustomer,
    fetchBudgetExpensesByProject,
    fetchAllBudgetExpensesBalance,
    fetchBudgetExpensesBalanceByCustomer,
    fetchBudgetExpensesBalanceByProject,
    selectedKeysCustomer,
    selectedKeysProject,
    clearFilters,
    setFilteredProjectId,
    setSelectedKeysProject,
  } = useFinancialContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);

  const inputVariant = "underlined";
  useEffect(() => {
    fetchCustomer();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<INewBudgetExpense>({
    resolver: yupResolver(schemaNewBudgetExpense),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  const customerId = watch("customerId");
  const projectId = watch("projectId");

  useEffect(() => {
    if (customerId) {
      fetchProjectsByCustomer(customerId);
    } else {
      setValue("projectId", "");
    }
  }, [customerId]);

  async function loadData() {
    const selectedIdCustomer = Array.from(selectedKeysCustomer)[0];
    const selectedIdProject = Array.from(selectedKeysProject)[0];
    if (selectedIdProject === projectId) {
      fetchBudgetExpensesByProject(selectedIdProject);
      fetchBudgetExpensesBalanceByProject(selectedIdProject);
      return;
    } else if (selectedIdCustomer === customerId) {
      fetchBudgetExpensesBalanceByCustomer(selectedIdCustomer);
      fetchBudgetExpensesByCustomer(selectedIdCustomer);
      setSelectedKeysProject(new Set());
      setFilteredProjectId(undefined);
      return;
    }
    clearFilters();
    fetchAllBudgetExpensesBalance();
    fetchBudgetExpenses(1);
  }

  async function createLaunch(data: INewBudgetExpense) {
    setLoading(true);
    try {
      const { createBudgetExpense } = await FinancialService();
      await createBudgetExpense(
        data.title,
        data.amount,
        data.projectId,
        data.description
      );
      loadData();
      reset();
      onClose();
      toast.success("Lançamento adicionado com sucesso.");
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
      isOpen={isOpenModalCreateLaunch}
      onOpenChange={onClose}
      size="md"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
              Novo lançamento
            </ModalHeader>
            <form onSubmit={handleSubmit(createLaunch)}>
              <ModalBody className="flex flex-col gap-2 text-black dark:text-white">
                <Input
                  label="Título"
                  {...register("title")}
                  isInvalid={!!errors.title?.message}
                  errorMessage={errors.title?.message}
                  size="sm"
                />
                <Input
                  label="Descrição"
                  {...register("description")}
                  size="sm"
                />
                <Input
                  label="Valor"
                  type="number"
                  {...register("amount")}
                  isInvalid={!!errors.amount?.message}
                  errorMessage={errors.amount?.message}
                  size="sm"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">R$</span>
                    </div>
                  }
                />

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
                {customerId && (
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
