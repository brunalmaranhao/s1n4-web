"use client";
import { MoonIcon } from "@/components/MoonIcon/MoonIcon";
import { SunIcon } from "@/components/SunIcon/SunIcon";
import UserService from "@/services/models/user";
import { roleName } from "@/util/roleName";
import {
  Button,
  Chip,
  Input,
  Link,
  Spinner,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Notification from "@/components/Notification/Notification";
import { useTheme } from "next-themes";
import ModalForgotPassword from "@/components/ModalForgotPassword/ModalForgotPassword";
import ModalForgotPasswordLogged from "@/components/ModalForgotPasswordLogged/ModalForgotPasswordLogged";

// | "INTERNAL_MANAGEMENT"
// | "INTERNAL_PARTNERS"
// | " INTERNAL_FINANCIAL_LEGAL"
// | "CLIENT_USER"
// | "CLIENT_OWNER"
// | "CLIENT_RESPONSIBLE";

export default function MyAccount() {
  const [userResponse, setUserResponse] = useState<IGetUserResponse>();
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange: onClose } = useDisclosure();

  const { theme, setTheme } = useTheme();

  const profileInfo = [
    {
      label: "Nome",
      value: userResponse?.user.firstName + " " + userResponse?.user.lastName,
    },

    {
      label: "Email",
      value: userResponse?.user.email,
    },
    {
      label: "Função",
      value: roleName.find((item) => item.key === userResponse?.user.role)
        ?.value,
    },
    {
      label: "Cliente",
      value: userResponse?.user.customer?.name,
    },
  ];

  useEffect(() => {
    fetchUser();
  }, []);
  async function fetchUser() {
    setLoading(true);
    try {
      const { fetchLoggedUser } = await UserService();
      const response = await fetchLoggedUser();
      setUserResponse(response);
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar informações do usuário.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="p-3 w-full pl-6">
      <div className="flex w-full  items-center justify-between gap-4">
        <h1 className="text-[42px] text-[#21272A] font-bold dark:text-white">
          Minha Conta
        </h1>
        <div className="flex items-center gap-4">
          <Switch
            defaultSelected
            size="lg"
            // color="warning"
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            classNames={{
              wrapper: "group-data-[selected=true]:bg-[#F57B00]",
            }}
          ></Switch>
          <Notification />
        </div>
      </div>
      {loading ? (
        <div className="flex w-full">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col h-full w-full text-black mt-20 dark:text-white">
          {profileInfo.map((profile) => (
            <div key={profile.label} className={` py-3 w-full flex flex-col`}>
              {profile.value && (
                <div className="flex flex-col">
                  <small>{profile.label}</small>
                  <Input
                    isDisabled
                    value={profile.value}
                    className="max-w-[320px]"
                  />
                </div>
              )}
            </div>
          ))}
          {userResponse?.user.email && (
            <Button
              className="max-w-[120px] bg-transparent text-[#F57B00]"
              onClick={() => onOpen()}
            >
              Alterar senha
            </Button>
          )}
        </div>
      )}
      {userResponse?.user.email && (
        <ModalForgotPasswordLogged
          isOpen={isOpen}
          onClose={onClose}
          email={userResponse?.user.email}
        />
      )}
    </div>
  );
}
