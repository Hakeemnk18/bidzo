import { readonly } from "zod";
import { ICreateNotficationDTO } from "../dtos/notification.dto";
import { INotificationRepo } from "../repositories/interfaces/notification.repo.interface";
import { Notification } from "../types/notification.type";
import { INotificationService } from "./interfaces/notification.interfaces";
import { inject, injectable } from "tsyringe";
import { CustomError } from "../utils/customError";
import { ResponseMessages } from "../constants/responseMessages";
import { HttpStatusCode } from "../constants/httpStatusCode";

@injectable()
export class NotificationService implements INotificationService {
    constructor(
        @inject('INotificationRepo') private readonly notificationRepo: INotificationRepo
    ){}

    async create(data: ICreateNotficationDTO): Promise<void> {
        await this.notificationRepo.create(data)
    }

    async getAll(id: string): Promise<Notification[]> {

        return this.notificationRepo.getAll({ userId: id, isRead: false})
    }

    async markAsRead(id: string): Promise<void> {
        const query = {$set:{ isRead: true}}
        const updateResult = await this.notificationRepo.findByidAndUpdate(id,query)
        if(updateResult.matchedCount === 0){
            throw new CustomError(ResponseMessages.NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }
    }
}