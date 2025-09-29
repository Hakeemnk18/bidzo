import { ICreateNotficationDTO } from "../../dtos/notification.dto";
import { Notification } from "../../types/notification.type";

export interface INotificationService {
    create(data:ICreateNotficationDTO):Promise<void>
    getAll(id: string): Promise<Notification[]>
    markAsRead(id: string): Promise<void>
}