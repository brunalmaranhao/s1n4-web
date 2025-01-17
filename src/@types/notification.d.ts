declare interface INotification {
  id: string;
  title: string;
  content: string;
  readAt?: Date | null;
  createdAt: Date;
  projectUpdates: IProjectUpdates;
}
