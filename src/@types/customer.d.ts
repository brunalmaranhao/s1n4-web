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

declare interface INewCustomer {
  name: string;
  cnpj: string;
  corporateName: string;
  accumulatedInvestment?: string;
  contractDuration?: string;
  contractObjective?: string;
  contractValue?: string;
  expenditureProjection?: string;
  address?: ICustomerAddress;
}

declare interface ICustomerAddress {
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}
