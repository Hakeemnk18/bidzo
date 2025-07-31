
import { FaSearch } from "react-icons/fa";



interface TableSearchProp {
    setSearch: (val: string) => void;
    search: string
}



const TableSearch = ({ 
    setSearch,
    search
} : TableSearchProp) => {

    return (
        
            <div className="flex items-center bg-[#232447] px-3 py-1 rounded-lg">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    className="bg-transparent outline-none text-sm" placeholder="Search" />
            </div>  
        
    )
}

export default TableSearch