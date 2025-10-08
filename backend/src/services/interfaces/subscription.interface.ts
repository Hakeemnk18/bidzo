import { ICreateSubscriptionDTO, IVerifyPaymentDTO, PopulatedSubscription } from "../../dtos/subscription.dto"
import { IRazorpayOrder } from "../../interfaces/razorpay"
import { Subscription } from "../../types/subscription.type"

export interface ISubscriptionService {
    createRazorpayOrder(planId: string, billing: string, userId: string):Promise<IRazorpayOrder>
    renewRazorpayOrder(userId: string):Promise<IRazorpayOrder>
    create(subscription: ICreateSubscriptionDTO): Promise<void>
    verifyPayment(data: IVerifyPaymentDTO, userId: string): Promise<void>
    renewVerifyPayment(data: IVerifyPaymentDTO, userId: string): Promise<void>
    getCurrentPlan(id: string): Promise<PopulatedSubscription | null>
    updateExpire(id: string): Promise<void>
    getCurrentOne(id: string): Promise<Subscription | null>
}