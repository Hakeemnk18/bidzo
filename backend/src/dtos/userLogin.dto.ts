

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
  phone: string;
  documentUrl?: string
  role: "user" | "admin" | "seller";
  isVerified: "pending" | "rejected" | "approved"
}


export interface UserLoginDTO {
  email: string;
  password: string;
  role: "user" | "admin" | "seller";
}

export interface UserLoginResponseDTO {
  name: string;
  role: "user" | "admin" | "seller";
  id: string
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
  documentUrl?:string,
  isVerified: "pending" | "rejected" | "approved",
  isBlocked: boolean
}

export interface IResProfile {
  name: string,
  email: string,
  phoneNumber: string
}








