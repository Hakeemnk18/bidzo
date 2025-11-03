export type User = {
  id?: string;           
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: "user" | "admin" | "seller",
  isVerified: "pending" | "rejected" | "approved",
  isBlocked?: boolean,
  documentUrl?: string
  googleId?:string
  createdAt?: Date;
  updatedAt?: Date;
  submitCount?: number;
  bidCredit?: number
};



