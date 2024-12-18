import * as yup from "yup";

export const schemaCreateTag= yup
  .object({
    title: yup.string().required("Campo Título é obrigatório."),
  })
  .required();
