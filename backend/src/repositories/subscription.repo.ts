import { injectable } from "tsyringe";
import { ICreateSubscriptionDTO } from "../dtos/subscription.dto";
import { SubscriptionModel } from "../models/subscription.model";
import { ISubscriptionRepo } from "./interfaces/subscription.repo.interface";
import { Subscription } from "../types/subscription.type";

@injectable()
export class SubscriptionRepo implements ISubscriptionRepo {
    async create(subscription: ICreateSubscriptionDTO): Promise<void> {
        await SubscriptionModel.create(subscription)
    }
    async findOne(query: Record<string, any>): Promise<Subscription | null> {
        return await SubscriptionModel.findOne(query)
    }
}