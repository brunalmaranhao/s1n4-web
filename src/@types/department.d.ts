declare interface IDepartment {
  id: string;
  name: string;
  description: string | null | undefined;
  createdAt: Date;
  updatedAt: Date | null | undefined;
}

declare interface IGetDepartmentsResponse {
  departments: IDepartment[];
}
