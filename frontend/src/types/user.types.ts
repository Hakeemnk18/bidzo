export interface LoginResponse {
  name: string;
  role: 'admin' | 'user' | 'seller';
  token: string;
}

export interface GoogleLoginResponse {
  success: boolean;
  message: string;
  data?: {
    name: string;
    role: 'admin' | 'user' | 'seller';
    token: string;
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
    isVerified: boolean,
    isBlocked: boolean
}

export interface IResGetUserData {
    success: boolean
    data: IuserData[],
    total: number,
    currentPage: number,
    totalPages: number
}