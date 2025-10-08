import type { IRazorpayOptions, IRazorpayOrder } from "../types/razorpay.type";
import instance from "../api/axios";
import type { ApiResponse } from "../types/user.types";
import { toast } from "react-toastify";
import { showErrorToast } from "./showErrorToast";
const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;


export const openRazorpayCheckout = (options: IRazorpayOptions) => {
  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};

export const openRazorpayCheckoutFunction = (
  order: IRazorpayOrder,
  URL: string
) => {
  openRazorpayCheckout({
    key: keyId,
    amount: order.amount,
    currency: order.currency,
    name: "Your App Name",
    description: "Subscription Plan",
    order_id: order.id,
    notes: order.notes,
    handler: async (response) => {
      try {
        
        const res = await instance.post<ApiResponse>(URL, {
          ...response,
          planId: order.notes?.planId, 
          billing: order.notes?.billing
        });
        if (res.data.success) {
          
          toast.success("payment successfull")
        }
      } catch (error) {
        showErrorToast(error)
        console.log("error inside verify subscription payment ",error)
      }


    },
    prefill: {
      email: "user@example.com",
      contact: "9999999999",
    },
  });
}