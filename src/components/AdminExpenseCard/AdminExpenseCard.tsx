import { formatCurrency, formatter } from "@/util/formatter";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Image,
  Divider,
} from "@nextui-org/react";
import { format } from "date-fns";

interface AdminExpenseCardProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  projectName: string;
  customerName: string;
  createdAt: string;
  budgetExpense: number;
  description: string;
}

export default function AdminExpenseCard({
  isOpen,
  onClose,
  title,
  projectName,
  customerName,
  createdAt,
  budgetExpense,
  description,
}: AdminExpenseCardProps) {
  const formattedDate = createdAt
    ? format(new Date(createdAt), "dd/MM/yyyy")
    : "-";
  const formattedBudgetExpense = "";

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="4xl">
      <ModalContent className="p-4">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex  p-2">
                <div className="mr-6 w-[50%]">
                  <div className="flex space-x-2 items-center mb-2">
                    <Image
                      src="/turned_in.svg"
                      alt="Title Icon"
                      width={24}
                      height={24}
                    />
                    <h1 className="text-[24px] text-[#1E1E1E] font-bold dark:text-white">
                      {title}
                    </h1>
                  </div>
                  <div className="flex items-center">
                    <h1 className="text-[16px] text-[#1E1E1E] font-normal dark:text-white">
                      {projectName}{" "}
                    </h1>
                    <div className="w-1 h-1 rounded-full bg-[#878D96] mx-2"></div>
                    <h1 className="text-[16px] dark:text-white text-[#1E1E1E] font-normal mr-3">
                      {customerName}
                    </h1>
                    <div className="flex items-center space-x-2">
                      <Image src="/calendar.svg" alt="Calendar icon" />
                      <h1 className="text-[16px] dark:text-white text-[#1E1E1E] font-normal">
                        {formattedDate}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="w-[1px] bg-[#878D9633] mr-6"></div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/money.svg"
                      alt="money icon"
                      width={24}
                      height={24}
                    />
                    <h1 className="text-[24px] font-bold text-[#1E1E1E] dark:text-white">
                      Valor
                    </h1>
                  </div>
                  <h1 className="text-[18px] font-semibold text-[#1E1E1E] dark:text-white ml-8 mt-1">{`${formatCurrency(
                    budgetExpense,
                  )}`}</h1>
                </div>
                <hr className="border-[#878D9633]" />
              </div>
            </ModalHeader>
            <ModalBody>
              <hr className="border-[#878D9633] my-[-20px]" />
              <div className="flex mt-4 items-center space-x-2">
                <Image src="/descriptionIcon.svg" alt="description icon" />
                <h1 className="text-[#1E1E1E] dark:text-white text-[24px] font-bold">
                  Descrição
                </h1>
              </div>
              <p className="text-[#1E1E1E] dark:text-white">{description}</p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
