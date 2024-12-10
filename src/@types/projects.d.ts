type StatusProject =
  | "APPROVED"
  | "DISAPPROVED"
  | "WAITING"
  | "CANCELED"
  | "DONE"
  | "IN_PROGRESS";

  declare interface IListProject {
    id: string
    name: string
    customerId: string
    status: 'ACTIVE' | 'INACTIVE'
    createdAt: listProject.createdAt,
    updatedAt: listProject.updatedAt,
    projects: IProject[],
  }

declare interface IProject {
  id: string;
  name: string;
  customerId: string;
  deadline: Date | null | undefined;
  statusProject: StatusProject;
  createdAt: Date;
  updatedAt: Date | null | undefined;
  customer: ICustomer;
  budget: number;
  updatedListProjectAt: Date
  shouldShowInformationsToCustomerUser: boolean
  
}

declare interface IFetchAllProjectsResponse {
  projects: {
    id: string;
    name: string;
    customerId: string;
    deadline: Date | null | undefined;
    statusProject: StatusProject;
    createdAt: Date;
    updatedAt: Date | null | undefined;
    customer: ICustomer;
    budget: number;
  }[];
}

declare interface IFetchAllProjectsState {
  id: string;
  name: string;
  customerId: string;
  deadline: Date | null | undefined;
  statusProject: StatusProject;
  createdAt: Date;
  updatedAt: Date | null | undefined;
}

declare interface IGetProjectByIdResponse {
  project: {
    id: string;
    name: string;
    customerId: string;
    deadline: Date | null | undefined;
    statusProject: StatusProject;
    createdAt: Date;
    updatedAt: Date | null | undefined;
  };
}

declare interface INewListProject {
  name: string;
  customer: string;
}

declare interface INewProject {
  name: string;
  deadline?: Date;
  budget: number;
  shouldShowInformationsToCustomerUser: boolean
}

declare interface INewProjectUpdate {
  description: string;
}
