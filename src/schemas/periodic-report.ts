import * as yup from "yup";

export const schemaNewPeriodicReport = yup
  .object({
    name: yup.string().required("Campo Nome do projeto é obrigatório."),
    month: yup.string().required("Campo Mês é obrigatório."),
    year: yup.string().required("Campo Ano é obrigatório."),
    customerId: yup.string().required("Campo Cliente é obrigatório."),
    projectId: yup.string().required("Campo Projeto é obrigatório."),
    file: yup
      .mixed<File[]>()
      .required("Campo Arquivo é obrigatório.")
      .test("fileType", "O arquivo deve ser do tipo PDF", (value) => {
        const file = value[0];
        return file instanceof File && file.type === "application/pdf";
      }),
  })
  .required();
