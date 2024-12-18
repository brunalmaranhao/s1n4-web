import { useFinancialContext } from "@/context/FinancialContext";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Selection,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatebudgetExpenseSchema } from "@/schemas/financial";
import ProjectsService from "@/services/models/projects";
import { handleAxiosError } from "@/services/error";
import toast from "react-hot-toast";
import BudgetExpenseService from "@/services/models/budget-expenses";

interface EditCustomerExpenseProps {
  isOpenEditExpense: boolean;
  onCloseEditExpense: () => void;
  customerName: string;
  projectName: string;
  title: string;
  description: string;
  amount: number;
  customers: ICustomer[];
  expenseId: string;
}

export type UpdateBudgetExpenseProps = {
  projectId: string;
  title: string;
  description: string;
  amount: number;
};

export default function EditCustomerExpense({
  isOpenEditExpense,
  onCloseEditExpense,
  customerName,
  projectName,
  amount,
  description,
  title,
  customers,
  expenseId,
}: EditCustomerExpenseProps) {
  const [selectedProjectValue, setSelectedProjectValue] = useState<Selection>(
    new Set([]),
  );
  const [customerProjects, setCustomerProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { budgetExpenses, projects, fetchProjectsExpenses, setProjects } =
    useFinancialContext();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UpdateBudgetExpenseProps>({
    resolver: yupResolver(updatebudgetExpenseSchema),
    mode: "onChange",
    defaultValues: {
      projectId: String(Array.from(selectedProjectValue)[0] || ""),
    },
  });

  const handleFetchProjects = async () => {
    setLoading(true);
    try {
      const { fetchProjects } = await ProjectsService();
      const result = await fetchProjects(1, 20);
      setProjects(result);
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpenEditExpense) {
      reset();
      const selectedBudgetExpense = budgetExpenses.find(
        (expense) => expense.id === expenseId,
      );
      if (selectedBudgetExpense) {
        setSelectedProjectValue(new Set([selectedBudgetExpense.project.id]));
        setValue("projectId", selectedBudgetExpense.project.id);
        handleFetchProjects();
      }
    }
  }, [isOpenEditExpense, expenseId, budgetExpenses]);

  const onSubmit = async (data: UpdateBudgetExpenseProps) => {
    setLoading(true);
    try {
      const { updateBudgetExpense } = await BudgetExpenseService();
      await updateBudgetExpense(expenseId, data);
      toast.success("Despesa atualizada com sucesso!");
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
      onCloseEditExpense();
    }
  };

  return (
    <Modal isOpen={isOpenEditExpense} onOpenChange={onCloseEditExpense}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="text-black dark:text-white">Editar lançamento</h1>
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Controller
                  name="projectId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelPlacement="outside"
                      label="Projeto"
                      variant="bordered"
                      selectedKeys={selectedProjectValue}
                      onSelectionChange={setSelectedProjectValue}
                      isInvalid={!!errors.projectId}
                      errorMessage={errors.projectId?.message}
                    >
                      {projects.map((project) => (
                        <SelectItem
                          key={project.id}
                          value={project.id}
                          className="text-black dark:text-white"
                        >
                          {project.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <Input
                  placeholder={`Ex: ${title}`}
                  labelPlacement="outside"
                  label="Título"
                  variant="bordered"
                  {...register("title", { required: "Título é obrigatório" })}
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                />

                <Input
                  placeholder={`Ex: ${description}`}
                  labelPlacement="outside"
                  label="Descrição"
                  variant="bordered"
                  {...register("description")}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />

                <Input
                  placeholder={`Ex: R$ ${amount.toString()}`}
                  labelPlacement="outside"
                  label="Valor"
                  variant="bordered"
                  type="number"
                  {...register("amount")}
                  isInvalid={!!errors.amount}
                  errorMessage={errors.amount?.message}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full"
                  color="danger"
                  variant="bordered"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  className="w-full dark:bg-[#F57B00]"
                  color="primary"
                  type="submit"
                >
                  {loading ? <Spinner /> : "Salvar"}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
