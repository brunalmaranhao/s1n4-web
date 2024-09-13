declare interface IGetUserResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role:
      | "INTERNAL_MANAGEMENT"
      | "INTERNAL_PARTNERS"
      | " INTERNAL_FINANCIAL_LEGAL";
    status: "ACTIVE" | "INACTIVE";
    customerId: string | undefined;
    createdAt: Date;
    updatedAt: Date;
  };
}

declare interface IUserResponse {
  user?: IGetUserResponse;
  error?: string;
  isError: boolean;
}

declare interface IActiveUsers {
  users?: IGetActiveUsers[];
  error?: string;
  isError: boolean;
}

declare interface IGetUserState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role:
    | "INTERNAL_MANAGEMENT"
    | "INTERNAL_PARTNERS"
    | " INTERNAL_FINANCIAL_LEGAL";
  status: "ACTIVE" | "INACTIVE";
  customerId: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

declare interface IGetActiveUsers {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role:
    | "INTERNAL_MANAGEMENT"
    | "INTERNAL_PARTNERS"
    | " INTERNAL_FINANCIAL_LEGAL"
    | "CLIENT_RESPONSIBLE"
    | "CLIENT_OWNER"
    | "CLIENT_USER";
  status: "ACTIVE" | "INACTIVE";
  customerId: string | undefined;
  createdAt: Date;
  updatedAt: Date | null | undefined;
}

declare interface IGetActiveUsersResponse {
  users: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role:
      | "INTERNAL_MANAGEMENT"
      | "INTERNAL_PARTNERS"
      | " INTERNAL_FINANCIAL_LEGAL"
      | "CLIENT_RESPONSIBLE"
      | "CLIENT_OWNER"
      | "CLIENT_USER";
    status: "ACTIVE" | "INACTIVE";
    customerId: string | undefined;
    createdAt: Date;
    updatedAt: Date | null | undefined;
  }[];
}
