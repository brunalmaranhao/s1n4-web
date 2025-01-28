import { format } from "date-fns";
import { MdCalendarMonth } from "react-icons/md";

type ProjectDateComponentProps = {
  start: Date;
  deadline: Date;
};

export default function ProjectDateComponent({
  start,
  deadline,
}: ProjectDateComponentProps) {
  return (
    <div className="text-black  dark:text-white flex flex-col gap-2 ">
      <div className="flex items-center gap-1">
        <MdCalendarMonth className="text-[#F57B00] text-[24px]" />
        <p className="text-[24px] font-bold">Ínicio e fim do projeto</p>
      </div>
      <div className="flex gap-2">
        <p className="border-1 rounded-lg py-1 px-3">
          {format(new Date(start), "dd/MM/yyyy")}
        </p>
        <p className="border-1 rounded-lg py-1 px-3">
          {format(new Date(deadline), "dd/MM/yyyy")}
        </p>
      </div>
    </div>
  );
}
