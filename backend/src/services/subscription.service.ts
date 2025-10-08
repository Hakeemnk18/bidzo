
import payments from "razorpay/dist/types/payments";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { ResponseMessages } from "../constants/responseMessages";
import { ICreateSubscriptionDTO, IVerifyPaymentDTO, PopulatedSubscription } from "../dtos/subscription.dto";
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
import { Subscription } from "../types/subscription.type";
import { isValidPlan } from "../utils/validations/subscription";
import items from "razorpay/dist/types/items";
import { IFeature } from "../dtos/plan.dto";

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
        const currentSubscription = await this.getCurrentOne(userId)
        if (currentSubscription && currentSubscription.planId.toString() === planId) {
            throw new CustomError(ResponseMessages.CURRENT_PLAN, HttpStatusCode.BAD_REQUEST)
        }
        if (currentSubscription) {
            const currentPlan = await this.planService.getPlan(currentSubscription.planId)
            isValidPlan(currentPlan!, plan, currentSubscription, billing as 'monthly' | 'yearly')
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
        const plan = await this.planService.getPlan(data.planId)
        if (!plan) {
            throw new CustomError(ResponseMessages.NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }
        const existingSubscription = await this.getCurrentOne(userId);
        let qouta: IQouta[] = plan.features.map((item) => {

            if (item.type === "count" && data.billing === 'yearly') {
                item.value = item.value * 12
            }
            return { id: item.id, feature: item.feature, value: item.value, type: item.type, used: 0 }

        })

        if (existingSubscription) {
            const currentPlan = await this.planService.getPlan(existingSubscription.planId)
            isValidPlan(currentPlan!, plan!, existingSubscription, data.billing)
            await this.updateExpire(existingSubscription._id!)
            const availableFeatures = existingSubscription.qouta.filter(item => item.type === 'count' && (item.value - item.used) > 0);
            if (availableFeatures.length > 0) {
                let qoutaObj: Record<string, any> = {}
                availableFeatures.forEach((items) => {
                    qoutaObj[items.feature] = { remainCount: items.value - items.used }
                })
                qouta = qouta.map((item): IQouta => {
                    if (qoutaObj[item.feature] && item.type === 'count') {
                        return { ...item, value: qoutaObj[item.feature].remainCount + item.value }
                    }
                    return item
                })
            }
        }

        const start = new Date();
        const end = new Date(start);
        if (data.billing === 'yearly') {
            end.setFullYear(end.getFullYear() + 1);
        } else {
            end.setMonth(end.getMonth() + 1);
        }

        await this.create({
            planId: data.planId,
            userId,
            paymentId: payment._id!,
            qouta,
            billing: data.billing,
            startAt: end,
            endAt: end,
        })

    }

    async getCurrentPlan(id: string): Promise<PopulatedSubscription | null> {
        return this.subscriptionRepo.currentSubscription({ userId: id, endAt: { $gt: new Date() }, isExpired: false })
    }

    async getCurrentOne(id: string): Promise<Subscription | null> {
        return this.subscriptionRepo.findOne({ userId: id, endAt: { $gt: new Date() }, isExpired: false })

    }


    async updateExpire(id: string): Promise<void> {
        return this.subscriptionRepo.updateExpire(id)
    }

}