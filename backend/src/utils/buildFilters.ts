export const buildFilters = (allowesFilters: string[], query: any): Record<string, any> => {
    const filters: Record<string, any> = {};
    allowesFilters.forEach((key)=>{
        if(query[key]){
            filters[key] = query[key]
        }
    })

    return filters
}