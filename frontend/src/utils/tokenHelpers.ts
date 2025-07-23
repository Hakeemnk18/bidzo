import { jwtDecode } from "jwt-decode";

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("authToken");
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (err) {
    console.error("Invalid token:", err);
    return false;
  }
};

export const clearToken = () => {
  localStorage.removeItem("authToken");
};