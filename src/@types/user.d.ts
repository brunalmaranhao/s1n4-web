declare interface IGetUserResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role:
      | "INTERNAL_MANAGEMENT"
      | "INTERNAL_PARTNERS"
      | " INTERNAL_FINANCIAL_LEGAL"
      | "CLIENT_USER"
      | "CLIENT_OWNER"
      | "CLIENT_RESPONSIBLE";
    status: "ACTIVE" | "INACTIVE";
    customerId: string | undefined;
    createdAt: Date;
    updatedAt: Date;
    customer: ICustomer;
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
    | " INTERNAL_FINANCIAL_LEGAL"
    | "CLIENT_USER"
    | "CLIENT_OWNER"
    | "CLIENT_RESPONSIBLE";
  status: "ACTIVE" | "INACTIVE";
  customerId: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

enum RoleEnum {
  CLIENT_RESPONSIBLE = "CLIENT_RESPONSIBLE",
  CLIENT_OWNER = "CLIENT_OWNER",
  CLIENT_USER = "CLIENT_USER",
}

declare interface INewUserCustomer {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: RoleEnum;
  actions?: string | null;
  departmentId: string;
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

declare interface ICustomerUserByIdResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "CLIENT_RESPONSIBLE" | "CLIENT_OWNER" | "CLIENT_USER";
    status: "ACTIVE" | "INACTIVE";
    customerId: string | undefined;
    createdAt: Date;
    updatedAt: Date | undefined;
  };
}

declare interface ICustomerUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "CLIENT_RESPONSIBLE" | "CLIENT_OWNER" | "CLIENT_USER";
  status: "ACTIVE" | "INACTIVE";
  customerId: string | undefined;
  createdAt: Date;
  updatedAt: Date | undefined;
}
