

interface FilterOptions {
    label: string;
    field: string; 
    options: { label: string; value: string }[];
}

interface TableFilterProp {
    filters: Record<string, string>;
    setFilters: ({ }: Record<string, any>) => void
    filterOptions: FilterOptions[]
}

const TableFilter = ({
    setFilters,
    filterOptions,
    filters
}: TableFilterProp) => {


    return (
        <div className="absolute right-50 top-45 mt-2 w-56 bg-[rgba(28,29,53,0.6)] border border-gray-700 rounded-lg shadow-lg p-4 z-50 text-white">


            {
                filterOptions.map((filter) => {
                    return (
                        <div key={filter.field} className="mb-4">
                            <label className="block mb-1 text-sm">{filter.label}</label>
                            <select
                                value={filters[filter.label]}
                                onChange={(e) => {

                                    setFilters({ ...filters, [filter.field]: e.target.value })
                                }}
                                className="w-full p-2 rounded bg-[#3b3f63] text-sm"
                            >   
                                {
                                    filter.options.map((opt)=>{
                                        return (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        )
                                    })
                                }
                                
                            </select>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TableFilter



