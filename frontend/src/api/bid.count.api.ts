import type{ IBidCount, IResBid, IResCurrentBids } from "../types/bid.type";
import type { ApiResponse } from "../types/user.types";
import instance from "./axios"

export const fetchAllBidCOunts = async()=>{

    const res = await instance.get<IResCurrentBids>('/admin/bidCount')

    if (res.data.success) {
    return res.data.data;
  } else {

    throw new Error(res.data.message || 'Failed to fetch data');
  }
}

export const createBidPack = async(bidPack: IBidCount)=>{
  const res = await instance.post<ApiResponse>('/admin/bidCount', bidPack)

  return res
}

export const fetchFilteredBidCounts = async (page: number, search: string, sort: string, filters: any)=>{
  
    const res = await instance.get<IResBid>('/admin/bidCount/management',{
    params: {
      page,
      search,
      sort,
      ...filters,
    },
  })
    if (res.data.success) {
    return res.data;
  } else {

    throw new Error(res.data.message || 'Failed to fetch data');
  }
}

export const deleteBidPack = async(id: string) => {
  const res = await instance.delete<ApiResponse>(`/admin/bidCount/${id}`)

  return res
}