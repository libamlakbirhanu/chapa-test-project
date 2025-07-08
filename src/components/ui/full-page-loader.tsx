export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg font-medium text-white">Loading...</p>
      </div>
    </div>
  );
}
