import { useState } from "react"

interface PaginationProp {
  totalPages: number;
  setCurrentPage: (page: number) => void;
  currentPage: number,
  
}
const Pagination = ({ totalPages, setCurrentPage, currentPage, }: PaginationProp) => {

    
    
    return (
        <>
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${currentPage > 1 ?"bg-[#3b3c79] text-white" : "bg-[#232447] text-gray-400" }`}
            >
                Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentPage(i+1)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${currentPage === i + 1 ? "bg-[#3b3c79] text-white" : "bg-[#232447] text-gray-400"}`}
                >
                    {i + 1}
                </button>
            ))}
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-full text-sm font-medium ${currentPage < totalPages ?"bg-[#3b3c79] text-white" : "bg-[#232447] text-gray-400" }`}
            >
                Next
            </button>
        </>
    )
}

export default Pagination