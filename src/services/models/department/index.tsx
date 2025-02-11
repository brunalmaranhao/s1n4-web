import { get } from "@/services/methods/get";

export default async function DepartmentService() {
  async function fetchAllDepartments(): Promise<IGetDepartmentsResponse> {
    const response = await get<IGetDepartmentsResponse>("/departments");
    return response;
  }

  return {
    fetchAllDepartments,
  };
}
