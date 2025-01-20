import { del } from "@/services/methods/delete";
import { get } from "@/services/methods/get";
import { post } from "@/services/methods/post";
import { put } from "@/services/methods/put";

export default async function CustomerService() {
  async function countCustomersAndUsers(): Promise<{
    totalCustomers: number;
    totalUsers: number;
  }> {
    const response = await get<{ totalCustomers: number; totalUsers: number }>(
      `customer/count`
    );

    return response;
  }

  async function findAll(
    page: number,
    size: number
  ): Promise<{ customers: ICustomer[]; total: number }> {
    const response = await get<{ customers: ICustomer[]; total: number }>(
      `customer/active?page=${page}&size=${size}`
    );

    return { customers: response.customers, total: response.total };
  }

  async function findAllActiveCustomers(
    token: string
  ): Promise<{ customers: ICustomer[]; total: number }> {
    const response = await get<{ customers: ICustomer[]; total: number }>(
      `customer/all/active`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { customers: response.customers, total: response.total };
  }

  async function findAllActives(): Promise<{
    customers: ICustomer[];
    total: number;
  }> {
    const response = await get<{ customers: ICustomer[]; total: number }>(
      `customer/all/active`
    );
    return { customers: response.customers, total: response.total };
  }

  async function validateCustomer(
    name: string,
    corporateName: string,
    cnpj: string
  ): Promise<void> {
    const payload = JSON.stringify({ name, corporateName, cnpj });
    await post(`/validate-customer`, payload);
  }

  async function createCustomer(
    name: string,
    corporateName: string,
    cnpj: string,
    contractDuration?: string,
    contractValue?: number,
    accumulatedInvestment?: number,
    expenditureProjection?: number,
    contractObjective?: string
  ): Promise<string> {
    const customerData = {
      name,
      corporateName,
      cnpj,
      contractDuration,
      contractValue,
      accumulatedInvestment,
      expenditureProjection,
      contractObjective,
    };

    const payload = JSON.stringify(
      Object.fromEntries(
        Object.entries(customerData).filter(([_, value]) => value)
      )
    );
    const response = await post<{ customerId: string }, string>(
      `/customer`,
      payload
    );
    return response.customerId;
  }

  async function createCustomerAddress(
    street: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
    country: string,
    zipCode: string,
    customerId: string,
    complement?: string
  ): Promise<string> {
    const payload = JSON.stringify({
      street,
      number,
      neighborhood,
      city,
      state,
      country,
      zipCode,
      customerId,
      complement,
    });
    const response = await post<{ customerAddressId: string }, string>(
      `/customer-address`,
      payload
    );
    return response.customerAddressId;
  }

  async function getCustomerById(
    id: string,
    token: string
  ): Promise<IGetCustomerByIdResponse> {
    return await get<IGetCustomerByIdResponse>(`/customer/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function getAllCustomers(
    token: string
  ): Promise<{ customers: ICustomer[]; total: number }> {
    return await get<{
      customers: ICustomer[];
      total: number;
    }>(`customer/active`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function fetchCustomersWithUsers(
    token: string
  ): Promise<{ customersWithUsers: ICustomer[] }> {
    return await get<{ customersWithUsers: ICustomer[] }>(
      `/customer-with-users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async function update(
    id: string,
    contractDuration?: string,
    contractValue?: number,
    accumulatedInvestment?: number,
    expenditureProjection?: number,
    contractObjective?: string
  ): Promise<void> {
    const payload = JSON.stringify({
      contractDuration,
      contractValue,
      accumulatedInvestment,
      expenditureProjection,
      contractObjective,
    });
    await put(`/customer/update/${id}`, payload);
  }

  async function remove(id: string): Promise<void> {
    await del<void>(`/customer/${id}`);
  }

  async function fetchCustomerReports(
    token: string,
    customerId: string
  ): Promise<{ reports: ICustomerReports[] }> {
    return await get<{
      reports: ICustomerReports[];
    }>(`/reports/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return {
    findAll,
    getCustomerById,
    getAllCustomers,
    fetchCustomersWithUsers,
    validateCustomer,
    createCustomer,
    createCustomerAddress,
    findAllActives,
    update,
    remove,
    fetchCustomerReports,
    findAllActiveCustomers,
    countCustomersAndUsers,
  };
}
