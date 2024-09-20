import { get } from "@/services/methods/get";
import { post } from "@/services/methods/post";

export default async function CustomerService() {
  async function findAll(
    token: string,
    page: number,
    size: number,
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

  async function findAllActives(): Promise<{
    customers: ICustomer[];
    total: number;
  }> {
    const response = await get<{ customers: ICustomer[]; total: number }>(
      `customer/all/active`,
    );
    return { customers: response.customers, total: response.total };
  }

  async function validateCustomer(
    name: string,
    corporateName: string,
    cnpj: string,
  ): Promise<void> {
    const payload = JSON.stringify({ name, corporateName, cnpj });
    await post(`/validate-customer`, payload);
  }

  async function createCustomer(
    name: string,
    corporateName: string,
    cnpj: string,
    contractDuration?: string,
    contractValue?: string,
    accumulatedInvestment?: string,
    expenditureProjection?: string,
    contractObjective?: string,
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
        Object.entries(customerData).filter(([_, value]) => value),
      ),
    );
    const response = await post<{ customerId: string }, string>(
      `/customer`,
      payload,
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
    complement?: string,
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
      payload,
    );
    return response.customerAddressId;
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
    token: string,
  ): Promise<{ customersWithUsers: ICustomer[] }> {
    return await get<{ customersWithUsers: ICustomer[] }>(
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
    validateCustomer,
    createCustomer,
    createCustomerAddress,
    findAllActives,
  };
}
