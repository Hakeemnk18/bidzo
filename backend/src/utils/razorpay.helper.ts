import { IRazorpayOrder, IRazorpayOrderOptions, IRazorpayPayment } from "../interfaces/razorpay";
import { razorpay } from "../config/razorpay";
import axios from "axios";

export const razorpayOrderCreat = async (options: IRazorpayOrderOptions): Promise<IRazorpayOrder> => {
    return await razorpay.orders.create(options);
}


export const  fetchPaymentDetails = async(paymentId: string):Promise<IRazorpayPayment> =>{
  try {
    return await razorpay.payments.fetch(paymentId);
  } catch (sdkErr:any) {
    console.warn('Razorpay SDK fetch failed:', sdkErr?.message || sdkErr);
    try {
      const response = await axios.get(
        `https://api.razorpay.com/v1/payments/${paymentId}`,
        {
          auth: { username: process.env.RAZORPAY_KEY_ID!, password: process.env.RAZORPAY_KEY_SECRET! },
          timeout: 5000
        }
      );
      const data: any = response
      return data;
    } catch (restErr: any) {
      console.error('Razorpay REST fetch failed:', restErr?.response?.status, restErr?.message);
      throw restErr;
    }
  }
}








