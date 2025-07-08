import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { HomeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage = 'An unexpected error occurred';
  let statusCode = '';

  if (isRouteErrorResponse(error)) {
    statusCode = error.status.toString();
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-bold text-chapa-500">{statusCode || 'Oops!'}</h1>
          <h2 className="mt-6 text-3xl font-extrabold">
            {statusCode === '404' ? 'Page Not Found' : 'Something went wrong'}
          </h2>
          <p className="mt-4 text-gray-400">
            {statusCode === '404' 
              ? 'The page you are looking for might have been removed or is temporarily unavailable.'
              : errorMessage}
          </p>
        </div>
        
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-chapa-600 hover:bg-chapa-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chapa-500"
          >
            <HomeIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Go home
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
