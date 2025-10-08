import { IQouta } from "../interfaces/subscription";
import { Subscription } from "../types/subscription.type";

export interface ICreateSubscriptionDTO {
  userId: string;
  planId: string;
  startAt: Date;
  billing: 'monthly' | 'yearly';
  endAt: Date;
  qouta: IQouta[];
  paymentId: string;
}

export interface IVerifyPaymentDTO {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  planId: string;
  billing: 'monthly' | 'yearly';
}

export interface IResCurrentPlan {
  _id?: string;
  userId: string;
  planId: ICurrentPlan;
  startAt: Date;
  endAt: Date;
  qouta: IQouta[];
  isExpired: boolean;
  billing: 'monthly' | 'yearly';
}

export interface ICurrentPlan {
  _id: string;
  planName: string; 
  monthlyAmount: number;
  yearlyAmount: number;
};

export type PopulatedPlanId = Pick<ICurrentPlan, '_id' | 'planName' | 'monthlyAmount' | 'yearlyAmount'>;


export type PopulatedSubscription = Omit<Subscription, 'planId'> & {
  planId: PopulatedPlanId; 
};