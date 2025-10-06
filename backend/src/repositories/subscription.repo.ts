import { injectable } from "tsyringe";
import { ICreateSubscriptionDTO } from "../dtos/subscription.dto";
import { SubscriptionModel } from "../models/subscription.model";
import { ISubscriptionRepo } from "./interfaces/subscription.repo.interface";

@injectable()
export class SubscriptionRepo implements ISubscriptionRepo {
    async create(subscription: ICreateSubscriptionDTO): Promise<void> {
        await SubscriptionModel.create(subscription)
    }
}