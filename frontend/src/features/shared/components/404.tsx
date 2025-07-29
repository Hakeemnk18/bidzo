import React from "react";
import { Link } from "react-router-dom";

const RouteError: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-400 to-purple-100">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center animate-fade-in">
        {/* Gavel Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-yellow-500 mb-6"
          fill="none"
          viewBox="0 0 48 48"
          stroke="currentColor"
        >
          <rect x="27" y="6" width="12" height="6" rx="2" fill="#FBBF24" />
          <rect
            x="13.464"
            y="19.464"
            width="16.971"
            height="6"
            rx="2"
            transform="rotate(-45 13.464 19.464)"
            fill="#A78BFA"
          />
          <rect
            x="9"
            y="34"
            width="30"
            height="4"
            rx="2"
            fill="#F59E42"
          />
        </svg>
        <h1 className="text-4xl font-extrabold text-yellow-600 mb-4 drop-shadow-sm">
          404: Auction Not Found!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Looks like the item you're bidding on doesn't exist.<br />
          Maybe it's already gone under the hammer.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 hover:bg-yellow-600 text-white font-bold rounded-full shadow transition duration-200"
        >
          Back to Auctions
        </Link>
      </div>
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.95);}
          100% { opacity: 1; transform: scale(1);}
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease;
        }
      `}</style>
    </div>
  );
};

export default RouteError;
