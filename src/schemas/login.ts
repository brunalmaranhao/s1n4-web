import * as yup from "yup";

export const schemaLogin = yup
  .object({
    email: yup
      .string()
      .email("Insira um e-mail válido.")
      .required("Campo Email é obrigatório."),
    password: yup.string().required("Campo Senha é obrigatório."),
  })
  .required();

