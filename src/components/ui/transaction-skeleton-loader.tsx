const TransactionSkeletonLoader = () => {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
      <div className="flex items-center space-x-3 w-full">
        <div className="w-9 h-9 bg-gray-700/50 rounded-full animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-700/50 rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-gray-700/50 rounded w-1/2 animate-pulse" />
        </div>
      </div>
      <div className="h-5 bg-gray-700/50 rounded w-16 animate-pulse" />
    </div>
  );
};

export default TransactionSkeletonLoader;
