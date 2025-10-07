import { Plan } from "./plan.type";

export type Subscription = {
  _id?: string;
  userId: string;
  planId: string;
  startAt: Date;
  endAt: Date;
  qouta: string;
  billing: 'monthly' | 'yearly';
  paymentId: string;
  createdAt?: Date;
  updatedAt?: Date;
}