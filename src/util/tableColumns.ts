export type ColumnKeys =
  | "name"
  | "cnpj"
  | "zipCode"
  | "contractDuration"
  | "contractValue"
  | "status"
  | "actions";

export const columnsCustomer = [
  { name: "Clientes", uid: "name", sortable: false },
  { name: "CPNJ", uid: "cnpj", sortable: false },
  { name: "CEP", uid: "zipCode", sortable: false },
  { name: "Duração", uid: "contractDuration", sortable: false },
  { name: "Valor do contrato", uid: "contractValue", sortable: true },
  { name: "Status", uid: "status", sortable: false },
  { name: "Ações", uid: "actions", sortable: false },
];
