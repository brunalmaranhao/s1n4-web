import { Skeleton } from "@nextui-org/react";

export default function SkeletonCardListProjects() {
  return (
    <div className="flex flex-row gap-4 w-full">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-[#1E1E1E] border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg p-4 w-full min-h-[100px] flex flex-col justify-between animate-pulse"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-3/4 bg-white opacity-50 rounded-md" />
              <Skeleton className="h-6 w-6 bg-white opacity-50 rounded-full" />
            </div>

            <div className="flex flex-col gap-2">
              {/* Placeholder para projetos */}
              {Array.from({ length: 3 }).map((_, projectIndex) => (
                <div
                  key={projectIndex}
                  className="h-6 w-full bg-white  opacity-10 rounded-md"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
