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

export type PopulatedAuction = Omit<IAuctionData, 'product'> & { product: IResGetProductNameDTO }


export interface IResAuction{
    success: boolean;
    message: string;
    data: PopulatedAuction[];
    total: number,
    currentPage: number,
    totalPages: number
}
export interface IResGetProductNameDTO {
    _id: string;
    name: string;
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

export interface IResGetAuction {
    success: true,
    message: string,
    data: Omit<IAuctionData, 'product'> & { product: IResProductNameDTO }
}



export interface IAuctionFormData {
    product: string;   
    basePrice: string;
    reservePrice: string;     
    startAt: Date,
    endAt: Date,
    auctionType: "NORMAL" | "LIVE"
}  





