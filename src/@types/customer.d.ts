declare interface ICustomer {
  id: string;
  name: string;
  cnpj: string;
  corporateName: string;
  status: "ACTIVE" | "INACTIVE";
  address?: string;
  accumulatedInvestment?: string;
  contractDuration?: string;
  contractObjective?: string;
  contractValue?: string;
  contractedServices?: string;
  zipCode?: string;
  actions?: string | null;
}

declare interface ICustomerUsers {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date | null;
  role:
    | "INTERNAL_MANAGEMENT"
    | "INTERNAL_PARTNERS"
    | "INTERNAL_FINANCIAL_LEGAL"
    | "CLIENT_RESPONSIBLE"
    | "CLIENT_OWNER"
    | "CLIENT_USER";
  status: "ACTIVE" | "INACTIVE";
  customerId?: string | null;
}

declare interface ICustomerWithUsers {
  id: string;
  name: string;
  cnpj: string;
  corporateName: string;
  status: "ACTIVE" | "INACTIVE";
  address?: string;
  accumulatedInvestment?: string;
  contractDuration?: string;
  contractObjective?: string;
  contractValue?: string;
  contractedServices?: string;
  zipCode?: string;
  actions?: string | null;
  users: ICustomerUsers[];
}

declare interface IActiveCustomersResponse {
  customersLength?: number;
  error?: string;
  isError: boolean;
}

declare interface ICustomersWithUsersResponse {
  customersWithUsers?: ICustomerWithUsers[];
  error?: string;
  isError: boolean;
}

declare interface IActiveCustomers {
  id: string;
  name: string;
  cnpj: string;
  corporateName: string;
  address: string | null | undefined;
  accumulatedInvestment: number | null | undefined;
  contractDuration: string | null | undefined;
  contractObjective: string | null | undefined;
  contractValue: number | null | undefined;
  contractedServices: string | null | undefined;
}

declare interface IGetCustomerByIdResponse {
  customer: {
    name: string;
    corporateName: string;
    cnpj: string;
    address?: string | null;
    zipCode?: string | null;
    contractDuration?: string | null;
    contractValue?: number | null;
    paymentMethods?: "CREDIT_CARD" | "PIX" | null;
    accumulatedInvestment?: number | null;
    expenditureProjection?: number | null;
    contractObjective?: string | null;
    contractedServices?: string | null;
    status?: "ACTIVE" | "INACTIVE";
    createdAt?: Date;
    updatedAt?: Date | null;
  };
}
