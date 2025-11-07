import { useEffect, useState } from "react";
import { FaSort, FaFilter, FaEdit } from "react-icons/fa";
import Pagination from "../../../shared/components/table/Pagination";
import TableSort from "../../../shared/components/table/TableSort";
import TableSearch from "../../../shared/components/table/TableSearch";
import TableFilter from "../../../shared/components/table/TableFilter";
import BidCountModal from "./CreateBid";
import { useFilteredBidCounts } from "../../../../hooks/useBidCount";
import { showErrorToast } from "../../../../utils/showErrorToast";
import { FaTrash } from "react-icons/fa6";
import ConfirmModal from "../../../shared/components/modal/ConfirmationModal";
import { useDeletePack } from "../../../../hooks/useDeleteBidPack";

const sortOptions = [
  { value: "", label: "All" },
  { value: "asc", label: "Count: Low → High" },
  { value: "desc", label: "Count: High → Low" },
];

const filterOptions = [
  {
    label: "Sort by Amount",
    field: "amount",
    options: [
      { value: "", label: "All" },
      { value: "asc", label: "Amount: Low → High" },
      { value: "desc", label: "Amount: High → Low" },
    ],
  },
];

const BidTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModal, setIsAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [bidPackId, setBidPackId] = useState<string | null>(null);
  const { mutateAsync} = useDeletePack()
  const { data, error, isError, isLoading } = useFilteredBidCounts(
    currentPage,
    search,
    sort,
    filters
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort]);

  useEffect(() => {
    if (isError && error) {
      showErrorToast(error);
    }
  }, [isError, error]);

  const handleDelete = ()=>{
    console.log("bid id ",bidPackId)
    mutateAsync(bidPackId!)
  }

  if (isLoading) {
    return <div>Loading auctions...</div>;
  }
  if (isError) {
    return <div>Error loading data. A toast notification has been sent.</div>;
  }
  const items = data?.data || [];
  const totalPages = data?.totalPages || 0;

  console.log("slected id ",bidPackId)
  return (
    <div className="pt-34 pb-20">
      <div className="bg-gradient-to-r from-[#0d1128] to-[#1d1e33] p-6 rounded-xl text-white w-full max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bid Count Table</h2>
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
                filters={{}}
                setFilters={() => {}}
                filterOptions={filterOptions}
              />
            )}

            {showSort && (
              <TableSort sort={sort} setSort={setSort} options={sortOptions} />
            )}
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="py-3">#</th>
              <th>Bid Count</th>
              <th>Amount</th>
              <th>Unit Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          {items.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={3}
                  className="py-10 text-center text-gray-300 text-base"
                >
                  No Bids Found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className={`border-t border-[#2c2e4a] ${
                    index % 2 === 0 ? "bg-[#232447]" : ""
                  }`}
                >
                  <td className="py-3">{index + 1}</td>
                  <td>{item.bidCount}</td>
                  <td>{item.amount}</td>
                  <td>{Math.floor((item.amount / item.bidCount) * 2) / 2}</td>
                  <td className="">
                    
                      <button
                        onClick={() => {
                          setIsConfirmModal(true);
                          setBidPackId(item._id);
                         
                        }}
                      >
                        <FaTrash className="text-red-400 cursor-pointer mr-5" />
                      </button>
                    
                    <button
                      onClick={() => {
                        setBidPackId(item._id);
                        // handleEditAndCreate(
                        //   item.categoryName,
                        //   item.description,
                        //   "edit"
                        // );
                      }}
                    >
                      <FaEdit className="text-blue-400 cursor-pointer text-lg" />
                    </button>

                    {/* confirm modal */}
                    {isConfirmModal && (
                      <ConfirmModal
                        cnfBtnMessage="Confirm"
                        isOpen={isConfirmModal}
                        onConfirm={handleDelete}
                        onClose={() => setIsConfirmModal(false)}
                        message={
                          "Do You want delete  this bid pack"
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
      <div className="flex justify-end pt-4 max-w-5xl mx-auto ">
        <button
          onClick={() => {
            setIsAddModal(true);
          }}
          className="bg-green-500 px-4 py-2 rounded-md font-bold text-gray-800"
        >
          Add Bid Count
        </button>
      </div>
      {isAddModal && (
        <BidCountModal
          isOpen={isAddModal}
          onClose={() => setIsAddModal(false)}
        />
      )}
    </div>
  );
};

export default BidTable;
