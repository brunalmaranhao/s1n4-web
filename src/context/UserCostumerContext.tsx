import { handleAxiosError } from "@/services/error";
import { decodeToken } from "@/services/jwt-decode/decode";
import CustomerService from "@/services/models/customer";
import { parseCookies } from "nookies";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type UserCostumerType = {
  customerState?: ICustomer;
  setCustomerState: React.Dispatch<React.SetStateAction<ICustomer | undefined>>;
  customerUserState?: ICustomerUser;
  setCustomerUserState: React.Dispatch<
    React.SetStateAction<ICustomerUser | undefined>
  >;
  customerUserId?: string | undefined;
  setCustomerUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const UserCustomerContext = createContext<UserCostumerType | undefined>(
  undefined,
);

export const UserCustomerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { "sina:x-token": sessionKey } = parseCookies();

  const decoded = decodeToken(sessionKey);
  const customerUserIdString = decoded?.sub;

  const [customerState, setCustomerState] = useState<ICustomer | undefined>(
    undefined,
  );
  const [customerUserState, setCustomerUserState] = useState<
    ICustomerUser | undefined
  >(undefined);

  const [customerUserId, setCustomerUserId] = useState<string | undefined>(
    customerUserIdString || undefined,
  );

  const contextValue: UserCostumerType = {
    customerState,
    setCustomerState,
    customerUserState,
    setCustomerUserState,
    customerUserId,
    setCustomerUserId,
  };

  return (
    <UserCustomerContext.Provider value={contextValue}>
      {children}
    </UserCustomerContext.Provider>
  );
};

export const useUserCustomerContext = () => {
  const context = useContext(UserCustomerContext);
  if (!context) {
    throw new Error(
      "useCustomerContext deve ser usado dentro de um CustomerProvider",
    );
  }
  return context;
};
