declare interface IProjectUpdatesProjectCustomer{
  id: string
  name: string
  corporateName: string  
}
declare interface IProjectUpdatesProject{
  id: string
  name: string
  deadline: string
  statusProject: string
  createdAt: Date
  customer: IProjectUpdatesProjectCustomer
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
