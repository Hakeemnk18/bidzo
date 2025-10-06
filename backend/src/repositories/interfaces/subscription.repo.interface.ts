import { ICreateSubscriptionDTO } from "../../dtos/subscription.dto";

export interface ISubscriptionRepo {
    create(subscription: ICreateSubscriptionDTO): Promise<void>
}