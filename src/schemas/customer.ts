import * as yup from "yup";

export const schemaNewCustomer = yup
  .object({
    name: yup.string().required("Campo Nome é obrigatório."),
    corporateName: yup.string().required("Campo Razão Social é obrigatório."),
    cnpj: yup
      .string()
      .required("Campo CNPJ é obrigatório.")
      .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, "CNPJ inválido"),
    address: yup
      .object({
        street: yup.string().optional(),
        number: yup.string().when("street", ([street]) => {
          return street
            ? yup.string().required("Campo Número é obrigatório.")
            : yup.string().optional();
        }),
        complement: yup.string().optional(),
        neighborhood: yup.string().optional(),
        city: yup.string().optional(),
        state: yup.string().optional(),
        country: yup.string().optional(),
        zipCode: yup
          .string()
          .optional()
          .test(
            "is-valid-cep",
            "CEP inválido",
            (value) => !value || /^\d{5}-\d{3}$/.test(value)
          ),
      })
      .optional(),
    contractDuration: yup.string().optional(),
    accumulatedInvestment: yup.string().optional(),
    contractValue: yup.string().optional(),
    expenditureProjection: yup.string().optional(),
    contractObjective: yup.string().optional(),
  })
  .required();
