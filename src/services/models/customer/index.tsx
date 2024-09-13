import { get } from "@/services/methods/get";

export default async function CustomerService() {
  async function findAll(
    token: string,
    page?: number,
    size?: number,
  ): Promise<{ customers: ICustomer[]; total: number }> {
    const response = await get<{ customers: ICustomer[]; total: number }>(
      `customer/active?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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

  async function getAllCustomers(
    token: string,
  ): Promise<{ customers: ICustomer[]; total: number }> {
    return await get<{ customers: ICustomer[]; total: number }>(
      `customer/active`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async function fetchCustomersWithUsers(
    token: string,
  ): Promise<{ customersWithUsers: ICustomerWithUsers[] }> {
    return await get<{ customersWithUsers: ICustomerWithUsers[] }>(
      `/customer-with-users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  return {
    findAll,
    getCustomerById,
    getAllCustomers,
    fetchCustomersWithUsers,
  };
}
