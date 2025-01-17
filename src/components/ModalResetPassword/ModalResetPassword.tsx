import { yupResolver } from "@hookform/resolvers/yup";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { schemaUpdatePassword } from "@/schemas/user";
import { useState } from "react";
import UserService from "@/services/models/user";
import { handleAxiosError } from "@/services/error";
import toast from "react-hot-toast";

export type UpdatePasswordProps = {
  password: string;
  confirmPassword: string;
};

export default function ModalResetPassword() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    <>
      <h1
        className="text-[#0F62FE] text-[12px] font-normal underline decoration-1"
        onClick={onOpen}
      >
        Trocar senha
      </h1>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#1E1E1E] dark:text-white text-[42px] font-bold text-center">
                Trocar senha
              </ModalHeader>
              <ModalBody>
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
                      <label className="text-[#1E1E1E] dark:text-white text-[14px] font-normal">
                        Senha
                      </label>
                      <Input
                        {...register("password")}
                        type="password"
                        variant="bordered"
                      />
                      <p className="text-red-400 text-sm">
                        {errors.password?.message}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[#1E1E1E] dark:text-white text-[14px] font-normal">
                        Confirmar Senha
                      </label>
                      <Input
                        {...register("confirmPassword")}
                        type="password"
                        variant="bordered"
                      />
                      <p className="text-red-400 text-sm">
                        {errors.confirmPassword?.message}
                      </p>
                    </div>
                  </form>
                )}
              </ModalBody>
              <ModalFooter className="flex flex-col w-full">
                <Button
                  type="submit"
                  className="bg-[#F57B00] text-white w-full"
                >
                  {loading ? "Carregando" : "Entrar"}
                </Button>
                <Button
                  className="bg-white dark:bg-[#1E1E1E] text-[#616262] dark:text-white"
                  onPress={() => onClose()}
                >
                  Voltar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
