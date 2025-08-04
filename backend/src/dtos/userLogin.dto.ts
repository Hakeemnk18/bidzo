import { IUserRepository } from "../repositories/interfaces/user.repo.interface";

export interface GoogleLoginDTO {
  token: string;
}

export interface CreateGoogleUserDTO {
  email: string;
  name: string;
  googleId: string;
  role: string;
}

export interface UserSignUpDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "user" | "admin" | "seller";
  isVerified:boolean
}


export interface UserLoginDTO {
  email: string;
  password: string;
  role: "user" | "admin" | "seller";
}

export interface UserLoginResponseDTO {
  name: string;
  role: "user" | "admin" | "seller";
  token: string;
}



export interface GetUsersDTO {
  role: string,
  search: string,
  page: number,
  limit: number,
  sortValue: string,
  filters: Record<string, any> 
}


export interface ResGetUser {
  id: string
  name: string,
  email: string,
  isVerified: boolean,
  isBlocked: boolean
}




