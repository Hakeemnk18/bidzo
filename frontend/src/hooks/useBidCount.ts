import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchAllBidCOunts,
  fetchFilteredBidCounts,
} from "../api/bid.count.api";
import type { IBidCount, IResBid } from "../types/bid.type";
import type { AuctionQueryKey } from "./useAuction";

export const useBidCount = () => {
  return useQuery<IBidCount[]>({
    queryKey: ["bidCounts"],
    queryFn: fetchAllBidCOunts,
  });
};



export const useFilteredBidCounts = (
  currentPage: number,
  search: string,
  sort: string,
  filters: any
) => {
  const queryKey: AuctionQueryKey = [
    "auctions",
    { currentPage, search, sort, filters },
  ];

  const queryFn = () => fetchFilteredBidCounts(currentPage, search, sort, filters);

  return useQuery<IResBid, Error, IResBid, AuctionQueryKey>({
    queryKey: queryKey,
    queryFn: queryFn ,
    placeholderData: keepPreviousData,
  });
};
