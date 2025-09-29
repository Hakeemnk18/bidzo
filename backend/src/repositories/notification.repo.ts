import { UpdateResult } from "mongoose";
import { ICreateNotficationDTO } from "../dtos/notification.dto";
import NotificationModel from "../models/notification";
import { Notification } from "../types/notification.type";
import { INotificationRepo } from "./interfaces/notification.repo.interface";
import { injectable } from "tsyringe";


@injectable()
export class NotificationRepositories implements INotificationRepo {

    async create(data: ICreateNotficationDTO): Promise<void> {
        await NotificationModel.create(data)
    }

    async getAll(query: Record<string, any>): Promise<Notification[]> {
        return NotificationModel.find(query)
    }

    async findByidAndUpdate(id: string, query: Record<string, any>): Promise<UpdateResult> {
        return await NotificationModel.updateOne({_id: id},query)
    }

}