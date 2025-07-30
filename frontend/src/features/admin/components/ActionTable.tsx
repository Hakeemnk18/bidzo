import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaSearch, FaFilter } from "react-icons/fa";
import { FiImage, FiVideo } from "react-icons/fi";
import { GiMusicalNotes } from "react-icons/gi";
import { useRouterRole } from "../../../hooks/useRouterRole";
import Pagination from "../../shared/components/Pagination";
import { toast } from "react-toastify";
import axios from "axios";


interface IuserData {
    name: string,
    email: string,
    isVerified: boolean,
    isBlocked: boolean
}

interface IResGetUserData {
    success: boolean
    data: IuserData[],
    total: number,
    currentPage: number,
    totalPages: number
}

type AuctionTableProps = {
    role: string;
};





const AuctionTable = ({ role }: AuctionTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<IuserData[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [filterField, setFIlterField] = useState('')
    const [showFilters, setShowFilters] = useState(false);





    const fetchData = async () => {

        try {

            const res = await axios.get<IResGetUserData>(`http://localhost:4004/admin/${role}/management?page=${currentPage}&search=${search}&filterField=${filterField}&filter=${filter}`)

            if (res.data.success) {
                setData(res.data.data)
                setTotalPages(res.data.totalPages)
            }

        } catch (error: any) {
            if (error.response && error.response.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to fetch user data");
            }
            console.log("error in admin user table ", error)
        }

    }

    //fetch user data
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [currentPage, search, filter, filterField])

    return (
        <div className="pt-34 pb-20">


            <div className="bg-gradient-to-r from-[#0d1128] to-[#1d1e33] p-6 rounded-xl text-white w-full max-w-5xl mx-auto ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Sellers</h2>
                    <div className="flex gap-3">
                        <div className="flex items-center bg-[#232447] px-3 py-1 rounded-lg">
                            <FaSearch className="text-gray-400 mr-2" />
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-transparent outline-none text-sm" placeholder="Search" />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="bg-[#232447] px-3 py-2 rounded-lg flex items-center text-sm">

                            <FaFilter className="mr-1" /> Filters
                        </button>
                        {showFilters && (
                            <div className="absolute right-30 top-45 mt-2 w-56 bg-[rgba(28,29,53,0.6)] border border-gray-700 rounded-lg shadow-lg p-4 z-50 text-white">


                                <div className="mb-4">
                                    <label className="block mb-1 text-sm">Status</label>
                                    <select
                                        onChange={(e) => {
                                            setFIlterField('isVerified')
                                            setFilter(e.target.value)
                                        }}
                                        className="w-full p-2 rounded bg-[#3b3f63] text-sm"
                                    >
                                        <option value="">All</option>
                                        <option value="active">Active</option>
                                        <option value="blocked">Blocked</option>
                                    </select>
                                </div>


                            </div>
                        )}
                    </div>
                </div>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-400">
                            <th className="py-3">Name</th>
                            <th>Status</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className={`border-t border-[#2c2e4a] ${index === 3 ? "bg-[#3b3c79]" : "hover:bg-[#232447]"}`}>
                                <td className="py-3">{item.name}</td>
                                <td>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.isVerified ? "bg-[#1f3b7a] text-blue-300" : "bg-[#3e3f5c] text-gray-300"}`}>
                                        {item.isVerified ? 'Approved' : 'Pending'}
                                    </span>
                                </td>
                                <td className="py-3 flex items-center gap-2">{item.email}</td>

                                <td className="">

                                    <FaTrash className="text-red-400 cursor-pointer" />


                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <div className="flex justify-center mt-4 space-x-2">
                    <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </div>


    );
};

export default AuctionTable;
