import { IRazorpayOrder, IRazorpayOrderOptions } from "../interfaces/razorpay";
import { razorpay } from "../config/razorpay";

export const razorpayOrderCreat = async (options: IRazorpayOrderOptions): Promise<IRazorpayOrder> => {
    return await razorpay.orders.create(options);
}









