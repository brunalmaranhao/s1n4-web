import { Button } from "@nextui-org/react";
import { MdDone, MdOutlineCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useFormWizardContext } from "@/context/FormWizardCustomerContext";

type FeedbackItemProps = {
  error: boolean;
  label: string;
};

// customer: { finished: false, error: false },
// address: { finished: false, error: false },
// users: { finished: false, error: false },
// reports: { finished: false, error: false },
// responsibles: { finished: false, error: false },

export default function FeedbackItem({ error, label }: FeedbackItemProps) {
  const { reset } = useFormWizardContext();
  const { push } = useRouter();
  const dictionary = [
    {
      key: "customer",
      label: "Cliente",
    },
    {
      key: "address",
      label: "Endereço",
    },
    {
      key: "users",
      label: "Usuários",
    },
    {
      key: "reports",
      label: "Relatórios",
    },
    {
      key: "responsibles",
      label: "Responsáveis",
    },
  ];

  const title = dictionary.find((item) => item.key === label);

  return (
    <>
      {error ? (
        <div className="flex flex-col gap-3 text-black">
          <div className="flex flex-row items-center gap-3">
            <MdOutlineCancel />
            <p>Ocorreu um erro ao salvar {title?.label.toLowerCase()}.</p>
          </div>
          {label === "customer" && (
            <Button
              className="max-w-[220px]"
              color="primary"
              onPress={() => {
                reset();
                push("/admin/management/customers");
              }}
            >
              Voltar
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-row gap-3 items-center text-black">
          <MdDone />
          <p>{title?.label} salvo com sucesso.</p>
        </div>
      )}
    </>
  );
}
