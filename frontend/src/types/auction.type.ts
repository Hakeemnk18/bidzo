export interface IAuctionData {
  product: string;
  userId: string; 
  auctionType: "NORMAL" | "LIVE";
  startAt: Date;
  endAt: Date;
  basePrice: number;
  reservePrice: number; 
  currentBid: number;
  bids: IBid[];
  winner?: string;
  status: "scheduled" | "running" | "ended" | "cancelled";
  isSold: boolean;
  type: "auto" | "manual";
}

export interface IBid {
  bidder: String;
  amount: number;
  timestamp: Date;
}

export interface IResProductNameDTO {
    success: boolean;
    message: string;
    data: {id:string, productName:string}[];
}


const mockAuctions: IAuctionData[] = [
  // Mock Data 1: A scheduled NORMAL auction
  {
    product: "671f6e6be9a8d4a9f0e1a2b3",
    userId: "671f6e6be9a8d4a9f0e1a2b4",
    auctionType: "NORMAL",
    startAt: new Date("2025-10-20T10:00:00.000Z"),
    endAt: new Date("2025-10-27T10:00:00.000Z"),
    basePrice: 15000,
    reservePrice: 22000,
    currentBid: 0,
    bids: [],
    winner: undefined,
    status: "scheduled",
    isSold: false,
    type: "manual",
  },

  // Mock Data 2: An ended LIVE auction with a winner
  {
    product: "671f6e6be9a8d4a9f0e1a2c5",
    userId: "671f6e6be9a8d4a9f0e1a2c6",
    auctionType: "LIVE",
    startAt: new Date("2025-10-01T14:00:00.000Z"),
    endAt: new Date("2025-10-01T15:00:00.000Z"),
    basePrice: 5000,
    reservePrice: 8000,
    currentBid: 9500,
    bids: [
      {
        bidder: "671f6e6be9a8d4a9f0e1a2d7",
        amount: 6000,
        timestamp: new Date("2025-10-01T14:15:30.000Z"),
      },
      {
        bidder: "671f6e6be9a8d4a9f0e1a2d8",
        amount: 7500,
        timestamp: new Date("2025-10-01T14:35:10.000Z"),
      },
      {
        bidder: "671f6e6be9a8d4a9f0e1a2d9",
        amount: 8500,
        timestamp: new Date("2025-10-01T14:48:05.000Z"),
      },
      {
        bidder: "671f6e6be9a8d4a9f0e1a2d7", // Previous bidder bids again
        amount: 9500,
        timestamp: new Date("2025-10-01T14:59:12.000Z"),
      },
    ],
    winner: "671f6e6be9a8d4a9f0e1a2d7",
    status: "ended",
    isSold: true, // The final bid (9500) exceeded the reserve price (8000)
    type: "auto",
  },
];

export default mockAuctions;