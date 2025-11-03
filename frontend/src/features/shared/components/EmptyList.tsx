const EmptyState = () => {


  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-20 px-6 
                   bg-slate-800/60 backdrop-blur-sm rounded-xl shadow-lg text-center">
      
      {/* Icon (Heroicons: ArchiveBox) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-24 h-24 text-cyan-500 opacity-60"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 11.25h3M10.5 15h3M3.375 5.625c0-1.036.84-1.875 1.875-1.875h13.5c1.036 0 1.875.84 1.875 1.875v1.875c0 .73-.423 1.368-1.03 1.688a2.25 2.25 0 01-1.72 0c-.607-.32-1.03-.957-1.03-1.688V5.625H3.375v1.875c0 .73-.423 1.368-1.03 1.688a2.25 2.25 0 01-1.72 0c-.607-.32-1.03-.957-1.03-1.688V5.625z" 
        />
      </svg>
      
      <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
        No Items Found
      </h3>
      <p className="text-lg text-gray-300">
        There are currently no items available. Please check back later.
      </p>
    </div>
  );
};

export default EmptyState