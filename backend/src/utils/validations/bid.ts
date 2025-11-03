import z from "zod";

export const createBidSchema = z.object({
  bidAmount: z.coerce.number().min(1, "Bid amount must be greater than 0"),
  auctionId: z.string().trim().min(1, "Auction id is required"),
});