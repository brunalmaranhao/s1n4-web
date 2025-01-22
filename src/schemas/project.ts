import * as yup from "yup";

export const schemaNewProject = yup
  .object({
    name: yup.string().required("Campo Nome é obrigatório."),
    description: yup.string().required("Campo Descrição é obrigatório."),
    start: yup.date().required("Campo Início é obrigatório."),
    deadline: yup
      .date()
      .required("Campo Prazo final obrigatório.")
      .test(
        "start-before-deadline",
        "A data de início deve ser igual ou anterior à data de prazo final.",
        function (deadline) {
          const { start } = this.parent;
          return start && deadline ? new Date(start) <= new Date(deadline) : true;
        }
      ),
    budget: yup
      .number()
      .transform((value, originalValue) => {
        const parsedValue =
          typeof originalValue === "string"
            ? originalValue.trim()
            : originalValue;
        return parsedValue === "" ? null : value;
      })
      .typeError("Campo Orçamento deve ser um número.")
      .min(0, "O valor deve ser igual ou maior que 0.")
      .required("Campo Orçamento é obrigatório."),
    shouldShowInformationsToCustomerUser: yup.boolean().required(""),
  })
  .required();

export const schemaNewProjectUpdate = yup
  .object({
    description: yup.string().required("Campo Descrição é obrigatório."),
  })
  .required();
