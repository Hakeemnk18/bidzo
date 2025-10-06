
import payments from "razorpay/dist/types/payments";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { ResponseMessages } from "../constants/responseMessages";
import { ICreateSubscriptionDTO, IVerifyPaymentDTO } from "../dtos/subscription.dto";
import { IRazorpayOrder } from "../interfaces/razorpay";
import { ISubscriptionRepo } from "../repositories/interfaces/subscription.repo.interface";
import { CustomError } from "../utils/customError";
import { razorpayOrderCreat } from "../utils/razorpay.helper";
import { IPlanService } from "./interfaces/plan.interface";
import { ISubscriptionService } from "./interfaces/subscription.interface";
import { inject, injectable } from "tsyringe";
import { generatedSignature, verifySignature } from "../utils/hash";
import { IPaymentService } from "./interfaces/payment.interface";
import { da } from "zod/v4/locales/index.cjs";
import { IQouta } from "../interfaces/subscription";

@injectable()
export class SubscriptionService implements ISubscriptionService {
    constructor(
        @inject('IPlanService') private readonly planService: IPlanService,
        @inject('ISubscriptionRepo') private readonly subscriptionRepo: ISubscriptionRepo,
        @inject('IPaymentService') private readonly paymentService: IPaymentService
    ) { }
    async createRazorpayOrder(planId: string, billing: string, userId: string): Promise<IRazorpayOrder> {
        const plan = await this.planService.getPlan(planId)
        if (!plan) {
            throw new CustomError(ResponseMessages.NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }
        const amountRupees = billing === 'yearly' ? plan.yearlyAmount : plan.monthlyAmount;

        const amount = Math.round(amountRupees * 100);
        const order = await razorpayOrderCreat({
            amount,
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
            notes: { planId: planId.toString(), billing },
        })

        await this.paymentService.create({
            status: "PENDING",
            amount,
            orderId: order.id,
            purpose: "SUBSCRIPTION",
            method: "ONLINE",
            userId
        })

        return order
    }

    async create(subscription: ICreateSubscriptionDTO): Promise<void> {
        await this.subscriptionRepo.create(subscription)
    }

    async verifyPayment(data: IVerifyPaymentDTO, userId: string): Promise<void> {
        const generatedSig = generatedSignature(data.razorpay_order_id, data.razorpay_payment_id)
        const isValid = verifySignature(generatedSig, data.razorpay_signature)
        if (!isValid) {
            throw new CustomError(ResponseMessages.VALIDATION_FAILED, HttpStatusCode.BAD_REQUEST)
        }

        const payment = await this.paymentService.updateStatus(data.razorpay_order_id, 'SUCCESS')
        if (!payment) {
            throw new CustomError(ResponseMessages.NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }
        const start = new Date();
        const end = new Date(start);
        if (data.billing === 'yearly') {
            end.setFullYear(end.getFullYear() + 1);
        } else {
            end.setMonth(end.getMonth() + 1);
        }
        const paln = await this.planService.getPlan(data.planId)

        if (!paln) {
            throw new CustomError(ResponseMessages.NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }
        
        const qouta: IQouta[] = paln.features.map((item)=>{
            if(item.type === "count" && data.billing === 'yearly'){
                item.value = item.value * 12    
            }

            return {...item, used: 0}
        })
        await this.create({
            planId: data.planId,
            userId,
            paymentId: payment._id!,
            qouta,
            startAt: end,
            endAt: start,
        })

    }

}