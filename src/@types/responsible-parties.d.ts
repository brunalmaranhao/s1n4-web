declare interface IResponsibleBirthdaysOfTheMonthResponse {
  responsiblesBirthdayOfTheMonth: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthdate: Date;
    responsiblePartiesRole: "INFLUENCERS" | "CODE" | "RISKMANAGEMENT" | "OWNER";
    customerId: string;
  }[];
}

declare interface IResponsibles {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: Date;
  responsiblePartiesRole: "INFLUENCERS" | "CODE" | "RISKMANAGEMENT" | "OWNER";
  customerId: string;
  customer?: ICustomer;
}

enum RoleReponsibleEnum {
  INFLUENCERS = "INFLUENCERS",
  RISKMANAGEMENT = "RISKMANAGEMENT",
  OWNER = "OWNER",
  CODE = "CODE",
}
declare interface INewResponsible {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: Date;
  role: RoleReponsibleEnum;
  actions?: string | null;
}
