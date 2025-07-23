export type User = {
  id?: string;           
  name: string;
  email: string;
  password?: string;
  phone?: number;
  role: "user" | "admin" | "seller"
  googleId?:string
  createdAt?: Date;
  updatedAt?: Date;
};

