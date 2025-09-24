import { useEffect, useState } from "react";
import { FaTrash, FaSort, FaFilter, FaUnlock, FaEdit } from "react-icons/fa";
import Pagination from "../../../shared/components/table/Pagination";
import { toast } from "react-toastify";
import TableSort from "../../../shared/components/table/TableSort";
import TableSearch from "../../../shared/components/table/TableSearch";
import TableFilter from "../../../shared/components/table/TableFilter";
import type { ApiResponse } from "../../../../types/user.types";
import ConfirmModal from "../../../shared/components/modal/ConfirmationModal";
import instance from "../../../../api/axios";
import type { IFeaturesOptions, IPlanData, IResGetPlanData } from "../../../../types/plan,types";
import FeatureModal from "../modal/planFeatureModal";





const PlanTable = () => {



    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<IPlanData[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [search, setSearch] = useState('')
    const [planId, setPlanId] = useState<string | null>(null)
    const [isConfirmModal, setIsConfirmModal] = useState(false)
    const [isBlocked, setIsBlocked] = useState<boolean>(true)
    const [isFeatureModal, setIsFeatureModal] = useState(false)
    const [filters, setFilters] = useState<Record<string, any>>({})
    const [showFilters, setShowFilters] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [sort, setSort] = useState('')
    const [currentFeatures, setCurrentFeatures] = useState<IFeaturesOptions[] | []>([])

    const sortOptions = [
        { value: '', label: 'All' },
        { value: 'A-Z', label: 'A-Z' },
        { value: 'Z-A', label: 'Z-A' },
        { value: 'monthlyAsc', label: 'Monthly Price: Low → High' },
        { value: 'monthlyDesc', label: 'Monthly Price: High → Low' },
        { value: 'yearlyAsc', label: 'Yearly Price: Low → High' },
        { value: 'yearlyDesc', label: 'Yearly Price: High → Low' },
    ];

    const filterOptions = [
        {
            label: 'Status',
            field: 'isDeleted',
            options: [
                { value: '', label: 'All' },
                { value: 'true', label: 'Blocked' },
                { value: 'false', label: 'Unblock' }
            ]
        }
    ];



    const fetchData = async () => {

        try {


            const res = await instance.get<IResGetPlanData>(
                `/admin/plan/management`,
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
                '/admin/plan',
                {
                    planId,
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

    const handleShowFeature = (features: IFeaturesOptions[]) => {
        setIsFeatureModal(true)
        setCurrentFeatures(features)
    }

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    //fetch plan data
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
                    <h2 className="text-xl font-semibold">Plans</h2>
                    <div className="flex gap-3">

                        <TableSearch search={search} setSearch={setSearch} />

                        <button
                            onClick={() => {
                                setShowFilters(!showFilters)
                                setShowSort(false)
                            }}
                            className="bg-[#232447] px-3 py-2 rounded-lg flex items-center text-sm">

                            <FaFilter className="mr-1" /> Filters
                        </button>
                        <button
                            onClick={() => {
                                setShowSort(!showSort)
                                setShowFilters(false)
                            }}
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

                <table className="w-full text-sm  ">
                    <thead>
                        <tr className="text-left text-gray-400">
                            <th className="py-3">Name</th>
                            <th>Target</th>
                            <th>Status</th>
                            <th>Monthly</th>
                            <th>Yearly</th>
                            <th >More Info</th>
                            <th >Actions</th>

                        </tr>
                    </thead>
                    {data.length === 0 ?
                        <tbody>
                            <tr>
                                <td colSpan={5} className="py-10 text-center text-gray-300 text-base">
                                    No plans found
                                </td>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className={`border-t border-[#2c2e4a] ${index === 3 ? "bg-[#3b3c79]" : "hover:bg-[#232447]"}`}>
                                    <td className="py-3">{item.planName}</td>
                                    <td className="py-3">{item.target}</td>
                                    <td>

                                        <span>
                                            {item.isDeleted ? "Block" : "UnBlock"}
                                        </span>

                                    </td>
                                    <td className="">{item.monthlyAmount}</td>
                                    <td className="">{item.yearlyAmount}</td>
                                    <td >
                                        <button
                                            onClick={() => handleShowFeature(item.features)}
                                            className="text-blue-300">Features</button>

                                    </td>

                                    <td className="">
                                        {
                                            item.isDeleted ?
                                                <button
                                                    onClick={()=>{
                                                        setIsConfirmModal(true)
                                                        setPlanId(item.id)
                                                        setIsBlocked(false)
                                                    } }
                                                    className="mr-5"
                                                >
                                                    <FaUnlock className="text-red-400 cursor-pointer" />
                                                </button> :
                                                <button
                                                    onClick={()=>{
                                                        setIsConfirmModal(true)
                                                        setPlanId(item.id)
                                                        setIsBlocked(true)
                                                    } }
                                                    className="mr-5"
                                                >
                                                    <FaTrash className="text-red-400 cursor-pointer" />
                                                </button>

                                        }
                                        <button

                                        >
                                            <FaEdit className="text-blue-400 cursor-pointer text-lg" />
                                        </button>
                                    </td>

                                        {/* confirm modal */}
                                        {
                                            isConfirmModal && <ConfirmModal
                                                isOpen={isConfirmModal}
                                                onConfirm={handleBlockAndUnblock}
                                                onClose={() => setIsConfirmModal(false)}
                                                message={isBlocked ? "Do You want block this plan" : "Do You want unblock this plan"}
                                            />
                                        }


                                </tr>
                            ))}
                        </tbody>
                    }

                </table>
                {
                    isFeatureModal && <FeatureModal
                        onClose={() => setIsFeatureModal(false)}
                        isOpen={isFeatureModal}
                        features={currentFeatures}
                    />
                }

                <div className="flex justify-center mt-4 space-x-2">
                    <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>


            </div>
            <div className="flex justify-end pt-4 max-w-5xl mx-auto ">
                <button
                    className="bg-green-500 px-4 py-2 rounded-md font-bold text-gray-800"
                >Add Plan</button>
            </div>

        </div>


    );
};

export default PlanTable;
