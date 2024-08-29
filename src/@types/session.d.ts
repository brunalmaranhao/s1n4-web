declare interface ILogin {
  email: string;
  password: string;
}

declare interface ISession {
  access_token?: string;
  error?: string;
  isError: boolean;
}
