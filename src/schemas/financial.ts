import * as yup from "yup";

export const schemaNewBudgetExpense = yup
  .object({
    title: yup.string().required("Campo Título obrigatório."),
    description: yup.string().optional(),
    amount: yup
      .number()
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? null : value
      )
      .typeError("Campo Valor deve ser um número.")
      .min(1, "O valor deve ser maior que 0.")
      .required("Campo Valor obrigatório."),
    customerId: yup.string().required("Campo Cliente obrigatório."),
    projectId: yup.string().required("Campo Projeto obrigatório."),
  })
  .required();
