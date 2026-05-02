const LoadingSkeleton = ({ count = 3, type = 'card' }) => {
  if (type === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default card skeleton
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm animate-pulse">
          <div className="h-32 bg-gray-200 dark:bg-gray-700" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            <div className="flex gap-2 pt-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
