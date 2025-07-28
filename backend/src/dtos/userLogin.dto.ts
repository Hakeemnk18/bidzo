import { IUserRepository } from "../repositories/user.repo.interface";

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





