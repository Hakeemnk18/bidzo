import instance from "./axios";
import type { IResAuctionWithImage } from "../types/auction.type";


export const fetchAuctions = async (
  page: number, 
  search: string, 
  sort: string, 
  filters: any
) => {

  const res = await instance.get<IResAuctionWithImage>('/user/auctions', {
    params: {
      page,
      search,
      sort,
      ...filters,
    },
  });

  if (res.data.success) {
    return res.data;
  } else {

    throw new Error(res.data.message || 'Failed to fetch data');
  }
  
};

