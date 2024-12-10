import * as yup from "yup";

export const schemaNewListProject = yup
  .object({
    name: yup.string().required("Campo Email é obrigatório."),
    customer: yup.string().required("Campo Cliente é obrigatório."),
  })
  .required();
