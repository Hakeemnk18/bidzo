import React, { useEffect, useState } from "react";
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

export interface AuctionItem {
  id: string;
  title: string;
  imageUrl: string; // Use a placeholder for now
  bids: number;
  timeLeft: string;
  currentPrice: number;
}

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
    ],
  },
];

const ProductListings = () => {
  const [items, setItems] = useState<PopulatedAuctionWithImage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sort, setSort] = useState("");
  const sortOptions = [
    { value: "", label: "All" },
    { value: "baseAsc", label: "Base Price Price: Low → High" },
    { value: "baseDesc", label: "Base Price: High → Low" },
    { value: "curAsc", label: "Current Price Price: Low → High" },
    { value: "curDesc", label: "Current Price: High → Low" },
  ];

  const fetchData = async () => {
    try {
      const res = await instance.get<IResAuctionWithImage>(`/user/auctions`, {
        params: {
          page: currentPage,
          search,
          sort,
          ...filters,
        },
      });
      if (res.data.success) {
        setItems(res.data.data);
        setTotalPages(res.data.totalPages);
      }
    } catch (error: any) {
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to fetch  data");
      }
      console.log("error in seller auction table ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, filters, sort, currentPage]);

  return (
    <div className="mt-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex gap-3 mb-10 text-white justify-end">
        <TableSearch search={search} setSearch={setSearch} />

        <button
          onClick={() =>{
            setShowSort(false)
            setShowFilters(!showFilters)
          } }
          className="bg-[#232447] px-3 py-2 rounded-lg flex items-center text-sm"
        >
          <FaFilter className="mr-1" /> Filters
        </button>
        <button
        onClick={() =>{
          setShowFilters(false)
          setShowSort(!showSort)
        } }
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

      {/* 2. Product Grid */}

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => (
            <ProductCard key={item._id} item={item} />
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
    </div>
  );
};

export default ProductListings;
