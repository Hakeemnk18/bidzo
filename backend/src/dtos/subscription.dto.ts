import { IQouta } from "../interfaces/subscription";

export interface ICreateSubscriptionDTO {
  userId: string;       
  planId: string;       
  startAt: Date;
  endAt: Date;
  qouta: IQouta[];
  paymentId: string;    
}

export interface IVerifyPaymentDTO {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  planId: string;
  billing: string
}