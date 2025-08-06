export type User = {
  id?: string;           
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: "user" | "admin" | "seller",
  isVerified: "pending" | "rejected" | "approved",
  isBlocked?: boolean,
  googleId?:string
  createdAt?: Date;
  updatedAt?: Date;
};



