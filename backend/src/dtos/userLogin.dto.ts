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

// export interface GoogleUserDTO {
//   email: string;
//   name: string;
//   googleId: string;
//   role: string;
//   repo: IUserRepository;
// }



export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserLoginResponseDTO {
  name: string;
  role: "user" | "admin" | "seller";
  token: string;
}





