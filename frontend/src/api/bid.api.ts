import type { ApiResponse } from "../types/user.types";
import instance from "./axios";

interface INewBid {
  bidAmount: string;
  auctionId: string;
}

export const createBid = async (bidData: INewBid) => {
  const res = await instance.post<ApiResponse>("/user/bid", bidData);

  return res;
};
