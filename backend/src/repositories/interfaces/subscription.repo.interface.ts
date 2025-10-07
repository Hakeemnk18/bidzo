import { ICreateSubscriptionDTO } from "../../dtos/subscription.dto";
import { Subscription } from "../../types/subscription.type";

export interface ISubscriptionRepo {
    create(subscription: ICreateSubscriptionDTO): Promise<void>
    findOne(query: Record<string, any>): Promise<Subscription | null>
}