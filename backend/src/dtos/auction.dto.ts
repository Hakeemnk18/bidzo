export interface ICreateAuctionDTO {
  product: string;
  basePrice: number;
  reservePrice: number;
  auctionType: "NORMAL" | "LIVE";
  startAt: Date;
  endAt: Date;
}
