"use client";
import { schemaLogin } from "@/schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSession } from "./actions";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import {
  Button,
  Image,
  Input,
  Link,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { SunIcon } from "@/components/SunIcon/SunIcon";
import { MoonIcon } from "@/components/MoonIcon/MoonIcon";
import { useTheme } from "next-themes";
import ModalForgotPassword from "@/components/ModalForgotPassword/ModalForgotPassword";

export default function Login({
  searchParams,
}: {
  searchParams?: {
    reset?: string;
  };
}) {
  const [loading, setLoading] = useState(false);
  const { handleAuthWithToken } = useAuthContext();
  const { theme, setTheme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(schemaLogin),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  const { isOpen, onOpen, onOpenChange: onClose } = useDisclosure();

  const resetPassword = searchParams?.reset ?? undefined;

  useEffect(() => {
    if (resetPassword) {
      setTimeout(() => {
        toast.success("Senha alterada com sucesso. Faça o login para entrar.", {
          id: "success",
        });
      }, 0);
    }
  }, [resetPassword]);

  async function handleLogin(data: ILogin) {
    setLoading(true);
    const { access_token, error } = await createSession(data);
    setLoading(false);
    if (error) {
      console.log(error);
      toast.error(error);
    } else if (access_token) {
      handleAuthWithToken(access_token);
    }
  }

  return (
    <div className="flex flex-row h-screen w-full dark:bg-[#1E1E1E] bg-white">
      <div className="w-[50%] min-h-screen">
        <Image
          className="h-screen object-cover rounded-none"
          src={"/background.png"}
          alt="background"
        />
      </div>
      <div className="flex flex-col px-16 py-12 gap-6 w-[50%]">
        <div className="flex justify-between">
          <Image src="/sinalogo.svg" alt="Sina Logo" />
          <Switch
            defaultSelected
            size="lg"
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            classNames={{
              wrapper: "group-data-[selected=true]:bg-[#F57B00]",
            }}
          />
        </div>
        <div className="h-full flex flex-col w-full  justify-center">
          <h3 className="text-[42px] font-bold mb-[32px] dark:text-white text-black">
            Login
          </h3>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label className="text-[14px] dark:text-white text-black">
                Email
              </label>
              <Input {...register("email")} type="email" />
              <p className="text-red-400 text-[12px]">
                {errors.email?.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="text-[14px] dark:text-white text-black">
                Senha
              </label>
              <Input {...register("password")} type="password" />
              <p className="text-red-400 text-[12px]">
                {errors.password?.message}
              </p>
            </div>
            <Link
              onPress={() => onOpen()}
              className="dark:text-white self-end text-[14px] cursor-pointer"
            >
              Esqueceu a senha?
            </Link>
            <Button type="submit" className="bg-[#F57B00] text-white">
              {loading ? "Carregando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>

      <ModalForgotPassword isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
