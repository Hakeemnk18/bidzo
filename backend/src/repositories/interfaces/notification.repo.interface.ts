import { ICreateNotficationDTO } from "../../dtos/notification.dto";
import { Notification } from "../../types/notification.type";
import { UpdateResult } from "mongoose";

export interface INotificationRepo {
    create(data: ICreateNotficationDTO):Promise<void>
    getAll(query: Record<string, any>): Promise<Notification[]>
    findByidAndUpdate(id: string,query: Record< string, any >):Promise<UpdateResult>
}