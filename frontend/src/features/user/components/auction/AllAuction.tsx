import React, { useState } from 'react';

import { ProductCard } from './ProductCard';
import Pagination from '../../../shared/components/table/Pagination';
import TableSort from '../../../shared/components/table/TableSort';
import TableSearch from '../../../shared/components/table/TableSearch';
import { FaFilter, FaSort } from 'react-icons/fa6';
import TableFilter from '../../../shared/components/table/TableFilter';

export interface AuctionItem {
  id: string;
  title: string;
  imageUrl: string; // Use a placeholder for now
  bids: number;
  timeLeft: string;
  currentPrice: number;
}

// You can get placeholder car images from sites like Pexels or Unsplash
// I'll use a generic placeholder for this example.
const placeholderImg = "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export const mockAuctionItems: AuctionItem[] = [
  {
    id: "1",
    title: "BMW i7 Sedan",
    imageUrl: placeholderImg,
    bids: 62,
    timeLeft: "4 days left",
    currentPrice: 150000,
  },
  {
    id: "2",
    title: "BMW i7 Sedan",
    imageUrl: placeholderImg,
    bids: 45,
    timeLeft: "4 days left",
    currentPrice: 55000,
  },
  {
    id: "3",
    title: "BMW i7 Sedan",
    imageUrl: placeholderImg,
    bids: 68,
    timeLeft: "4 days left",
    currentPrice: 55000,
  },
  
];

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



const ProductListings = () => {
  // You can later use state for fetching, filtering, etc.
  const [items, setItems] = useState<AuctionItem[]>(mockAuctionItems);

  return (
    <div className="mt-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      
    <div className="flex gap-3 mb-10 text-white ">
            <TableSearch search={''} setSearch={()=>{}} />

            <button
              
              className="bg-[#232447] px-3 py-2 rounded-lg flex items-center text-sm"
            >
              <FaFilter className="mr-1" /> Filters
            </button>
            <button
              
              className="bg-[#232447] px-3 py-2 rounded-lg flex items-center text-sm"
            >
              <FaSort className="mr-1" /> Sort
            </button>

            {false && (
              <TableFilter
                filters={{}}
                setFilters={()=> {}}
                filterOptions={filterOptions}
              />
            )}

            {/* sort modal */}

            {false && (
              <TableSort sort={''} setSort={()=>{}} options={sortOptions} />
            )}
          </div>

      {/* 2. Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {/* 3. Pagination */}
      <div className="flex justify-center mt-4 space-x-2 mt-5">

         <Pagination
            totalPages={5}
            currentPage={2}
            setCurrentPage={()=> {}}
          />
      </div>

     
    </div>
  );
};

export default ProductListings