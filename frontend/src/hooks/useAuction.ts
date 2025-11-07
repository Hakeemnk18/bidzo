import { useQuery, keepPreviousData,} from '@tanstack/react-query';
import { fetchAuctions } from '../api/auction.api';
import type { IResAuctionWithImage } from '../types/auction.type'; 


export type AuctionQueryKey = [string, { currentPage: number; search: string; sort: string; filters: any }];

export const useAuctions = (currentPage: number, search: string, sort: string, filters: any) => {
  
  const queryKey: AuctionQueryKey = ['auctions', { currentPage, search, sort, filters }];
  const queryFn = () => fetchAuctions(currentPage, search, sort, filters);


  return useQuery<
    IResAuctionWithImage, 
    Error,              
    IResAuctionWithImage, 
    AuctionQueryKey    
  >({
    queryKey: queryKey,
    queryFn: queryFn,
    placeholderData: keepPreviousData,
  });
};