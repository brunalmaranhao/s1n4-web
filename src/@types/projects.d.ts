// type StatusProject =
//   | "APPROVED"
//   | "DISAPPROVED"
//   | "WAITING"
//   | "CANCELED"
//   | "DONE"
//   | "IN_PROGRESS";

type StatusProject = "ACTIVE" | "INACTIVE" | "DONE";

declare interface IListProject {
  id: string;
  name: string;
  customerId: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: listProject.createdAt;
  updatedAt: listProject.updatedAt;
  projects: IProject[];
  isDone: boolean;
}

declare interface IProject {
  id: string;
  name: string;
  customerId: string;
  start: Date | null | undefined;
  deadline: Date | null | undefined;
  status: StatusProject;
  createdAt: Date;
  updatedAt: Date | null | undefined;
  customer: ICustomer;
  budget: number;
  description: string;
  updatedListProjectAt: Date;
  shouldShowInformationsToCustomerUser: boolean;
  tags: ITag[];
  listProjects: IListProject;
  periodicReports: PeriodicReportDetailsResponse[];
}

declare interface IProjectsOverview {
  id: string;
  name: string;
  customerId: string;
  deadline: Date | null | undefined;
  status?: StatusProject;
  createdAt: Date;
  updatedAt: Date | null | undefined;
  customer: ICustomer;
  budget: number;
  description: string;
  updatedListProjectAt: Date;
  shouldShowInformationsToCustomerUser: boolean;
  tags: ITag[];
  listProjects: IListProject;
  periodicReports: PeriodicReportDetailsResponse[];
}

declare interface IProjectsForStatistics {
  projectsDone: IProject[];
  projectInProgress: IProject[];
  total: number;
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
    updatedListProjectAt: Date;
    shouldShowInformationsToCustomerUser: boolean;
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
  start: Date;
  deadline: Date;
  budget: number;
  shouldShowInformationsToCustomerUser: boolean;
  description: string;
}

declare interface INewProjectUpdate {
  description: string;
}
