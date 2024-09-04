declare interface IFetchAllProjectsResponse {
  projects: {
    id: string;
    name: string;
    customerId: string;
    deadline: Date | null | undefined;
    status: "APPROVED" | "DISAPPROVED" | "WAITING" | "CANCELED" | "DONE";
    createdAt: Date;
    updatedAt: Date | null | undefined;
  }[];
}

declare interface IFetchAllProjectsState {
  id: string;
  name: string;
  customerId: string;
  deadline: Date | null | undefined;
  status: "APPROVED" | "DISAPPROVED" | "WAITING" | "CANCELED" | "DONE";
  createdAt: Date;
  updatedAt: Date | null | undefined;
}

declare interface IGetProjectByIdResponse {
  project: {
    id: string;
    name: string;
    customerId: string;
    deadline: Date | null | undefined;
    status: "APPROVED" | "DISAPPROVED" | "WAITING" | "CANCELED" | "DONE";
    createdAt: Date;
    updatedAt: Date | null | undefined;
  };
}
