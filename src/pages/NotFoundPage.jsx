import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 p-6">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
            <p className="text-sm md:text-base mb-6">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="px-4 py-2 text-sm font-semibold text-white bg-violet-800 hover:bg-violet-900 rounded-full transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
