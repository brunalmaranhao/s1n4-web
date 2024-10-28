"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input, Spinner, Tooltip } from "@nextui-org/react";
import { schemaUpdatePassword } from "@/schemas/user";
import { handleAxiosError } from "@/services/error";
import UserService from "@/services/models/user";

export type UpdatePasswordProps = {
  password: string;
  confirmPassword: string;
};

export default function UpdatePassword() {
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
  const [hasPasswordChanged, setHasPasswordChanged] = useState(false);

  async function handleUpdatePassword(data: UpdatePasswordProps) {
    setLoading(true);
    try {
      const { updatePasswordPrivate } = await UserService();
      await updatePasswordPrivate(data.password);
      setHasPasswordChanged(true);
    } catch (error) {
      console.log(error);
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-24 gap-6 text-black">
      <h3>Alterar senha</h3>
      {hasPasswordChanged ? (
        <>
          <p>Senha alterada com sucesso.</p>
        </>
      ) : (
        <form
          onSubmit={handleSubmit(handleUpdatePassword)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col">
            <label>Senha</label>
            <Input
              {...register("password")}
              type="password"
              variant="bordered"
            />
            <p className="text-red-400 text-sm">{errors.password?.message}</p>
          </div>
          <div className="flex flex-col">
            <label>Confirmar Senha</label>
            <Input
              {...register("confirmPassword")}
              type="password"
              variant="bordered"
            />
            <p className="text-red-400 text-sm">
              {errors.confirmPassword?.message}
            </p>
          </div>
          <Button type="submit">{loading ? "Carregando" : "Entrar"}</Button>
        </form>
      )}
    </main>
  );
}
