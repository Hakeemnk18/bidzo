export interface ICreatePaymentDTO {
  userId: string; 
  status?: "SUCCESS" | "FAILED" | "PENDING"; 
  method: string;
  amount: number;
  orderId: string;
  transactionId?: string;
  purpose: "SUBSCRIPTION" | "BID" | "AUCTION";
}