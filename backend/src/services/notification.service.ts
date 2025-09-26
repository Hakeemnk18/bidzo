import { ICreateNotficationDTO } from "../dtos/notification.dto";
import { INotificationRepo } from "../repositories/interfaces/notification.repo.interface";
import { INotificationService } from "./interfaces/notification.interfaces";
import { inject, injectable } from "tsyringe";

@injectable()
export class NotificationService implements INotificationService {
    constructor(
        @inject('INotificationRepo') private readonly notificationRepo: INotificationRepo
    ){}

    async create(data: ICreateNotficationDTO): Promise<void> {
        await this.notificationRepo.create(data)
    }
}