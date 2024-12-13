"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  Button,
  Image,
  Input,
  Spinner,
  Switch,
  Tooltip,
} from "@nextui-org/react";

import { schemaUpdatePassword } from "@/schemas/user";
import jwt from "jsonwebtoken";
import { updatePassword } from "./actions";
import { useRouter } from "next/navigation";
import { SunIcon } from "@/components/SunIcon/SunIcon";
import { MoonIcon } from "@/components/MoonIcon/MoonIcon";
import { useTheme } from "next-themes";

export type UpdatePasswordProps = {
  password: string;
  confirmPassword: string;
};

export default function UpdatePassword({
  searchParams,
}: {
  searchParams?: {
    token?: string;
  };
}) {
  const { theme, setTheme } = useTheme();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordProps>({
    resolver: yupResolver(schemaUpdatePassword),
    mode: "onSubmit",
    shouldFocusError: false,
  });
  const [loading, setLoading] = useState(false);
  const tokenParams = searchParams?.token ?? undefined;
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (tokenParams) {
      try {
        const decodedToken = jwt.decode(tokenParams) as { email?: string };

        if (decodedToken?.email) {
          setToken(tokenParams);
          setEmail(decodedToken.email);
        } else {
          setToken(null);
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, [tokenParams]);

  async function handleUpdatePassword(data: UpdatePasswordProps) {
    if (email && token) {
      setLoading(true);
      const { error } = await updatePassword(email, data.password, token);
      setLoading(false);
      if (error) {
        toast.error(error);
      } else {
        push("/login?reset=true");
      }
    } else if (!token) {
      toast.error("Token inválido.");
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
            Redefinir senha
          </h3>
          <form
            onSubmit={handleSubmit(handleUpdatePassword)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col">
              <label>Senha</label>
              <Input {...register("password")} type="password" />
              <p className="text-red-400 text-sm">{errors.password?.message}</p>
            </div>
            <div className="flex flex-col">
              <label>Confirmar Senha</label>
              <Input {...register("confirmPassword")} type="password" />
              <p className="text-red-400 text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div>
            <Button type="submit" className="bg-[#F57B00] text-white">
              {loading ? "Carregando..." : "Redefinir"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
