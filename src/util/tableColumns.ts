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

export type ColumnKeysBudgetExpenses =
  | "title"
  | "description"
  | "amount"
  | "project"
  | "customer"
  | "actions"
  | "budget";

export const columnsBudgetExpenses = [
  { name: "Título", uid: "title", sortable: false },
  { name: "Descrição", uid: "description", sortable: false },
  { name: "Valor", uid: "amount", sortable: true },
  { name: "Orçamento do Projeto", uid: "budget", sortable: true },
  { name: "Projeto", uid: "project", sortable: false },
  { name: "Cliente", uid: "customer", sortable: false },
  { name: "Ações", uid: "actions", sortable: false },
];
