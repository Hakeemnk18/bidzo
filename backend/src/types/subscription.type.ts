export type Subscription = {
  _id?: string;
  userId: string;
  planId: string;
  startAt: Date;
  endAt: Date;
  qouta: string;
  paymentId: string;
  createdAt?: Date;
  updatedAt?: Date;
}