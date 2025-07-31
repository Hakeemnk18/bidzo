

interface TableSortProps {
    sort: string;
    setSort: (val:string) => void;
    options: { label: string, value: string }[];
}

const TableSort = ({ sort, setSort, options} : TableSortProps) => {

    return (
        <div className="absolute right-30 top-45 mt-2 w-56 bg-[rgba(28,29,53,0.6)] border border-gray-700 rounded-lg shadow-lg p-4 z-50 text-white">
            <div className="mb-4">
                <select
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value)
                    }}
                    className="w-full p-2 rounded bg-[#3b3f63] text-sm"
                >
                    {
                        options.map((opt)=>{
                            return(
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default TableSort