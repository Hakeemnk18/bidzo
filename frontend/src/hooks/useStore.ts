import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch,  } from "../store/store";

export const useStoreDispatch = ()=> useDispatch<AppDispatch>()
export const useStoreSelector : TypedUseSelectorHook<RootState> = useSelector