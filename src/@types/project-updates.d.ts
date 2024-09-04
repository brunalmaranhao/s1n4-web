declare interface IFetchAllProjectUpdatesResponse {
  updates: {
    id: string;
    userId: string;
    project: string;
    description: string;
    date: Date;
    updateAt: Date | null | undefined;
  }[];
}

declare interface IProjectUpdatesState {
  id: string;
  userId: string;
  project: string;
  description: string;
  date: Date;
  updateAt: Date | null | undefined;
}
