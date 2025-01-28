import { Divider, Tooltip } from "@nextui-org/react";
import { format } from "date-fns";
import { MdAccountCircle, MdCalendarMonth } from "react-icons/md";

type ResponsibleProjectProps = {
  responsibles?: IResponsiblePartiesCustomer[];
};

export default function ResponsibleProjectComponent({
  responsibles,
}: ResponsibleProjectProps) {
  function responsibleTooltipContent(responsible: IResponsiblePartiesCustomer) {
    return (
      <div className="flex flex-col p-2 gap-1">
        <p>{responsible.firstName + " " + responsible.lastName}</p>
        <p>{format(new Date(responsible.birthdate), "dd/MM/yyy")}</p>
        <p>{responsible.phone}</p>
        <p>{responsible.email}</p>
      </div>
    );
  }
  return (
    <div className="text-black  dark:text-white flex flex-col gap-2 ">
      <div className="flex gap-1 items-center">
        <MdAccountCircle className="text-[#F57B00] text-[24px]" />
        <h2 className="text-[24px] font-bold">Responsáveis do cliente</h2>
      </div>
      {responsibles && responsibles?.length > 0 ? (
        <div className="ml-7 grid grid-cols-2 gap-1">
          {responsibles?.map((responsible, index) => (
            <div className="flex" key={responsible.id}>
              {index % 2 === 1 && (
                <Divider orientation="vertical" className="mr-4" />
              )}
              <Tooltip
                content={responsibleTooltipContent(responsible)}
                className="text-black dark:text-white"
              >
                <p className="text-[12px] font-normal truncate underline">
                  {responsible.email}
                </p>
              </Tooltip>
            </div>
          ))}
        </div>
      ) : (
        <small className="ml-7">Não existem responsáveis cadastrados.</small>
      )}
    </div>
  );
}
