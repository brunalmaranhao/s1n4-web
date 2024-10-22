"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input, Spinner, Tooltip } from "@nextui-org/react";
import { schemaUpdatePassword } from "@/schemas/user";
import jwt from "jsonwebtoken";
import { updatePassword } from "./actions";
import { useRouter } from "next/navigation";

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
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-24 gap-6">
      <h3>Alterar senha</h3>
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
        <Button type="submit">{loading ? "Carregando" : "Entrar"}</Button>
      </form>
    </main>
  );
}
