import { useEffect, useState } from "react";
import { FaTrash, FaSort, FaFilter, FaUnlock } from "react-icons/fa";
import Pagination from "../../shared/components/table/Pagination";
import { toast } from "react-toastify";
import TableSort from "../../shared/components/table/TableSort";
import TableSearch from "../../shared/components/table/TableSearch";
import TableFilter from "../../shared/components/table/TableFilter";
import type { IuserData, IResGetUserData, ApiResponse, GoogleLoginResponse } from "../../../types/user.types";
import ConfirmModal from "../../shared/components/modal/ConfirmationModal";
import instance from "../../../api/axios";
import SellerDocumentModal from "./modal/SellerDocument";


type AuctionTableProps = {
    role: string;
};


const AuctionTable = ({ role }: AuctionTableProps) => {



    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<IuserData[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [search, setSearch] = useState('')
    const [userId, setUserId] = useState<string | null>(null)
    const [isConfirmModal, setIsConfirmModal] = useState(false)
    const [isBlocked, setIsBlocked] = useState<boolean>(true)
    const [filters, setFilters] = useState<Record<string, any>>({
        isBlocked: '',
        isVerified: ''
    })
    const [showFilters, setShowFilters] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [sort, setSort] = useState('')
    const [sellerModal, setSellerModal] = useState(false)
    const [sellerId, setSellerId] = useState("")
    const [rejected, setRejected] = useState(false)

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
            

            const res = await instance.get<IResGetUserData>(
                `/admin/${role}/management`,
                {
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


    const handleBlockAndUnblock = async () => {
        setIsConfirmModal(false)

        try {

            const res = await instance.patch<ApiResponse>(
                '/admin/user/management',
                {
                    userId,
                },
            );

            if (res.data.success) {
                toast(res.data.message)
                fetchData()
            }


        } catch (error: any) {
            if (error.response && error.response.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to block/unblock");
            }
        }
    }

    useEffect(() => {
        setCurrentPage(1);
        setData([]);
        setTotalPages(0);
        setSearch('');
        setUserId(null);
        setIsConfirmModal(false);
        setIsBlocked(true);
        setFilters({
            isBlocked: '',
            isVerified: ''
        });
        setShowFilters(false);
        setShowSort(false);
        setSort('');
    }, [role]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, sort, filters]);

    //fetch user data
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [currentPage, search, sort, filters, role, rejected])


    const aprovelHandling = async () => {

        try {


            const res = await instance.patch<ApiResponse>(`/admin/seller/management/${sellerId}`)

            if (res.data.success) {
                toast(res.data.message)
                fetchData()
            }

        } catch (error: any) {
             if (error.response && error.response.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to block/unblock");
            }
        }


    }

    const sellerHandler = (id: string)=>{
        setSellerModal(true)
        setSellerId(id)
    }

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

                                        <button
                                            disabled={item.isVerified !== 'pending'}
                                            onClick={()=> sellerHandler(item.id)}
                                        >
                                            <span

                                                className={`px-2 py-1 rounded-full text-xs font-medium ${item.isVerified ? "bg-[#1f3b7a] text-blue-300" : "bg-[#3e3f5c] text-gray-300"}`}>
                                                {item.isVerified}
                                            </span>
                                        </button>

                                    </td>
                                    <td className="py-3 flex items-center gap-2">{item.email}</td>

                                    <td className="">

                                        {
                                            item.isBlocked ?
                                                <button
                                                    onClick={() => {
                                                        setIsConfirmModal(true)
                                                        setUserId(item.id)
                                                        setIsBlocked(false)
                                                    }}
                                                >
                                                    <FaUnlock className="text-red-400 cursor-pointer" />
                                                </button> :
                                                <button
                                                    onClick={() => {
                                                        setIsConfirmModal(true)
                                                        setUserId(item.id)
                                                        setIsBlocked(true)
                                                    }}
                                                >
                                                    <FaTrash className="text-red-400 cursor-pointer" />
                                                </button>

                                        }

                                        {/* confirm modal */}
                                        {
                                            isConfirmModal && <ConfirmModal
                                                isOpen={isConfirmModal}
                                                onConfirm={handleBlockAndUnblock}
                                                onClose={() => setIsConfirmModal(false)}
                                                message={isBlocked ? "Do You want delete this user" : "Do You want unblock this user"}
                                            />
                                        }
                                        {/* sellerModal */}
                                        {
                                            <SellerDocumentModal 
                                            onClose={()=> setSellerModal(false)}
                                            isOpen={sellerModal}
                                            handleApprove={aprovelHandling}
                                            id={sellerId}
                                            rejcted={()=> setRejected(true)}
                                            />
                                        }


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
