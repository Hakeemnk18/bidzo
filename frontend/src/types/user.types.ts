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
    isAuthenticated: boolean
}

export interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}