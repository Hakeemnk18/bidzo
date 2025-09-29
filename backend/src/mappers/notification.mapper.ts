import { IResNotification } from "../dtos/notification.dto";
import { Notification } from "../types/notification.type";

export class NotificationMapper {

    static toResNotificationDTO(notification: Notification[]): IResNotification[] {
        const resNotification:IResNotification[] = notification.map((item)=> {
            return {
                id: item.id!,
                message: item.message,
                isRead: item.isRead
            }
        })

        return resNotification
    }
}