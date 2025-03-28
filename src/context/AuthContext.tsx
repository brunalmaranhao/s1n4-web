"use client";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/services/jwt-decode/decode";
import { api } from "@/services/api";

type AuthContextType = {
  handleAuthWithToken: (accessToken: string) => void;
  handleSignOut: () => void;
  isAuthenticated?: boolean;
  setIsAuthenticaded: React.Dispatch<React.SetStateAction<boolean>>;
  loggedUser?: { id: string; role: string; permissions: string[] };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { push, replace } = useRouter();
  const [loggedUser, setLoggedUser] = useState<
    { id: string; role: string; permissions: string[] } | undefined
  >();

  const [isAuthenticated, setIsAuthenticaded] = useState(false);
  const { "sina:x-token": sessionKey } = parseCookies();
  const decoded = decodeToken(sessionKey);

  useEffect(() => {
    if (sessionKey) {
      setIsAuthenticaded(true);
      if (decoded?.sub && decoded.role)
        setLoggedUser({
          id: decoded?.sub,
          role: decoded.role,
          permissions: decoded.permissions,
        });
    } else {
      setIsAuthenticaded(false);
    }
  }, [sessionKey]);
  console.log(loggedUser);

  function handleAuthWithToken(acessToken: string) {
    setCookie(undefined, "sina:x-token", acessToken, {
      maxAge: 60 * 60 * 168, // 1 week
    });

    const decode = decodeToken(acessToken);

    if (decode?.role) {
      if (decode?.role?.startsWith("INTERNAL")) {
        window.location.href = "/admin";
      } else if (decode?.role?.startsWith("CLIENT")) {
        window.location.href = "/customer";
      }
    }
  }

  async function handleSignOut() {
    destroyCookie(undefined, "sina:x-token");
    delete api.defaults.headers.common.Authorization;
    window.location.href = "/";
  }

  const contextValue: AuthContextType = {
    handleAuthWithToken,
    handleSignOut,
    isAuthenticated,
    setIsAuthenticaded,
    loggedUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
  }
  return context;
};
