
import { HttpStatusCode } from "../constants/httpStatusCode";
import { ResponseMessages } from "../constants/responseMessages";
import { IRazorpayOrder } from "../interfaces/razorpay";
import { CustomError } from "../utils/customError";
import { razorpayOrderCreat } from "../utils/razorpay.helper";
import { IPlanService } from "./interfaces/plan.interface";
import { ISubscriptionService } from "./interfaces/subscription.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class SubscriptionService implements ISubscriptionService {
    constructor(
        @inject('IPlanService') private readonly planService: IPlanService
    ) { }
    async createRazorpayOrder(planId: string, billing: string): Promise<IRazorpayOrder> {
        const plan = await this.planService.getPlan(planId)
        if (!plan) {
            throw new CustomError(ResponseMessages.NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }
        const amountRupees = billing === 'yearly' ? plan.yearlyAmount : plan.monthlyAmount;

        const amount = Math.round(amountRupees * 100);
        return await razorpayOrderCreat({
            amount, 
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
            notes: { planId: planId.toString(), billing },
        })
    }
}