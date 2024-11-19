export default function SkeletonTable() {
  return (
    <div className="w-full bg-white dark:bg-[#1E1E1E] p-4 rounded-lg shadow-md">
      <div className="animate-pulse space-y-4">
        <div className="grid grid-cols-5 gap-4 pb-2 border-b border-gray-300 dark:border-gray-700">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-[20px] bg-gray-300 dark:bg-gray-700 rounded w-full"
            ></div>
          ))}
        </div>
        {[...Array(5)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-5 gap-4 items-center py-2 border-b border-gray-300 dark:border-gray-700 last:border-none"
          >
            {[...Array(5)].map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="h-[20px] bg-gray-300 dark:bg-gray-700 rounded w-full"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
