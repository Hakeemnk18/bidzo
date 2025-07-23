import type { FC } from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <FaSpinner className="text-4xl text-blue-600 animate-spin" />
      <span className="ml-3 text-lg font-medium text-gray-600 animate-pulse">
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;