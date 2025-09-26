export interface LoginResponse {
  name: string;
  role: 'admin' | 'user' | 'seller';
  token: string;
  id: string
}

export interface GoogleLoginResponse {
  success: boolean;
  message: string;
  data?: {
    name: string;
    role: 'admin' | 'user' | 'seller';
    token: string;
    id: string
  };
  error?: string;
}

export interface AuthState {
    name: string | null,
    role: "admin" | "user" | "seller" | null,
    isAuthenticated: boolean,
    loading: boolean
}

export interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}


export interface IuserData {
    id: string;
    name: string,
    email: string,
    documentUrl: string,
    isVerified: "approved" | "pending" | "rejected",
    isBlocked: boolean
}

export interface IResGetUserData {
    success: boolean
    data: IuserData[],
    total: number,
    currentPage: number,
    documentUrl?: string,
    totalPages: number
}

export interface IResUserProfileData {
  success: boolean,
  data?: IUserProfileData
}

export interface IUserProfileData {
  name: string,
  email: string,
  phoneNumber: string
}