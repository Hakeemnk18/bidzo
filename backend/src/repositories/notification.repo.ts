import { ICreateNotficationDTO } from "../dtos/notification.dto";
import NotificationModel from "../models/notification";
import { INotificationRepo } from "./interfaces/notification.repo.interface";
import { injectable } from "tsyringe";


@injectable()
export class NotificationRepositories implements INotificationRepo {

    async create(data: ICreateNotficationDTO): Promise<void> {
        await NotificationModel.create(data)
    }
}