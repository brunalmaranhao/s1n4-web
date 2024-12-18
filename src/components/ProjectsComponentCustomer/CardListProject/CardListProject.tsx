import CardProject from "../CardProject/CardProject";
import { useProjectContext } from "@/context/ProjectContext";

type CardListProjectProps = {
  projects?: IProject[];
  name: string;
  listProjectId: string;
};

export default function CardListProject({
  projects,
  name,
  listProjectId,
}: CardListProjectProps) {

  return (
    <div
      className={`bg-[#F57B00]   text-black p-4 w-full rounded-md min-h-[100px]  flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-between">
          <input
            className="text-white bg-transparent outline-none w-full"
            value={name}
            disabled
          />
          <small className="text-tiny bg-white text-[#F57B00] flex items-center justify-center rounded-full w-6 h-6 p-2">
            {projects?.length}
          </small>
        </div>

        <div
          className="flex flex-col mt-3 gap-1 max-h-[350px] pr-5 overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 "
        >
          {projects?.map((project, index) => (
            <CardProject key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
