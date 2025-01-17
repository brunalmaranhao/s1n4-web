declare interface ICustomer {
  id: string;
  name?: string;
  cnpj?: string;
  corporateName?: string;
  status?: "ACTIVE" | "INACTIVE";
  address?: ICustomerAddress;
  accumulatedInvestment?: number;
  contractDuration?: string;
  contractObjective?: string;
  contractValue?: number;
  contractedServices?: string;
  zipCode?: string;
  actions?: string | null;
  users?: ICustomerUsers[];
  projects?: IProject[] | IProjectsOverview[];
  expenditureProjection?: number;
}

declare interface INewCustomer {
  name: string;
  cnpj: string;
  corporateName: string;
  address?: ICustomerAddress;
  accumulatedInvestment: number;
  contractDuration: string;
  contractObjective: string;
  contractValue: number;
  contractedServices?: string;
  expenditureProjection: number;
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

declare interface IActiveCustomersResponse {
  customersLength?: number;
  customers?: ICustomer[];
  error?: string;
  isError: boolean;
}

declare interface ICustomersWithUsersResponse {
  customersWithUsers?: ICustomer[];
  error?: string;
  isError: boolean;
}

declare interface IGetCustomerByIdResponse {
  customer: ICustomer;
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

declare interface ICustomerReports {
  id: string;
  name: string;
  customerId: string;
  pbiReportId: string;
  pbiWorkspaceId: string;
  createdAt: Date;
}

declare interface ICustomerReportDetails {
  reportId: string;
  reportName: string;
  embedUrl: string;
}

declare interface IEditCustomer {
  contractDuration?: string;
  accumulatedInvestment?: number;
  contractValue?: number;
  expenditureProjection?: number;
  contractObjective?: string;
}
