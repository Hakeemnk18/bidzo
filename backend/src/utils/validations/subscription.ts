import z from "zod";

export const createSubscriptionSchema =  z.object({
    planId: z.string().min(1, "Plan ID is required"),
    billing: z.enum(['monthly', 'yearly'], "Billing must be either 'monthly' or 'yearly'"),
})


export const verifyPaymentSchema = z.object({
    razorpay_order_id: z.string().min(1, "Razorpay order ID is required"),
    razorpay_payment_id: z.string().min(1, "Razorpay payment ID is required"),  
    razorpay_signature: z.string().min(1, "Razorpay signature is required"),
    planId: z.string().min(1, "Plan ID is required"),
    billing: z.enum(['monthly', 'yearly'], "Billing must be either 'monthly' or 'yearly'"),
})

