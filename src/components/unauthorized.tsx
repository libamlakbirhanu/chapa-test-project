import { Link } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/24/outline';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 bg-opacity-10">
          <LockClosedIcon className="h-8 w-8 text-red-500" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-white">Access Denied</h2>
        <p className="text-gray-400">
          You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-chapa-600 hover:bg-chapa-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chapa-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
