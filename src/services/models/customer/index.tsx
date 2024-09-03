import { get } from "@/services/methods/get";

export default async function CustomerService() {
  async function findAll(
    page: number,
    size: number
  ): Promise<{ customers: ICustomer[]; total: number }> {
    const response = await get<{ customers: ICustomer[]; total: number }>(
      `customer/active?page=${page}&size=${size}`
    );
    return { customers: response.customers, total: response.total };
  }

  return {
    findAll,
  };
}
