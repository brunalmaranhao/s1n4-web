type StatusProject = "APPROVED" | "DISAPPROVED" | "WAITING" | "CANCELED" | "DONE" | "IN_PROGRESS"

declare interface IFetchAllProjectsResponse {
  projects: {
    id: string;
    name: string;
    customerId: string;
    deadline: Date | null | undefined;
    status: StatusProject
    createdAt: Date;
    updatedAt: Date | null | undefined;
  }[];
}

declare interface IProject {
  id: string;
  name: string;
  customerId: string;
  deadline: Date | null | undefined;
  status: StatusProject
  createdAt: Date;
  updatedAt: Date | null | undefined;
  customer: ICustomer
}

declare interface IFetchAllProjectsState {
  id: string;
  name: string;
  customerId: string;
  deadline: Date | null | undefined;
  status: StatusProject
  createdAt: Date;
  updatedAt: Date | null | undefined;
}

declare interface IGetProjectByIdResponse {
  project: {
    id: string;
    name: string;
    customerId: string;
    deadline: Date | null | undefined;
    status: StatusProject
    createdAt: Date;
    updatedAt: Date | null | undefined;
  };
}

declare interface INewProject {
  name: string;
  deadline?: Date;
  customer: string;
}
