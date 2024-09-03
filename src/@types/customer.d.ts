declare interface ICustomer{
    id: string,
    name: string,
    cnpj: string,
    corporateName: string,
    status: 'ACTIVE' | 'INACTIVE'
    address?: string,
    accumulatedInvestment?: string,
    contractDuration?: string,
    contractObjective?: string,
    contractValue?: string,
    contractedServices?: string,
    zipCode?: string
    actions?: string | null
}