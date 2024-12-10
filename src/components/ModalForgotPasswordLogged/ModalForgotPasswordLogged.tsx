"use client";
import { handleAxiosError } from "@/services/error";
import UserService from "@/services/models/user";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ModalForgotPasswordProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
};

export default function ModalForgotPasswordLogged({
  isOpen,
  onClose,
  email,
}: ModalForgotPasswordProps) {
  const [loading, setLoading] = useState(false);
  const [timerLoading, setTimerLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);

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

  async function handleForgotPassword() {
    setLoading(true);
    try {
      const { forgotPassword } = await UserService();
      await forgotPassword(email);
      //reset();
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
              <h1 className="text-[32px] font-bold">Trocar senha</h1>
              {timerLoading && (
                <p className="text-[18px] text-center font-normal leading-6">
                  E-mail enviado para {email}. Verifique sua pasta de spam. O
                  recebimento pode levar alguns minutos.
                </p>
              )}
            </ModalHeader>

            <ModalFooter className="pt-0 flex flex-col">
              <Button
                onPress={() => handleForgotPassword()}
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
                      <h4 className="text-white">{formatTime(timeLeft)}</h4>
                    ) : (
                      "Enviar"
                    )}
                  </>
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
