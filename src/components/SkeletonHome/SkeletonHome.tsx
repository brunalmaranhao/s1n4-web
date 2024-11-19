export default function SkeletonHome() {
  return (
    <div className="animate-pulse mx-6 flex flex-col gap-6">
      {/* Header Skeleton */}
      <div className="flex flex-col p-4 bg-white dark:bg-[#1E1E1E] border-[1px] border-[#F2F4F8] dark:border-[#1E1E1E] rounded-lg">
        <div className="h-[28px] w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-[20px] w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Content Skeleton */}
      <div className="flex gap-6">
        {/* CustomerProjectsOverview Skeleton */}
        <div className="flex-1 bg-white dark:bg-[#1E1E1E] p-4 rounded-lg shadow-md">
          <div className="h-[20px] w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-[16px] bg-gray-300 dark:bg-gray-700 rounded w-full"
              ></div>
            ))}
          </div>
        </div>

        {/* ProjectUpdatesCustomer Skeleton */}
        <div className="flex-1 bg-white dark:bg-[#1E1E1E] p-4 rounded-lg shadow-md">
          <div className="h-[20px] w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-[16px] bg-gray-300 dark:bg-gray-700 rounded w-full"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* CustomerReportsTable Skeleton */}
      <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-lg shadow-md">
        <div className="h-[20px] w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-3 gap-4 items-center">
              {[...Array(3)].map((_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="h-[16px] bg-gray-300 dark:bg-gray-700 rounded w-full"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
