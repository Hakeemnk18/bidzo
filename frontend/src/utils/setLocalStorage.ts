import type { LoginResponse } from "../types/user.types";

export const setLocalStorageUser = (userData: LoginResponse) => {
  localStorage.setItem("authToken", userData.token);
  localStorage.setItem("userName", userData.name);
  localStorage.setItem("userRole", userData.role);
  localStorage.setItem("userId", userData.id);
  localStorage.setItem("bidCredit", JSON.stringify(userData.bidCredit));
};
