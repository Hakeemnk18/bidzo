import { IVerifyPaymentDTO } from "../dtos/subscription.dto";


export class SubscriptionMappers {
    static toVerifyPaymentDTO(data: any): IVerifyPaymentDTO{
        return{
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            planId: data.planId,
            billing: data.billing
        }
    }
}

