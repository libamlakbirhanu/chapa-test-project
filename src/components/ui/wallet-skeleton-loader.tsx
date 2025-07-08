const WalletSkeletonLoader = () => {
  return (
    <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl p-6 bg-gray-800/50 border border-gray-700/50">
      <div className="animate-pulse space-y-4">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-700 rounded w-1/3"></div>
          <div className="h-6 bg-gray-700 rounded-full w-16"></div>
        </div>
        <div className="h-10 bg-gray-700 rounded w-3/4"></div>
        <div className="space-y-2 pt-4">
          <div className="h-3 bg-gray-700 rounded w-1/3"></div>
          <div className="h-6 bg-gray-700 rounded w-full"></div>
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-gray-700 rounded w-1/3"></div>
          <div className="h-6 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

export default WalletSkeletonLoader;
