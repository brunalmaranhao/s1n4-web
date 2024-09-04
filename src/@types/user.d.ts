declare interface IGetUserResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "ADMIN" | "USER";
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

declare interface IGetUserState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "USER";
  status: "ACTIVE" | "INACTIVE";
  customerId: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}
