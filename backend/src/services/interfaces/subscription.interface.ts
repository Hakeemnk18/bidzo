import { ICreateSubscriptionDTO, IVerifyPaymentDTO } from "../../dtos/subscription.dto"
import { IRazorpayOrder } from "../../interfaces/razorpay"
import { Subscription } from "../../types/subscription.type"

export interface ISubscriptionService {
    createRazorpayOrder(planId: string, billing: string, userId: string):Promise<IRazorpayOrder>
    create(subscription: ICreateSubscriptionDTO): Promise<void>
    verifyPayment(data: IVerifyPaymentDTO, userId: string): Promise<void>
    getCurrentPlan(id: string): Promise<Subscription | null>
    updateExpire(id: string): Promise<void>
}