import z from "zod";
import { Plan } from "../../types/plan.type";
import { CustomError } from "../customError";
import { HttpStatusCode } from "../../constants/httpStatusCode";
import { ResponseMessages } from "../../constants/responseMessages";
import { Subscription } from "../../types/subscription.type";
import { response } from "express";

export const createSubscriptionSchema = z.object({
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


export const isValidPlan = (
    currentPlan: Plan,
    newPlan: Plan,
    currentSubscription: Subscription,
    billing: 'monthly' | 'yearly'
) => {
    
    if (currentPlan.planName === "Gold" && newPlan.planName === "Silver") {
        throw new CustomError(ResponseMessages.DOWN_GRADE_PLAN, HttpStatusCode.BAD_REQUEST)
    } else if (currentPlan.target !== newPlan.target) {
        throw new CustomError(ResponseMessages.PLAN_TARGET_MISMATCH, HttpStatusCode.BAD_REQUEST)
    } else if (
        newPlan.planName === "Gold" &&
        billing === 'monthly' &&
        currentSubscription.billing === 'yearly' &&
        currentPlan.planName === "Gold"
    ) {
        throw new CustomError(ResponseMessages.DOWN_GRADE_PLAN, HttpStatusCode.BAD_REQUEST)
    } else if (
        newPlan.planName === "Silver" &&
        billing === 'monthly' &&
        currentSubscription.billing === 'yearly' &&
        currentPlan.planName === "Silver"
    ) {
        throw new CustomError(ResponseMessages.DOWN_GRADE_PLAN, HttpStatusCode.BAD_REQUEST)
    }
}


export const isValidRenewalPlan = (currentSubscription: Subscription) => {
    const expiryDate = new Date(currentSubscription.endAt); 
    const today = new Date();
    const differenceInMs = expiryDate.getTime() - today.getTime();
    const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;
    if (differenceInMs < 0 || differenceInMs > fiveDaysInMs) {
        throw new CustomError(ResponseMessages.PLAN_RENEWAL_TOO_EARLY, HttpStatusCode.BAD_REQUEST)
    }
};