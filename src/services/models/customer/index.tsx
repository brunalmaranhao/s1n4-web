import { get } from "../../methods/get";

export default async function CustomerService() {
  async function findAll(
    page: number,
    size: number,
  ): Promise<{ customers: ICustomer[]; total: number }> {
    const response = await get<{ customers: ICustomer[]; total: number }>(
      `customer/active?page=${page}&size=${size}`,
    );
    return { customers: response.customers, total: response.total };
  }

  async function getCustomerById(
    id: string,
    token: string,
  ): Promise<IGetCustomerByIdResponse> {
    const payload = JSON.stringify(id);
    return await get<IGetCustomerByIdResponse>(`/customer/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return {
    findAll,
    getCustomerById,
  };
}
