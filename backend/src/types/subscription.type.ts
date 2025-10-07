import { IQouta } from "../interfaces/subscription";


export type Subscription = {
  _id?: string;
  userId: string;
  planId: string;
  startAt: Date;
  endAt: Date;
  qouta: IQouta[];
  isExpired: boolean;
  billing: 'monthly' | 'yearly';
  paymentId: string;
  createdAt?: Date;
  updatedAt?: Date;
}