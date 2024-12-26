declare interface IProjectUpdatesProjectCustomer {
  id: string;
  name: string;
  corporateName: string;
}
declare interface IProjectUpdatesProject {
  id: string;
  name: string;
  deadline: string;
  statusProject: string;
  createdAt: Date;
  customer: IProjectUpdatesProjectCustomer;
}

declare interface IFetchAllProjectUpdatesResponse {
  updates: {
    id: string;
    userId: string;
    project: IProjectUpdatesProject;
    description: string;
    date: Date;
    updateAt: Date | null | undefined;
  }[];
}

declare interface IProjectUpdatesState {
  id: string;
  userId: string;
  project: IProjectUpdatesProject;
  description: string;
  date: Date;
  updateAt: Date | null | undefined;
}

declare interface ICustomerProjectUpdatesResponse {
  updates: IProjectUpdates[];
}

declare interface IProjectUpdates {
  id: string;
  userId: string;
  project: IProject | null | undefined;
  description: string;
  date: Date;
  updateAt: Date | null | undefined;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "CLIENT_RESPONSIBLE" | "CLIENT_OWNER" | " CLIENT_USER";
    status: "ACTIVE" | "INACTIVE";
    customerId: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  };
  comments: IComment[]
}

declare interface IComment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}
