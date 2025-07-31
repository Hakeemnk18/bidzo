import { useEffect, useState } from "react";
import { FaTrash, FaSort, FaFilter } from "react-icons/fa";
import Pagination from "../../shared/components/Pagination";
import { toast } from "react-toastify";
import axios from "axios";
import TableSort from "../../shared/components/TableSort";
import TableSearch from "../../shared/components/TableSearch";
import TableFilter from "../../shared/components/TableFilter";


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
    const [filters, setFilters] = useState<Record<string, any>>({
        isBlocked: '',
        isVerified: ''
    })
    const [showFilters, setShowFilters] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [sort, setSort] = useState('')
    const sortOptions = [
        { value: '', label: 'All' },
        { value: 'A-Z', label: 'A-Z' },
        { value: 'Z-A', label: 'Z-A' }
    ];

    const filterOptions = [
        {
            label: 'Approvel',
            field: 'isVerified',
            options: [
                { value: '', label: 'All' },
                { value: 'true', label: 'Approved' },
                { value: 'false', label: 'Pending' }
            ]
        },
        {
            label: 'Status',
            field: 'isBlocked',
            options: [
                { value: '', label: 'All' },
                { value: 'true', label: 'Blocked' },
                { value: 'false', label: 'Unblock' }
            ]
        }
    ];






    const fetchData = async () => {

        try {

            const token = localStorage.getItem('authToken');

            const res = await axios.get<IResGetUserData>(
                `http://localhost:4004/admin/${role}/management`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: currentPage,
                        search,
                        sort,
                        ...filters,
                    },
                }
            );

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

    useEffect(() => {
        setCurrentPage(1);
    }, [search, sort, filters]);

    //fetch user data
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [currentPage, search, sort, filters])

    return (
        <div className="pt-34 pb-20">


            <div className="bg-gradient-to-r from-[#0d1128] to-[#1d1e33] p-6 rounded-xl text-white w-full max-w-5xl mx-auto ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Sellers</h2>
                    <div className="flex gap-3">

                        <TableSearch search={search} setSearch={setSearch} />

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="bg-[#232447] px-3 py-2 rounded-lg flex items-center text-sm">

                            <FaFilter className="mr-1" /> Filters
                        </button>
                        <button
                            onClick={() => setShowSort(!showSort)}
                            className="bg-[#232447] px-3 py-2 rounded-lg flex items-center text-sm">

                            <FaSort className="mr-1" /> Sort
                        </button>

                        {showFilters && (
                            <TableFilter
                                filters={filters}
                                setFilters={setFilters}
                                filterOptions={filterOptions}
                            />
                        )}

                        {/* sort modal */}

                        {showSort && (
                            <TableSort sort={sort} setSort={setSort} options={sortOptions} />
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
                    {data.length === 0 ?
                        <tbody>
                            <tr>
                                <td colSpan={4} className="py-10 text-center text-gray-300 text-base">
                                    No users found
                                </td>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className={`border-t border-[#2c2e4a] ${index === 3 ? "bg-[#3b3c79]" : "hover:bg-[#232447]"}`}>
                                    <td className="py-3">{item.name}</td>
                                    <td>
                                        <span

                                            className={`px-2 py-1 rounded-full text-xs font-medium ${item.isVerified ? "bg-[#1f3b7a] text-blue-300" : "bg-[#3e3f5c] text-gray-300"}`}>
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
                    }

                </table>


                <div className="flex justify-center mt-4 space-x-2">
                    <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </div>


    );
};

export default AuctionTable;
