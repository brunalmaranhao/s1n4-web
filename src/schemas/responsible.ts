import { phoneRegExp } from "@/util/phoneRegex";
import * as yup from "yup";
import { differenceInYears } from "date-fns";

enum RoleReponsibleEnum {
  INFLUENCERS = "INFLUENCERS",
  RISKMANAGEMENT = "RISKMANAGEMENT",
  OWNER = "OWNER",
  CODE = "CODE",
}

export const schemaNewResponsible = yup
  .object({
    email: yup
      .string()
      .email("Insira um e-mail válido.")
      .required("Campo Email é obrigatório."),
    firstName: yup.string().required("Campo Nome é obrigatório."),
    lastName: yup.string().required("Campo Sobrenome é obrigatório."),
    phone: yup
      .string()
      .required("Campo Celular é obrigatório.")
      .matches(phoneRegExp, "Insira um telefone válido."),
    birthdate: yup
      .date()
      .transform((value, originalValue) => {
        return originalValue === "" ? null : value;
      })
      .required("Campo Data de Nascimento é obrigatório.")
      .test(
        "is-14-or-older",
        "Usuário deve ter no mínimo 14 anos.",
        (value) => {
          return value && differenceInYears(new Date(), value) >= 14;
        },
      ),
    role: yup
      .string()
      .oneOf(Object.values(RoleReponsibleEnum), "Função inválida.")
      .required("Campo Função é obrigatório."),
  })
  .required();
