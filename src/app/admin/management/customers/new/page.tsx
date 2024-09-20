"use client";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import FormWizarCustomer from "@/components/FormWizardCustomer/FormWizardCustomer";

export default function NewCustomer() {
  const { back } = useRouter();
  return (
    <div className="min-h-screen">
      <div className="flex flex-row items-center gap-4 mb-5">
        <MdArrowBack
          className="cursor-pointer"
          color="black"
          size={22}
          onClick={() =>
            (window.location.href = "/admin/management/customers/")
          }
        />
        <h3 className="text-lg text-black">Novo Cliente</h3>
      </div>
      <FormWizarCustomer />
    </div>
  );
}
