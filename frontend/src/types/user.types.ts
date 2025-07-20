export interface LoginResponse {
  name: string;
  role: 'admin' | 'user' | 'seller';
  token: string;
}

export interface AuthState {
    name: string | null,
    role: "admin" | "user" | "seller" | null,
    isAuthenticated: boolean
}