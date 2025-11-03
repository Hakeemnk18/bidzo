import { login } from "../features/shared/slices/authSlice";
import type { LoginResponse } from "../types/user.types";
import { useStoreDispatch } from "./useStore";


export const useSetDispatch = () => {
  const dispatch = useStoreDispatch();

  const setUserData = (userData: LoginResponse)=>{
    dispatch(
    login({
      name: userData.name,
      role: userData.role,
      bidCredit: userData.bidCredit,
    })
  );
  }
  return setUserData
  
};
