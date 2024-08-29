"use client";
import { schemaLogin } from "@/schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createSession } from "./actions";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { handleAuthWithToken } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(schemaLogin),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  async function handleLogin(data: ILogin) {
    setLoading(true);
    const { access_token, error } = await createSession(data);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else if (access_token) {
      handleAuthWithToken(access_token);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-6">
        <h3>Login</h3>
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label>Email</label>
            <Input {...register("email")} type="email" />
            <p className="text-red-400 text-sm">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col">
            <label>Senha</label>
            <Input {...register("password")} type="password" />
            <p className="text-red-400 text-sm">{errors.password?.message}</p>
          </div>
          <Button type="submit">{loading ? "Carregando" : "Entrar"}</Button>
        </form>
    </main>
  );
}
