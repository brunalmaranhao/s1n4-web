"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { schemaForgotPassword } from "@/schemas/user";
import { forgotPassword } from "./actions";
import { SiGmail } from "react-icons/si";

export type ForgotPasswordProps = {
  email: string;
};

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [hasSendConfirmation, setHasSendConfirmation] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordProps>({
    resolver: yupResolver(schemaForgotPassword),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  async function handleForgotPassword(data: ForgotPasswordProps) {
    setLoading(true);
    const { error } = await forgotPassword(data);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      setHasSendConfirmation(true);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-6">
      <h3>Recuperar Senha</h3>
      {hasSendConfirmation ? (
        <div className="flex flex-col gap-3">
          <h4>Verifique seu e-mail</h4>
          <Tooltip content="Ir para Gmail">
            <a href="https://mail.google.com/" target="_blank">
              <Button color="primary">
                <SiGmail className="text-2xl" />
              </Button>
            </a>
          </Tooltip>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col">
            <label>Email</label>
            <Input {...register("email")} type="email" />
            <p className="text-red-400 text-sm">{errors.email?.message}</p>
          </div>
          <Button type="submit">{loading ? "Carregando" : "Entrar"}</Button>
        </form>
      )}
    </main>
  );
}
