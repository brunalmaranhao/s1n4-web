declare interface ITag {
  id: string;
  color: string;
  createdAt: Date;
  customerId: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  updatedAt?: Date | null;
}
