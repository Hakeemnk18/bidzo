import { IResCurrentPlan, IVerifyPaymentDTO, PopulatedSubscription } from "../dtos/subscription.dto";
import { Subscription } from "../types/subscription.type";


export class SubscriptionMappers {
    static toVerifyPaymentDTO(data: any): IVerifyPaymentDTO {
        return {
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            planId: data.planId,
            billing: data.billing
        }
    }
    static toResCurrentPlan(data: PopulatedSubscription): IResCurrentPlan {
        return {
            _id: data._id,
            userId: data.userId,
            planId: data.planId,
            startAt: data.startAt,
            endAt: data.endAt,
            qouta: data.qouta,
            isExpired: data.isExpired,
            billing: data.billing,
        }
    }
}

