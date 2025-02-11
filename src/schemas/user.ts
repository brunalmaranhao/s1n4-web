import * as yup from "yup";

enum RoleEnum {
  CLIENT_RESPONSIBLE = "CLIENT_RESPONSIBLE",
  CLIENT_OWNER = "CLIENT_OWNER",
  CLIENT_USER = "CLIENT_USER",
}

export const schemaNewUserCustomer = yup
  .object({
    email: yup
      .string()
      .email("Insira um e-mail válido.")
      .required("Campo Email é obrigatório."),
    firstName: yup.string().required("Campo Nome é obrigatório."),
    lastName: yup.string().required("Campo Sobrenome é obrigatório."),
    password: yup.string().required("Campo Senha é obrigatório."),
    confirmPassword: yup
      .string()
      .required("A confirmação de senha é obrigatória.")
      .oneOf([yup.ref("password")], "As senhas não coincidem."),
    role: yup
      .string()
      .oneOf(Object.values(RoleEnum), "Função inválida.")
      .required("Campo Função é obrigatório."),
    departmentId: yup.string().required("Campo Departamento é obrigatório."),
  })
  .required();

export const schemaForgotPassword = yup
  .object({
    email: yup
      .string()
      .email("Insira um e-mail válido.")
      .required("Campo Email é obrigatório."),
  })
  .required();

export const schemaUpdatePassword = yup
  .object({
    password: yup.string().required("Campo Senha é obrigatório."),
    confirmPassword: yup
      .string()
      .required("A confirmação de senha é obrigatória.")
      .oneOf([yup.ref("password")], "As senhas não coincidem."),
  })
  .required();
