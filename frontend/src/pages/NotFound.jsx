import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn't exist or has been moved. Please check the URL or navigate back home.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            <FaHome />
            Go Home
          </Link>
          <Link
            to="/jobs"
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <FaSearch />
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
