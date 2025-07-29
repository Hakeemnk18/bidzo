export type User = {
  id?: string;           
  name: string;
  email: string;
  password?: string;
  phone?: number;
  role: "user" | "admin" | "seller",
  isVerified?: boolean,
  isBlocked?: boolean,
  googleId?:string
  createdAt?: Date;
  updatedAt?: Date;
};



