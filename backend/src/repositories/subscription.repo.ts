import { injectable } from "tsyringe";
import { ICreateSubscriptionDTO, PopulatedSubscription } from "../dtos/subscription.dto";
import { SubscriptionModel } from "../models/subscription.model";
import { ISubscriptionRepo } from "./interfaces/subscription.repo.interface";
import { Subscription } from "../types/subscription.type";
import { PopulatedPlanId } from "../dtos/subscription.dto";

@injectable()
export class SubscriptionRepo implements ISubscriptionRepo {
    async create(subscription: ICreateSubscriptionDTO): Promise<void> {
        await SubscriptionModel.create(subscription)
    }
    async findOne(query: Record<string, any>): Promise<Subscription | null> {
        return await SubscriptionModel.findOne(query)
    }
    async updateExpire(id: string): Promise<void> {
        await SubscriptionModel.findOneAndUpdate({ _id: id }, { isExpired: true })
    }

    async currentSubscription(query: Record<string, any>): Promise<PopulatedSubscription | null> {
        const fieldsToSelect = '_id planName monthlyAmount yearlyAmount';
        const result = await SubscriptionModel.findOne(query).populate<{ planId: PopulatedPlanId }>('planId', fieldsToSelect);
        return result as PopulatedSubscription | null;
    }
}