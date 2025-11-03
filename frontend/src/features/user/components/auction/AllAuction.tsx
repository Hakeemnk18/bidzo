import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import Pagination from "../../../shared/components/table/Pagination";
import TableSort from "../../../shared/components/table/TableSort";
import TableSearch from "../../../shared/components/table/TableSearch";
import { FaFilter, FaSort } from "react-icons/fa6";
import TableFilter from "../../../shared/components/table/TableFilter";
import instance from "../../../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type {
  IResAuctionWithImage,
  PopulatedAuctionWithImage,
} from "../../../../types/auction.type";
import EmptyState from "../../../shared/components/EmptyList";
import { useAuctions } from "../../../../hooks/useAuction";
import { showErrorToast } from "../../../../utils/showErrorToast";
import { useBid } from "../../../../hooks/useBid";

export interface AuctionItem {
  id: string;
  title: string;
  imageUrl: string;
  bids: number;
  timeLeft: string;
  currentPrice: number;
}

const filterOptions = [
  {
    label: "Status",
    field: "status",
    options: [
      { value: "", label: "All" },
      { value: "scheduled", label: "Scheduled" },
      { value: "running", label: "Running" },
      { value: "ended", label: "Ended" },
    ],
  },
];

const sortOptions = [
  { value: "", label: "All" },
  { value: "baseAsc", label: "Base Price Price: Low → High" },
  { value: "baseDesc", label: "Base Price: High → Low" },
  { value: "curAsc", label: "Current Price Price: Low → High" },
  { value: "curDesc", label: "Current Price: High → Low" },
];

interface IBidFormData {
  bidAmount: string;
  currentBid: string;
  auctionId: string;
}

const ProductListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useBid()
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sort, setSort] = useState("");
  const [bidError, setBidError] = useState("");
  const {} = useAuctions(currentPage, search, sort, filters);
  const [formData, setFormData] = useState<IBidFormData>({
    currentBid: "",
    bidAmount: "",
    auctionId: "",
  });
  const [isShowBidModal, setIsShowBidModal] = useState(false);

  const {
    data,
    error,   
    isError, 
    isLoading
  } = useAuctions(currentPage, search, sort, filters);

  const handleBid = (auctionId: string, currentBid: string) => {
    setFormData({
      auctionId,
      currentBid,
      bidAmount: "",
    });

    setIsShowBidModal(true);
  };

  useEffect(() => {
    if (isError && error) {
        showErrorToast(error)
    }
  }, [isError, error]); 

  if (isLoading) {
    return <div>Loading auctions...</div>;
  }
  if (isError) {
    return <div>Error loading data. A toast notification has been sent.</div>
  }
  const items = data?.data || [];
  const totalPages = data?.totalPages || 0;

  const HandleBidSubmit = async () => {
    const { currentBid, bidAmount, auctionId } = formData;
    let error = "";
    if (bidAmount.trim() === "") {
      error = "Amount is required";
    }
    if (parseInt(currentBid) >= parseInt(bidAmount)) {
      error = "Bid should be greater than Current Bid Amount";
    }

    if (error) {
      setBidError(error);
      return;
    } else {
      setBidError("");
      await mutateAsync({ bidAmount, auctionId });
      setIsShowBidModal(false)
    }
  };
  

  return (
    <div className="mt-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex gap-3 mb-10 text-white justify-end">
        <TableSearch search={search} setSearch={setSearch} />

        <button
          onClick={() => {
            setShowSort(false);
            setShowFilters(!showFilters);
          }}
          className="bg-[#232447] px-3 py-2 rounded-lg flex items-center text-sm"
        >
          <FaFilter className="mr-1" /> Filters
        </button>
        <button
          onClick={() => {
            setShowFilters(false);
            setShowSort(!showSort);
          }}
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

      {/* 2. Product Grid */}

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => (
            <ProductCard handleBid={handleBid} key={item._id} item={item} />
          ))}
        </div>
      )}

      {/* 3. Pagination */}
      <div className="flex justify-center space-x-2 mt-5">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {isShowBidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
          <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <button
            onClick={()=> setIsShowBidModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Place Your Bid
            </h2>

            <div className="mb-4">
              <label
                htmlFor="bidAmount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Bid Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  ₹
                </span>
                <input
                  value={formData.bidAmount}
                  type="number"
                  id="bidAmount"
                  name="bidAmount"
                  onChange={(e) =>
                    setFormData({ ...formData, bidAmount: e.target.value })
                  }
                  className="w-full px-3 py-2 pl-7 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="0"
                />
              </div>
              {bidError && <p className="text-red-500 mt-1">{bidError}</p>}
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={HandleBidSubmit}
                type="submit"
                className="px-4 py-2 rounded-md bg-cyan-500 text-slate-900 font-bold hover:bg-cyan-400"
              >
                Submit Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListings;
