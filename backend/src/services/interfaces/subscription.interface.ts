import { IRazorpayOrder } from "../../interfaces/razorpay"

export interface ISubscriptionService {
    createRazorpayOrder(planId: string, billing: string):Promise<IRazorpayOrder>
}