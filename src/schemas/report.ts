import * as yup from "yup";


export const schemaNewReport = yup
  .object({
    name: yup.string().required("Campo Nome é obrigatório."),
    workspaceId: yup.string().required("Campo PowerBI Workspace Id é obrigatório."),
    reportId: yup.string().required("Campo PowerBI Report Id é obrigatório."),
  })
  .required();
