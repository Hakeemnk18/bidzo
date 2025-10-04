import type { IRazorpayOptions } from "../types/razorpay.type";

export const openRazorpayCheckout = (options: IRazorpayOptions) => {
  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};