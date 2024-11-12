"use client";
import { ForgotPasswordProps } from "@/app/forgot-password/page";
import { schemaForgotPassword } from "@/schemas/user";
import { handleAxiosError } from "@/services/error";
import UserService from "@/services/models/user";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ModalForgotPasswordProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalForgotPassword({
  isOpen,
  onClose,
}: ModalForgotPasswordProps) {
  const [loading, setLoading] = useState(false);
  const [hasSendConfirmation, setHasSendConfirmation] = useState(false);
  const [timerLoading, setTimerLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordProps>({
    resolver: yupResolver(schemaForgotPassword),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  useEffect(() => {
    if (!isOpen) return;

    if (timerLoading) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setTimerLoading(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setTimeLeft(60);
    }
  }, [timerLoading, isOpen]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  async function handleForgotPassword(data: ForgotPasswordProps) {
    setLoading(true);
    try {
      const { forgotPassword } = await UserService();
      await forgotPassword(data.email);
      //reset();
      setHasSendConfirmation(true);
      setTimerLoading(true);
    } catch (error) {
      console.log(error);
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpen}
      onOpenChange={onClose}
      size="md"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="mt-10 flex flex-col gap-4 text-black dark:text-white items-center">
              {hasSendConfirmation ? (
                <>
                  <h1 className="text-[32px] font-bold">Trocar senha</h1>
                  <p className="text-[18px] text-center font-normal leading-6">
                    E-mail enviado para {getValues("email")}. Verifique sua
                    pasta de spam. O recebimento pode levar alguns minutos.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-[32px] font-bold">Esqueceu a senha?</h1>
                  <p className="text-[18px] text-center font-normal leading-6">
                    Insira o email cadastrado abaixo para receber o código de
                    alteração de senha.
                  </p>
                </>
              )}
            </ModalHeader>
            <form
              onSubmit={handleSubmit(handleForgotPassword)}
              className={`"flex flex-col gap-6"`}
            >
              <ModalBody className="flex flex-col gap-2 text-black dark:text-white">
                {!hasSendConfirmation && (
                  <div className="flex flex-col">
                    <label>Email</label>
                    <Input {...register("email")} type="email" />
                    <p className="text-red-400 text-sm">
                      {errors.email?.message}
                    </p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="pt-0 flex flex-col">
                {hasSendConfirmation ? (
                  <>
                    <Button
                      type="submit"
                      className={`bg-[#F57B00] text-white w-full ${
                        timerLoading && "cursor-not-allowed"
                      }`}
                      disabled={timerLoading}
                    >
                      {loading ? (
                        <Spinner color="white" size="sm" />
                      ) : (
                        <>
                          {timerLoading ? (
                            <h4 className="text-white">
                              {formatTime(timeLeft)}
                            </h4>
                          ) : (
                            'Reenviar'
                          )}
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      onPress={() => {
                        setHasSendConfirmation(false);
                        setTimerLoading(false);
                      }}
                      className="bg-transparent text-[#616262] border-1 border-[#616262] dark:text-white"
                    >
                      Voltar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="submit"
                      className="bg-[#F57B00] text-white w-full"
                    >
                      {loading ? (
                        <Spinner color="white" size="sm" />
                      ) : (
                        "Receber código"
                      )}
                    </Button>
                    <Button
                      type="button"
                      onPress={() => onClose()}
                      className="bg-transparent text-[#616262] border-1 border-[#616262] dark:text-white"
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
