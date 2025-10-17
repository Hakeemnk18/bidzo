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
import type { IProductDTO, IResProduct } from "../../../../types/product.type";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import type {
  IAuctionData,
  IResAuction,
  IResGetAuction,
  PopulatedAuction,
} from "../../../../types/auction.type";
import { isDateInPast } from "../../../../utils/validDate";

const AuctionTable = () => {
  const role = localStorage.getItem("userRole");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<PopulatedAuction[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [auctionId, setAuctionId] = useState<string | null>(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(true);
  const [filters, setFilters] = useState<Record<string, any>>({
    isBlocked: "",
    isVerified: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sort, setSort] = useState("");
  const sortOptions = [
    { value: "", label: "All" },
    { value: "baseAsc", label: "Base Price Price: Low → High" },
    { value: "baseDesc", label: "Base Price: High → Low" },
  ];

  const filterOptions = [
    {
      label: "Status",
      field: "status",
      options: [
        { value: "", label: "All" },
        { value: "scheduled", label: "Scheduled" },
        { value: "running", label: "Running" },
        { value: "ended", label: "Ended" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
    {
      label: "Type",
      field: "type",
      options: [
        { value: "", label: "All" },
        { value: "auto", label: "Auto" },
        { value: "manual", label: "Manual" },
      ],
    },
  ];

  const fetchData = async () => {
    try {
      const res = await instance.get<IResAuction>(
        `/seller/auction/management`,
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
        console.log(res.data.data[0])
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
      }
    } catch (error: any) {
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to fetch user data");
      }
      console.log("error in admin user table ", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      navigate(`/seller/edit/product?id=${id}`);
    } catch (error) {}
  };

  const handleBlockAndUnblock = async () => {
    setIsConfirmModal(false);

    try {
      const point = isBlocked ? "block" : "unblock"
      const res = await instance.patch<ApiResponse>(
        `/${role}/auction/${auctionId}/${point}`
      );

      if (res.data.success) {
        toast(res.data.message);
        fetchData();
      }
    } catch (error: any) {
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to block/unblock");
      }
    }
  };

  const isEligibleForDelete = (
    status: "scheduled" | "running" | "ended" | "cancelled",
    isSold: boolean
  ): boolean => {
    if (isSold) return false;
    if (status !== 'scheduled') return false;
    return true;
  };

  const isEligibleForUnLock = (
    status: "scheduled" | "running" | "ended" | "cancelled",
    isSold: boolean,
    endAt: Date
  ): boolean => {
    if (isSold) return false;
    if (status !== "cancelled") return false;
    if(!isDateInPast(endAt)) return false
    return true
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort, filters]);

  //fetch user data
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [currentPage, search, sort, filters]);

  return (
    <div className="pt-34 pb-20">
      <div className="bg-gradient-to-r from-[#0d1128] to-[#1d1e33] p-6 rounded-xl text-white w-full max-w-5xl mx-auto ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Product</h2>
          <div className="flex gap-3">
            <TableSearch search={search} setSearch={setSearch} />

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-[#232447] px-3 py-2 rounded-lg flex items-center text-sm"
            >
              <FaFilter className="mr-1" /> Filters
            </button>
            <button
              onClick={() => setShowSort(!showSort)}
              className="bg-[#232447] px-3 py-2 rounded-lg flex items-center text-sm"
            >
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
              <th className="py-3">Product Name</th>
              <th>Base Price</th>
              <th>Status</th>

              <th>Current Bid</th>
              <th>TotalBid</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {data.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-gray-300 text-base"
                >
                  No Product found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`border-t border-[#2c2e4a] ${
                    index === 3 ? "bg-[#3b3c79]" : "hover:bg-[#232447]"
                  }`}
                >
                  <td className="py-3">{item.product.name}</td>
                  <td className="py-3">{item.basePrice}</td>
                  <td className="py-3">{item.status}</td>
                  <td className="py-3">{item.currentBid}</td>
                  <td className="py-3">{item.bids.length}</td>
                  <td className="py-3">
                    {" "}
                    {format(new Date(item.endAt), "dd-MM-yy")}
                  </td>
        
                  <td className="">
                    {isEligibleForDelete(item.status, item.isSold) ? (
                      <button onClick={() => {
                        setIsConfirmModal(true)
                        setIsBlocked(true)
                        setAuctionId(item._id)
                      }}>
                        <FaTrash className="text-red-400 cursor-pointer mr-5" />
                      </button>
                    ) : (
                      <></>
                    )}

                    {
                      isEligibleForUnLock(item.status, item.isSold, item.endAt) ? 
                      <button onClick={() => {
                        setIsConfirmModal(true)
                        setIsBlocked(false)
                        setAuctionId(item._id)
                      }}>
                        <FaUnlock className="text-red-400 cursor-pointer mr-5" />
                      </button> : <></>

                    }

                    {/* confirm modal */}
                    {isConfirmModal && (
                      <ConfirmModal
                        cnfBtnMessage="Confirm"
                        isOpen={isConfirmModal}
                        onConfirm={handleBlockAndUnblock}
                        onClose={() => setIsConfirmModal(false)}
                        message={
                          isBlocked
                            ? "Do You want block this auction"
                            : "Do You want unblock this auction"
                        }
                      />
                    )}
                    {/* sellerModal */}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        <div className="flex justify-center mt-4 space-x-2">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      {role === "seller" && (
        <div className="flex justify-end pt-4 max-w-5xl mx-auto ">
          <button
            onClick={() => {
              navigate("/seller/create/auction");
            }}
            className="bg-green-500 px-4 py-2 rounded-md font-bold text-gray-800"
          >
            Add Auction
          </button>
        </div>
      )}
    </div>
  );
};

export default AuctionTable;
